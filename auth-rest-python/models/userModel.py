import hashlib

from models.baseModel import BaseModel, db
from controllers.function import Function

class UserModel(BaseModel, db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)  
    photo = db.Column(db.String(255))
    password = db.Column(db.String(100))  
    func = db.Column(db.Integer)

    def save(self):
        password = hashlib.md5()
        password.update(self.password.encode("utf-8"))
        self.password = password.hexdigest()
        db.session.add(self)
        db.session.commit()
    
    def to_json(self):
        return {
            "user": {
                "id": self.id,
                "name": self.name,
                "email": self.email,
                "photo": self.photo,
                "func": self.func,
                "created_on": self.created_on,
                "updated_on": self.updated_on
            }
        }

    def valid_password(self, password):
        newPassword = hashlib.md5()
        newPassword.update(password.encode("utf-8"))
        newPassword = newPassword.hexdigest()
        return self.password == newPassword
