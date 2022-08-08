from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os.path
import sqlite3
from config import configs

# Globally acessible libraries
db = SQLAlchemy() 

def init_app():
    '''Initialize the core application'''
    app = Flask(__name__, instance_relative_config=False)
    app.config.from_object(configs["development"])
    db.init_app(app)

    # Create app database if it does not exist already
    if os.path.exists('databse.db') == False:
        try:
            conn = sqlite3.connect('database.db')
            print('Database formed')
        except:
            print('Database not formed')

    with app.app_context():
        # Include routes
        from . import views
        from . import methods    

        return app
