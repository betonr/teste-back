from flask import jsonify

from models.userModel import UserModel
from models.baseModel import db
from controllers.function import Function

class User():
    def users():
        users = UserModel.query.all()
        return {'user': [user.to_json() for user in users]}
        
    def user_by_id(id):
        try:
            user = UserModel.query.filter_by(id=id).first()
            return user.to_json()
        
        except Exception as e: 
            return {
                'error': {
                    'status': 404, 
                    'message': 'User not found!'
                }
            }

    def user_by_email(email):
        try:
            user = UserModel.query.filter_by(email=email).first()
            return user.to_json()
        
        except Exception as e: 
            return {
                'error': {
                    'status': 404, 
                    'message': 'User not found!'
                }
            }        
    
    def register(name, email, photo):
        newUser = UserModel(name=name, email=email, photo=photo, func=Function.USER.value, password="")
        newUser.save()
        return {'user': newUser.to_json()['user'] }

    def compare_password(email, password):
        user = UserModel.query.filter_by(email=email).first()
        return user.valid_password(password)
    
