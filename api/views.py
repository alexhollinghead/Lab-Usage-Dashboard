from api import app
from api import methods

@app.route('/')
def index():
    return "Hello world!"

@app.route('/dataframe')
def data():
    return methods.dataframe().to_json(), {'Content-Type': 'application/json'}

@app.route('/usage/<data_type>')
def usage(data_type):
    return methods.usage(data_type)