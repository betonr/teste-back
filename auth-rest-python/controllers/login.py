from flask_jwt_extended import (create_access_token, decode_token)
import facebook

from config.accounts import __FACEBOOK_SETTINGS__
from controllers.user import User
from controllers.function import Function

class Login():
    # login with facebook OAuth
    def facebook(token):
        try: 
            graph = facebook.GraphAPI(access_token=token, version=3.0)
            extended_token = graph.extend_access_token(
                __FACEBOOK_SETTINGS__['app_id'], 
                __FACEBOOK_SETTINGS__['app_secret']
            )
            user_info = graph.get_object('me', fields="name,email,picture")

            user = User.user_by_email(user_info['email'])
            if('error' in user):
                user = User.register(user_info['name'], user_info['email'], user_info['picture']['data']['url'])
            
            access_token = create_access_token(identity=user_info['email'], expires_delta=False)
            return {'token': access_token, 'me': user['user']}

        except Exception as e:
            return {
                'error': {
                    'status': 403, 
                    'message': 'Invalid OAuth access token'
                }
            } 

    # login for admin users
    def admin(credentials):
        try:
            if(not 'email' in credentials or not 'password' in credentials):
                raise Exception(400)
            
            user = User.user_by_email(credentials['email'])
            user_info = user['user']
            if('error' in user):
                raise Exception(404)
            elif(user_info['func'] != Function.ADMINISTRATOR.value):
                raise Exception(403)
            elif(not User.compare_password(credentials['email'], credentials['password'])):
                raise Exception(401)

            access_token = create_access_token(identity=user_info['email'],expires_delta=False)
            return {'token': access_token, 'me': user_info}

        except Exception as e:
            message = {
                '400' : 'Invalid params - email and password are required',
                '401' : 'Email or password invalid',
                '403' : 'You do not have administrator permission',
                '404' : 'User not Found'
            }.get(str(e), 'Internal error')
            return {
                'error': {
                    'status': str(e), 
                    'message': message
                }
            }

    # verify if token is valid
    def validate(token):
        try: 
            user_email = decode_token(token)['identity']
            user = User.user_by_email(user_email)
            if('error' in user):
                raise Exception
            else:
                return {"id": user['user']['id']}

        except Exception as e:
            return {
                'error': {
                    'status': 403, 
                    'message': 'Invalid OAuth access token'
                }
            }