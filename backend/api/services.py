from datetime import datetime
import csv
import re
import pandas as pd
from sqlalchemy import create_engine
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import sessionmaker
from api.models import db, AppFilter, UserFilter, Usage
from . import dbconfig
from config import BaseConfig

database_uri = BaseConfig.SQLALCHEMY_DATABASE_URI
engine = create_engine(database_uri, echo=True)


def set_dataframe(start_date, end_date):
    """
    Builds a dataframe based on a specified date range.

    Parameters:
    start_date : int -> timestamp
        The start of the date range in Unix epoch timestamp form
    end_date : int -> timestamp
        The end of the date range in Unix epoch timestamp form
    """
    start_date = datetime.fromtimestamp(start_date)
    end_date = datetime.fromtimestamp(end_date)

    dataset = pd.read_sql_table("usage", con=dbconfig.engine.connect())

    # Filter with date parameters
    dataset = dataset[(dataset["date"] >= start_date) & (dataset["date"] <= end_date)]

    # Consolidate apps used by a user on the same machine in the same day
    # dataset['day'] = dataset['date'].dt.date
    # dataset = dataset.groupby(['user_name', 'computer', 'day'],
    #                           as_index=False).agg(
    #     {'process': lambda x: pd.unique(list(x)).tolist()})

    return dataset


def upload_usage_data(data_source):
    """
    Take a csv file and add its contents to the database.
    """
    processed_data = []

    decoded_stream = data_source.stream.read().decode("utf-8").splitlines()
    reader = csv.DictReader(decoded_stream)
    for row in reader:
        row = {key.strip(): value.strip() for key, value in row.items()}
        # Convert date and time into a single datetime object
        launched_date = f"{row['Launched Date']} {row['Time']}"
        launched_datetime = datetime.strptime(launched_date, "%m/%d/%y %I:%M:%S %p")

        # Filter out data with front most time less than 61 seconds
        if int(row["Front most in seconds"]) <= 61:
            continue

        # Process app_name and remove year from Adobe apps
        app_name = row["Name"]
        adobe_pattern = r"^Adobe.*\d{4}$"
        if re.match(adobe_pattern, app_name):
            app_name = re.sub(r"\d{4}$", "", app_name)
        # if app_name[:5] == "Adobe" and app_name[-4:].isnumeric():
        #     app_name = app_name[:-5]

        processed_data.append(
            {
                "computer": row["Computer"],
                "process": app_name,
                "date": launched_datetime,
                "frontmost_time": int(row["Front most in seconds"]),
                "user_name": row["User Name"],
                "total_runtime": int(row["Total Run time in seconds"]),
            }
        )

    # Add data to the database
    try:
        put_data(processed_data)
        return "Data uploaded successfully"
    except Exception as e:
        return f"Error - upload failed: {e}"


def upload_user_filter(user_file):
    """
    Add names from a .txt file to the filtered users table in the database.
    """
    user_list = [line.rstrip().decode("utf-8") for line in user_file.readlines()]

    for user_name in user_list:
        db.session.add(UserFilter(user=user_name))
        try:
            db.session.commit()
        except IntegrityError:
            db.session.rollback()

    return "Upload succeeded"


def upload_app_filter(app_file):
    """
    Adds process names from a .txt file to the filtered apps table in the
    database.
    """
    app_list = [line.rstrip().decode("utf-8") for line in app_file.readlines()]

    for app_name in app_list:
        db.session.add(AppFilter(app=app_name))
        try:
            db.session.commit()
        except IntegrityError:
            db.session.rollback()

    return "Upload succeeded"


def usage(data_type, start_date, end_date):
    """Returns a snapshot of lab usage"""
    dataset = set_dataframe(int(start_date), int(end_date))
    data_view = None

    # Create filters based on lists of users and applications
    filtered_apps = pd.read_sql_table("app_filter", con=dbconfig.engine.connect())
    filtered_users = pd.read_sql_table("user_filter", con=dbconfig.engine.connect())

    # TODO: Update filtered_apps to work on new list-based app column
    dataset = dataset[~dataset.process.isin(filtered_apps.app)]
    dataset = dataset[~dataset.user_name.isin(filtered_users.user)]
    # Return number of application sessions
    # TODO: refactor to use an un-aggregated dataframe
    if data_type == "apps":
        app_frequency = dataset["process"].value_counts()
        return app_frequency.to_json(), {"Content-Type": "application/json"}

    # Return total number of user sessions
    elif data_type == "users":
        user_frequency = dataset["user_name"].value_counts()
        data_view = user_frequency.to_json(), {"Content-Type": "application/json"}

    elif data_type == "monthly_users":
        # Collect counts of sessions for each unique month+year in dataset
        pass

    # Return number of unique users
    elif data_type == "unique_users":
        user_count = len(dataset["user_name"].unique())
        data_view = f"{user_count}"

    # Return number of users per computer
    elif data_type == "stations":
        machine_sessions = dataset["computer"].value_counts()
        data_view = machine_sessions.to_json(), {"Content-Type": "application/json"}

    return data_view


def put_data(usage_data):
    """
    Add data to an DB table called 'usage'.

    Parameters:
    usage_data : list of dicts
        A list of computer usage data, where each dict represents a row
    """
    Session = sessionmaker(bind=engine)
    session = Session()

    # Convert each dict in usage_data to a Usage instance and add to session
    for data_row in usage_data:
        usage_entry = Usage(**data_row)
        session.add(usage_entry)

    session.commit()
    session.close()
