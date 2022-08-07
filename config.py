# Flask configuration
TESTING = True
DEBUG = True
FLASK_ENV = 'development'
FLASK_APP = 'wsgi.py'

# Databse configuration
SQLALCHEMY_DATABASE_URI = 'sqlite:////database.db'
SQLALCHEMY_ECHO = True
SQLALCHEMY_TRACK_MODIFICATIONS = False