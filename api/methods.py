import pandas as pd
# from flask_sqlalchemy import SQLAlchemy

# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///myDB.db' 
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False #to supress warning
# db = SQLAlchemy(app) #database instance

def dataframe():    
    '''
    Constructs a dataframe, cleans data, and returns as JSON
    '''
    lab_usage = pd.read_csv('spring-app-usage.csv', sep=r'\s*,\s*', engine='python', index_col=False)
    dataset = clean(lab_usage)
    # df = dataset.to_json()
    return dataset

def clean(dataset):
    '''
    Performs specified data cleaning operatings on dataset taken as parameter.
    '''
    dataset['Launched Date'] = dataset['Launched Date'].map(str) + ' ' + dataset['Time'].map(str)
    dataset = dataset.loc[dataset['Front most in seconds'] > 61]
    dataset = dataset.drop(['Time', 'State', 'Front most in seconds'], axis = 1)
    dataset['Launched Date'] = pd.to_datetime(dataset['Launched Date'])
    dataset.rename(columns = {'Name':'Process'}, inplace = True)

    # Create filters based on lists of users and applications
    file = open('filtered-users.txt')
    user_filter = [line.rstrip() for line in file.readlines()]
    file = open('filtered-applications.txt')
    app_filter = [line.rstrip() for line in file.readlines()]

    #Remove filtered data from the dataset
    dataset = dataset[~dataset['User Name'].isin(user_filter)]
    dataset = dataset[~dataset['Process'].isin(app_filter)]
    dataset.dropna()
    return dataset
    
def usage(data_type):
    '''Returns a snapshot of lab usage'''
    dataset = dataframe()
    if data_type == 'apps':
        app_frequency = dataset['Process'].value_counts()
        data_view = app_frequency.to_json(), {'Content-Type' : 'application/json'}
    elif data_type == 'users':
        user_frequency = dataset['User Name'].value_counts()
        data_view = user_frequency.to_json(), {'Content-Type' : 'application/json'}
    elif data_type == 'unique_users':
        user_count = len(dataset['User Name'].unique())
        data_view = f'{user_count}'
    elif data_type == 'stations':
        machine_sessions = dataset['Computer'].value_counts()
        data_view = machine_sessions.to_json(), {'Content-Type' : 'application/json'}
  
    return data_view