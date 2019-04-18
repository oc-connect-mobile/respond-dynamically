'''
Connect to salesforce REST API to authenticate.
https://sforce.co/1RDG1os
Parameter	    Description
grant_type	    Must be password for this authentication flow.
client_id	    The Consumer Key from the connected app definition.
client_secret	The Consumer Secret from the connected app definition. Required unless the Require Secret for Web Server Flow setting is not enabled in the connected app definition.
username	    End-user’s username.
password	    End-user’s password.

Note: You must append the user’s security token to their password A security token is an 
automatically-generated key from Salesforce. For example, if a user's password is mypassword, 
and their security token is XXXXXXXXXX, then the value provided for this parmeter must be 
mypasswordXXXXXXXXXX. For more information on security tokens see “Reset Your Security Token” 
in the online help.

An example request body [querystring] might look something like the following:

grant_type=password
&client_id=3MVG9lKcPoNINVBIPJjdw1J9LLM82HnFVVX19KY1uA5mu0QqEWhqKpoW3svG3XHrXDiCQjK1mdgAvhCscA9GE
&client_secret=1955279925675241571
&username=testuser%40salesforce.com
&password=mypassword123456

client_id and client_secret
If you navigate to Create --> Apps --> you can see connected apps, click on it and you 
can see consumer key (client_id) and consumer secret (client_secret). 

token
For the security token you can (login with api username), then get the token via email when you go to 
my settings --> personal --> reset my security token. 
'''

import http.client
from config import cfg # private configuration, clone config.py.template
from requests.utils import requote_uri
import json

# Begin Get Authorization Token ================================================================

# Build Token Request Data
qs = ''
qs += 'grant_type=password'	  
qs += '&client_id=' + cfg.sf_api_client_id	  
qs += '&client_secret=' + cfg.sf_api_client_secret
qs += '&username=' + cfg.sf_api_username
qs += '&password=' + cfg.sf_api_password  
qs += cfg.sf_api_security_token

host = cfg.sf_api_instance + '.' + cfg.sf_api_host


# Set server
conn = http.client.HTTPSConnection(host)

# HTTP post data
print("Milestone 1")
print('Posting to here ' + host)
print("Milestone 2")
print('Posting this ' + requote_uri(qs))

# Request plus header application/x-www-form-urlencoded
headers = {
    'Content-type': 'application/x-www-form-urlencoded'
}
conn.request('POST', '/services/oauth2/token', qs, headers)
response = conn.getresponse()

# HTTP status code
print("Milestone 3")
print(response.status, response.reason)

# HTTP response body
vjson = response.read()

# output raw json with versions
# print(vjson)

# json to dict
rdict = json.loads(vjson)

# Get the token
access_token =  rdict['access_token']
print("Milestone 4")
print(access_token)

# Begin Get Accounts ================================================================

# Everything up until now has been authentication, now that a token is obtained
# the data can be accessed assuming the user has permissions

# Environment is the instance.salecforce.com, e.g. dev instance, sandbox, prod, etc
environment = cfg.sf_api_instance + '.' + cfg.sf_api_host

# Set salesforceinstance
conn = http.client.HTTPSConnection(environment)

soqlkv = 'q=SELECT+Name+FROM+Account'
#'+WHERE+CreatedDate+>+2019-04-15T00:00:00Z+limit+10'
url = '/services/data/v45.0/query?' + soqlkv

# HTTP post data
print("Milestone 5")
print('Posting to here ' + environment)
#print('Posting this ' + requote_uri(qs))
print("Milestone 6")
print('Posting this ' + url)
print('That query is successful in Workbench')

# Request plus header application/x-www-form-urlencoded
headers = {
    'Content-type': 'application/x-www-form-urlencoded',
    'Authorization': 'Bearer ' + access_token,
    'Accept': 'application/json'
}

# Sample request with SOQL, curl syntax
# curl https://yourInstance.salesforce.com/services/data/v20.0/query?q=SELECT+name+from+Account -H 'Authorization: Bearer access_token' -H 'X-PrettyPrint:1'

conn.request('GET', url, None, headers)
response = conn.getresponse()

# HTTP status code
print("Milestone 7")
print(response.status, response.reason)

# HTTP response body
account_records_json = response.read()

# output raw json with versions
print("Milestone 8")
print(account_records_json)

# string to object graph
account_records = json.loads(account_records_json)

# json to dict using pandas
#import pandas as pd

# json to panda dataframe
#adf = pd.read_json(json.dumps(account_records['records']))

# output table with versions
# print(adf)

#print("Milestone 9")
#print(adf)