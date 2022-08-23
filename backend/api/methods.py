import pandas as pd
from . import dbconfig
from datetime import datetime

def dataframe(start_date = datetime(2022, 1, 1), end_date = datetime.now()):    
    '''
    Builds a dataframe from date parameters
    ''' 
    dataset = pd.read_sql_table('usage', con = dbconfig.engine.connect())
    return dataset

def upload(data_source):
    '''Take a csv file and add its contents to the database. If a db table does not exist yet, creates the database.'''
    # Build dataframe from CSV file
    dataset = pd.read_csv(data_source, sep=r'\s*,\s*', engine='python', index_col=False)

    # Reformat data and column headers.
    dataset['Launched Date'] = dataset['Launched Date'].map(str) + ' ' + dataset['Time'].map(str)
    dataset['Launched Date'] = pd.to_datetime(dataset['Launched Date'])

    # Drop apps open for under a minute and irrelevant columns
    dataset = dataset.drop(['Time', 'State', 'Total Run time', 'Front most'], axis = 1)
    dataset = dataset.loc[dataset['Front most in seconds'] > 61]

    # Rename columns
    dataset.rename(columns = {'Computer':'computer','Name':'process', 'Launched Date':'launched_date', 'Front most in seconds':'frontmost_time', 'User Name':'user_name', 'Total Run time in seconds':'total_runtime'}, inplace = True)

    # Create database table
    try:
        dbconfig.put_data(dataset)
        return 'Success!'

    except:
        return "Error."
    
def user_filter(user_file):
    '''Adds names from a .txt file to the filtered users table in the database.'''
    file = open(user_file)
    user_list = [line.rstrip() for line in file.readlines()]
    users = pd.Series(user_list, name='user')
    dbconfig.filter_add('user_filter', dataframe = users, label='users')
    return 'Success!'

def app_filter(app_file):
    '''Adds process names from a .txt file to the filtered apps table in the database.'''
    file = open(app_file)
    app_list = [line.rstrip() for line in file.readlines()]
    apps = pd.Series(app_list, name='app')
    dbconfig.filter_add('app_filter', dataframe = apps, label='app')
    return 'Success'

def usage(data_type):
    '''Returns a snapshot of lab usage'''
    dataset = dataframe()

    # Create filters based on lists of users and applications
    filtered_apps = pd.read_sql_table('app_filter', con = dbconfig.engine.connect())
    filtered_users = pd.read_sql_table('user_filter', con = dbconfig.engine.connect())
    dataset = dataset[~dataset.process.isin(filtered_apps.app)] 
    dataset = dataset[~dataset.user_name.isin(filtered_users.user)]


    if data_type == 'apps':
        app_frequency = dataset['process'].value_counts()
        data_view = app_frequency.to_json(), {'Content-Type' : 'application/json'}
    elif data_type == 'users':
        user_frequency = dataset['user_name'].value_counts()
        data_view = user_frequency.to_json(), {'Content-Type' : 'application/json'}
    elif data_type == 'unique_users':
        user_count = len(dataset['user_name'].unique())
        data_view = f'{user_count}'
    elif data_type == 'stations':
        machine_sessions = dataset['computer'].value_counts()
        data_view = machine_sessions.to_json(), {'Content-Type' : 'application/json'}
  
    return data_view
