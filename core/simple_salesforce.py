from pandas import DataFrame
import pandas as pd
from simple_salesforce import Salesforce
import login import *

sf = Salesforce(username = username,
                password = password,
                security_token = token,
                instance_url = instance,
                sandbox = isSandbox)

def SOQL(SOQL):
    qryResult = sf.query(SOQL)
    print('Record Count {0}'.format(qryResult['totalSize']))
    isDone = qryResult['done'];

    if isDone == True:
        df = DataFrame(qryResult['records'])
    
    while isDone != True:
        try:
            if qryResult['done'] != True:
                df = df.append(DataFrame(qryResult['records']));
                qryResult = sf.query_more(qryResult['nextRecordsUrls'], True)
            else:
                df = df.append(DataFrame(qryResult['records']))
                isDone = True;
                print('completed')
                break;
        
        except NameError:
            df = DataFrame(qryResult['records'])
            qry = sf.query_more(qryResult['nextRecordsUrl'], True)

    df = df.drop('attributes', axis = 1)
    return df;

SOQL = 'SELECT Id, Name FROM Account' #This is where we put our query line or where it will be added as input from user.