from flask import Flask
from flask_sqlalchemy  import SQLAlchemy

app = Flask(__name__)
app.config.from_pyfile('../config.py')

from api import views
from api import methods
