from werkzeug.security import generate_password_hash, check_password_hash

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
        self.password = generate_password_hash(self.password)
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
        return check_password_hash(self.password, password)
