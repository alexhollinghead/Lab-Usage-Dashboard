from sqlalchemy import create_engine
from sqlalchemy.types import Integer, String, Text, DateTime
from config import BaseConfig

database_uri = BaseConfig.SQLALCHEMY_DATABASE_URI
engine = create_engine(database_uri, echo=True)


def put_data(usage_df):
    """
    Add data to an DB table called 'usage'. The columns of the table are
    "computer", "process", "date", "frontmost_time", "user_name" and
    "total_runitme". The data types for each column are Text, Text, DateTime,
    Integer, Text and Integer respectively.

    Parameters:
    usage_df : DataFrame
        A DataFrame of computer usage data
    """
    usage_df.to_sql(
        "usage",
        engine,
        if_exists="append",
        index=False,
        dtype={
            "computer": String,
            "process": String,
            "date": DateTime,
            "frontmost_time": Integer,
            "user_name": String,
            "total_runtime": Integer,
        },
    )


def filter_add(filter_type, data_series, col_label):
    """
    Add data to a filter table.

    Parameters:
    filter_type : str
        The type of filter. Can be 'userfilter' or 'appfilter'
    data_series : Series
        A pandas Series holding the filter entries
    col_label : str
        The column name in the target table
    """
    data_series.to_sql(
        filter_type,
        engine,
        if_exists="append",
        index=False,
        dtype={
            col_label: Text,
        },
    )
