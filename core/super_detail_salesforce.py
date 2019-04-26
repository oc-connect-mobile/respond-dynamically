import http.client
from config import cfg # private configuration, clone config.py.template
from requests.utils import requote_uri
import json
from pprint import pprint as pp


def superDetailsf(soqlkv):
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
    #print("Milestone 1")
    print('Posting to here ' + host)
    #print("Milestone 2")
    print('Posting this ' + requote_uri(qs))

    # Request plus header application/x-www-form-urlencoded
    headers = {
        'Content-type': 'application/x-www-form-urlencoded'
    }
    conn.request('POST', '/services/oauth2/token', qs, headers)
    response = conn.getresponse()

    # HTTP status code
    #print("Milestone 3")
    print(response.status, response.reason)

    # HTTP response body
    vjson = response.read()

    # output raw json with versions
    # print(vjson)

    # json to dict
    rdict = json.loads(vjson)

    # Get the token
    access_token =  rdict['access_token']
    #print("Milestone 4")
    #print(access_token)

    # Begin Get Accounts ================================================================

    # Everything up until now has been authentication, now that a token is obtained
    # the data can be accessed assuming the user has permissions

    # Environment is the instance.salecforce.com, e.g. dev instance, sandbox, prod, etc
    environment = cfg.sf_api_instance + '.' + cfg.sf_api_host

    # Set salesforceinstance
    conn = http.client.HTTPSConnection(environment)

    # soqlkv = 'q=SELECT+Name+FROM+Account'
    #'+WHERE+CreatedDate+>+2019-04-15T00:00:00Z+limit+10'
    url = '/services/data/v45.0/sobjects/Account/'+soqlkv

    # HTTP post data
    #print("Milestone 5")
    print('Posting to here ' + environment)
    #print('Posting this ' + requote_uri(qs))
    #print("Milestone 6")
    print('Posting this ' + url)
   

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
    #print("Milestone 7")
    #print(response.status, response.reason)

    # HTTP response body    
    data = response.read()

    # output raw json with versions
    #print("Milestone 8")
    #print(account_records_json)

    # string to object graph
    data0 = json.loads(data)
    # pp(data0)
    return(data0)