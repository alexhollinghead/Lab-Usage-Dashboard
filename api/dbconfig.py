from os import environ
from sqlalchemy import create_engine
from sqlalchemy.types import Integer, Text, String, DateTime
import os.path

# db_uri = environ.get('SQLALCHEMY_DATABASE_URI')
path = os.path.abspath(os.getcwd())
db_uri = f'sqlite:////{path}/database.db'
engine = create_engine(db_uri, echo=True)

def create_table(usage_df):
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
