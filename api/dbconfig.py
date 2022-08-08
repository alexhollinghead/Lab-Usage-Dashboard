from sqlalchemy import create_engine
from sqlalchemy.types import Integer, Text, String, DateTime
import os.path
from config import BaseConfig

database_uri = BaseConfig.SQLALCHEMY_DATABASE_URI
engine = create_engine(database_uri, echo=True)

def put_data(usage_df):
    usage_df.to_sql(
        'usage',
        engine,
        if_exists='replace',
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
