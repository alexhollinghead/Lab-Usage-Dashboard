from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine, Column, MetaData, Table
from sqlalchemy.types import Integer, String, Text, DateTime
from config import BaseConfig
import os.path
import sqlite3
from config import configs
from flask_cors import CORS

# Globally acessible libraries
db = SQLAlchemy()


def init_app():
    """Initialize the core application"""
    app = Flask(__name__, instance_relative_config=False)

    app.config.from_object(configs["development"])
    CORS(app)
    db.init_app(app)

    # Create app database if it does not exist already
    if not os.path.exists("databse.db"):
        try:
            conn = sqlite3.connect("database.db")
            database_uri = BaseConfig.SQLALCHEMY_DATABASE_URI
            engine = create_engine(database_uri, echo=True)

            metadata_obj = MetaData()
            usage = Table(
                "usage",
                metadata_obj,
                Column("computer", String(32)),
                Column("process", String(128), nullable=False),
                Column("date", DateTime, nullable=False),
                Column("user_name", String(128), nullable=True),
                Column("total_runtime", Integer, nullable=False),
                Column("frontmost_time", Integer, nullable=False),
            )
            app_filter = Table(
                "app_filter", metadata_obj, Column("app", String(128), nullable=False)
            )
            user_filter = Table(
                "user_filter", metadata_obj, Column("user", String(128), nullable=False)
            )
            metadata_obj.create_all(engine)
            print("Database formed")
        except Exception as error:
            return error

    with app.app_context():
        # Include routes
        from . import routes
        from . import queries

        return app
