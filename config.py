import os.path

class BaseConfig:
    FLASK_APP = 'wasgi.py'
    
    path = os.path.abspath(os.getcwd())
    db_uri = f'sqlite:////{path}/database.db'

    # Databse configuration
    SQLALCHEMY_DATABASE_URI = db_uri
    SQLALCHEMY_ECHO = True
    SQLALCHEMY_TRACK_MODIFICATIONS = False

class DevConfig(BaseConfig):
    # Flask configuration
    TESTING = True
    DEBUG = True
    FLASK_ENV = 'development'

class ProdConfig(BaseConfig):
    pass

configs = {"development": DevConfig, "production":ProdConfig}