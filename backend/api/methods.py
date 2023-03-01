from datetime import datetime
import pandas as pd
from . import dbconfig


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

    dataset = pd.read_sql_table('usage', con=dbconfig.engine.connect())

    # Filter with date parameters
    dataset = dataset[(dataset['date'] >= start_date) &
                      (dataset['date'] <= end_date)]

    # Consolidate apps used by a user on the same machine in the same day
    dataset['day'] = dataset['date'].dt.date
    dataset = dataset.groupby(['user_name', 'computer', 'day'],
                              as_index=False).agg(
        {'process': lambda x: pd.unique(list(x)).tolist()})

    return dataset


def upload_usage_data(data_source):
    """
    Take a csv file and add its contents to the database. If a db table does
    not exist yet, create the database.
    """
    # Build dataframe from CSV file
    dataset = pd.read_csv(data_source, sep=r'\s*,\s*', engine='python',
                          index_col=False)

    # Reformat data and column headers.
    dataset['Launched Date'] = dataset['Launched Date'].map(
        str) + ' ' + dataset['Time'].map(str)
    dataset['Launched Date'] = pd.to_datetime(dataset['Launched Date'])

    # Drop apps open for under a minute and irrelevant columns
    dataset = dataset.drop(['Time', 'State', 'Total Run time', 'Front most'],
                           axis=1)
    dataset = dataset.loc[dataset['Front most in seconds'] > 61]

    # Rename columns
    dataset.rename(columns={'Computer': 'computer',
                            'Name': 'process',
                            'Launched Date': 'date',
                            'Front most in seconds': 'frontmost_time',
                            'User Name': 'user_name',
                            'Total Run time in seconds': 'total_runtime'},
                   inplace=True)

    # Consolidate different versions of Adobe apps
    for i, row in dataset.iterrows():
        app_name = row['process']
        if app_name[:5] == "Adobe" and app_name[-4:].isnumeric():
            dataset.at[i, 'process'] = app_name[:-5]

        # Create database table
    try:
        dbconfig.put_data(dataset)
        return 'Data uploaded successfully'
    except:
        return "Error - db table not created."


def upload_user_filter(user_file):
    """
    Add names from a .txt file to the filtered users table in the database.
    """
    file = open(user_file)
    user_list = [line.rstrip() for line in file.readlines()]
    users = pd.Series(user_list, name='user')

    # Remove duplicates
    if dbconfig.engine.has_table('user_filter'):
        existing_users = pd.read_sql_table(
            'user_filter', con=dbconfig.engine.connect())
        users = users[~users.isin(existing_users.user)]

    # Put
    try:
        dbconfig.filter_add(
            'user_filter', data_series=users, col_label='users')
        return 'Success!'
    except:
        return "Upload failed"


def upload_app_filter(app_file):
    """
    Adds process names from a .txt file to the filtered apps table in the
    database.
    """
    file = open(app_file)
    app_list = [line.rstrip() for line in file.readlines()]
    apps = pd.Series(app_list, name='app')

    # Remove duplicates
    if dbconfig.engine.has_table('app_filter'):
        existing_apps = pd.read_sql_table('app_filter',
                                          con=dbconfig.engine.connect())
        apps = apps[~apps.isin(existing_apps.app)]

    # Put
    try:
        dbconfig.filter_add('app_filter', data_series=apps, col_label='app')
        return 'Success'
    except:
        "Upload failed"


def usage(data_type, start_date, end_date):
    """Returns a snapshot of lab usage"""
    dataset = set_dataframe(int(start_date), int(end_date))

    # Create filters based on lists of users and applications
    filtered_apps = pd.read_sql_table(
        'app_filter', con=dbconfig.engine.connect())
    filtered_users = pd.read_sql_table(
        'user_filter', con=dbconfig.engine.connect())

    # TODO: Update filtered_apps to work on new list-based app column
    dataset = dataset[~dataset.process.isin(filtered_apps.app)]
    dataset = dataset[~dataset.user_name.isin(filtered_users.user)]
    # Return number of application sessions
    # TODO: refactor to use an un-aggregated dataframe
    if data_type == 'apps':
        # data_view = [None]
        #     app_frequency = dataset['process'].value_counts()
        app_frequency = dataset['process']
        return app_frequency.to_json()
    #     data_view = app_frequency.to_json(
    #     ), {'Content-Type': 'application/json'}

    # Return total number of user sessions
    elif data_type == 'users':
        user_frequency = dataset['user_name'].value_counts()
        data_view = user_frequency.to_json(
        ), {'Content-Type': 'application/json'}

    elif data_type == 'monthly_users':
        # Collect counts of sessions for each unique month+year in dataset
        pass

    # Return number of unique users
    elif data_type == 'unique_users':
        user_count = len(dataset['user_name'].unique())
        data_view = f'{user_count}'

    # Return number of users per computer
    elif data_type == 'stations':
        machine_sessions = dataset['computer'].value_counts()
        data_view = machine_sessions.to_json(
        ), {'Content-Type': 'application/json'}

    return data_view
