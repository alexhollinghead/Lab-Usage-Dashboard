from flask import current_app as app
from api import methods

@app.route('/')
def index():
    return "Hello world!"

# Upload routes

@app.route('/upload/data/<data_source>')
def upload(data_source):
    return methods.upload(data_source)

@app.route('/upload/userfilter/<data_source>')
def user_filter(data_source):
    return methods.user_filter(data_source)

@app.route('/upload/appfilter/<data_source>')
def app_filter(data_source):
    return methods.app_filter(data_source)

# Dataframe view

@app.route('/dataframe')
def data():
    return methods.dataframe().to_json(), {'Content-Type': 'application/json'}

# Usage routes

@app.route('/usage/<data_type>', methods=['GET'])
def usage(data_type):
    return methods.usage(data_type)