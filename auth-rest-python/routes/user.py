from flask import jsonify

from app import app
from controllers.user import User

@app.route('/user/', defaults={'id': None})
@app.route('/user/<int:id>')
def user_by_id(id):
    if(id != None):
        response = User.user_by_id(id)
    else: 
        response = User.users()
    if('error' in response): 
        return jsonify({ 'message': response['error']['message'] }), response['error']['status']
    return jsonify({'users': response['user']}), 200
