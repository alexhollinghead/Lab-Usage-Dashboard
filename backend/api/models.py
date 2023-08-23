from flask_sqlalchemy import SQLAlchemy
from datetime import datetime


# Initialize the SQLAlchemy instance
db = SQLAlchemy()


class Usage(db.Model):
    __tablename__ = "usage"

    id = db.Column(db.Integer, primary_key=True)
    computer = db.Column(db.String(32))
    process = db.Column(db.String(128), nullable=False)
    date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    user_name = db.Column(db.String(128), nullable=True)
    total_runtime = db.Column(db.Integer, nullable=False)
    frontmost_time = db.Column(db.Integer, nullable=False)

    # This representation is just for debugging purposes
    def __repr__(self):
        return f"Usage('{self.computer}', '{self.process}', '{self.date}')"


class AppFilter(db.Model):
    __tablename__ = "app_filter"
    app = db.Column(db.String(128), primary_key=True)

    def __repr__(self):
        return f"AppFilter('{self.app}')"


class UserFilter(db.Model):
    __tablename__ = "user_filter"
    user = db.Column(db.String(128), primary_key=True)

    def __repr__(self):
        return f"UserFilter('{self.user}')"


def create_database(app):
    with app.app_context():
        db.create_all()

    print("Database initialized!")
