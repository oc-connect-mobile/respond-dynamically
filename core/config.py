import os

SF_USERNAME = os.getenv('SF_USERNAME')
SF_PASSWORD = os.getenv('SF_PASSWORD')
SF_TOKEN = os.getenv('SF_TOKEN')
SF_CLIENT_SECRET = os.getenv('SF_CLIENT_SECRET')
SF_CLIENT_ID = os.getenv('SF_CLIENT_ID')


class _Config(object):

    def __init__(self):
        self.__sf_api_auth_token_endpoint = 'test.salesforce.com/services/oauth2/token' # excluding protocol, no https://
        self.__sf_api_instance = 'cef--train.cs14' # excluding protocol, no https://
        self.__sf_api_host = 'my.salesforce.com'
        self.__sf_api_username = SF_USERNAME
        self.__sf_api_password = SF_PASSWORD
        self.__sf_api_client_id = SF_CLIENT_ID
        self.__sf_api_client_secret = SF_CLIENT_SECRET
        self.__sf_api_security_token = ''

    @property
    def sf_api_host(self):
        return self.__sf_api_host

    @property
    def sf_api_instance(self):
        return self.__sf_api_instance
 
    @property
    def sf_api_username(self):
        return self.__sf_api_username
  
    @property
    def sf_api_password(self):
        return self.__sf_api_password
  
    @property
    def sf_api_client_id(self):
        return self.__sf_api_client_id
  
    @property
    def sf_api_client_secret(self):
        return self.__sf_api_client_secret  

    @property
    def sf_api_security_token(self):
        return self.__sf_api_security_token

    @property
    def sf_api_auth_token_endpoint(self):
        return self.__sf_api_auth_token_endpoint

cfg = _Config()


# Replace line 4 with your own instance from you salesforce.com instance and save as config.py, delete this line.