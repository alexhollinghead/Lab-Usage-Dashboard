import os.path


class BaseConfig:
    FLASK_APP = "wsgi.py"

    # Databse configuration
    path = os.path.abspath(os.getcwd())
    SQLALCHEMY_DATABASE_URI = f"sqlite:////{path}/database.db"
    SQLALCHEMY_ECHO = True
    SQLALCHEMY_TRACK_MODIFICATIONS = False


class DevConfig(BaseConfig):
    TESTING = True
    DEBUG = True


class ProdConfig(BaseConfig):
    DEBUG = False
    TESTING = False


configs = {"development": DevConfig, "production": ProdConfig}
