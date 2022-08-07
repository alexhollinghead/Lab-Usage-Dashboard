from flask_sqlalchemy import SQLAlchemy, create_engine
from sqlalchemy.types import Integer, Text, String, DateTime


db_uri = ''

self.engine = create_engine(db_uri, echo=True)

usage_df.to_sql(
    'usage',
    engine,
    if_exists='replace',
    index=False,
    dtype={
        "Computer": Text,
        "Process": Text,
        "Launched Date": DateTime,
        "Total Run Time":  Text,
        "Front most": Text,
        "User Name": Text,
        "Total Run time in seconds": Integer,
    }
)