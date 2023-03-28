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
    start_date = request.args['start']
    end_date = request.args['end']
    return methods.set_dataframe(int(start_date), int(end_date)).to_json(), {
        'Content-Type': 'application/json'}

# Usage routes


@ app.route('/usage', methods=['GET'])
def usage():
    data_type = request.args['type']
    start_date = request.args['start']
    end_date = request.args['end']
    return methods.usage(data_type, start_date, end_date)
