from flask import current_app as app, request
from api import methods
from datetime import datetime


@app.route('/')
def index():
    return "Hello world!"

# Upload routes


@app.route('/upload')
def upload_data():
    data_type = request.args['type']
    file = request.args['file']

    if data_type == 'userfilter':
        return methods.upload_user_filter(file)
    if data_type == 'appfilter':
        return methods.upload_app_filter(file)
    if data_type == 'usage':
        return methods.upload_usage_data(file)

# Dataframe view


@app.route('/dataframe')
def data():
    return methods.set_dataframe(1609459200, 1672531200).to_json(), {'Content-Type': 'application/json'}

# Usage routes


@ app.route('/usage', methods=['GET'])
def usage():
    data_type = request.args['type']
    return methods.usage(data_type)
