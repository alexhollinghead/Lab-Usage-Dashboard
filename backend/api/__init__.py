import os.path
from flask import Flask
from flask_cors import CORS
from config import configs
from .models import db, create_database, AppFilter, UserFilter
from .routes import main as main_blueprint


def create_app():
    """Initialize the core application"""
    app = Flask(__name__)

    config_name = os.environ.get("APP_CONFIG", default="development")
    app.config.from_object(configs[config_name])

    CORS(app)
    db.init_app(app)

    if not os.path.exists("database.db"):
        create_database(app)

    app.register_blueprint(main_blueprint)

    # Reset DB tables
    # with app.app_context():
    #     AppFilter.__table__.drop(db.engine)
    #     UserFilter.__table__.drop(db.engine)
    #     db.create_all()

    return app
