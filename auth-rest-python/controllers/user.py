from flask import jsonify

from models.userModel import UserModel
from models.baseModel import db
from controllers.function import Function

class User():
    def users():
        users = UserModel.query.all()
        return {'user': [user.to_json() for user in users]}
        
    def user_by_id(id):
        user = UserModel.query.filter_by(id=id).first()
        if(user == None):
            return {
                'error': {
                    'status': 404, 
                    'message': 'User not found!'
                }
            } 
        return user.to_json()

    def user_by_email(email):
        user = UserModel.query.filter_by(email=email).first()
        if(user == None):
            return {
                'error': {
                    'status': 404, 
                    'message': 'User not found!'
                }
            } 
        return user.to_json()
    
    def register(name, email, photo):
        newUser = UserModel(name=name, email=email, photo=photo, func=Function.USER.value, password="")
        newUser.save()
        return {'user': newUser.to_json()}

    def compare_password(email, password):
        user = UserModel.query.filter_by(email=email).first()
        return user.valid_password(password)
    
