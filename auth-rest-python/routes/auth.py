from flask import jsonify, request, json

from app import app
from controllers.login import Login

@app.route('/auth/facebook/<string:token>')
def login_facebook(token):
    result = Login.facebook(token)
    if('error' in result): 
        return jsonify({ 'message': result['error']['message'] }), result['error']['status']
    return jsonify(result), 201

@app.route('/auth/admin', methods=['POST'])
def login_admin():
    result = Login.admin(request.get_json())
    if('error' in result): 
        return jsonify({ 'message': result['error']['message'] }), result['error']['status']
    return jsonify(result), 200

@app.route('/auth/validate/<string:token>')
def login_validate(token):
    result = Login.validate(token)
    if('error' in result): 
        return jsonify({ 'message': result['error']['message'] }), result['error']['status']
    return jsonify(result), 200