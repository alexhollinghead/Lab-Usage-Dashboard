from flask import Flask
from flask_sqlalchemy  import SQLAlchemy
import os
import sqlite3

# Globally acessible libraries
db = SQLAlchemy() 

def init_app():
    '''Initialize the core application'''
    app = Flask(__name__)
    app.config.from_pyfile('../config.py')

    #Create app database if it does not exist already
    if os.path.exists('databse.db') == False:
        try:
            conn = sqlite3.connect('database.db')
            print('Database formed')
        except:
            print('Database not formed')
            
    with app.app_context():
        # Include routes
        from api import views
        from api import methods    

        return app
