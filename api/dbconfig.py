from sqlalchemy import create_engine
from sqlalchemy.types import Integer, Text, DateTime
from config import BaseConfig

database_uri = BaseConfig.SQLALCHEMY_DATABASE_URI
engine = create_engine(database_uri, echo=True)

def put_data(usage_df):
    usage_df.to_sql(
        'usage',
        engine,
        if_exists='append',
        index=False,
        dtype={
            "computer": Text,
            "process": Text,
            "launched_date": DateTime,
            "frontmost_time": Integer,
            "user_name": Text,
            "total_runitme": Integer,
        }
    )

def filter_add(filter, dataframe, label):
    dataframe.to_sql(
        filter,
        engine,
        if_exists='append',
        index=False,
        dtype={
            label: Text,
        }
    )
