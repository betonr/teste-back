from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from config.settings import settings
from models.baseModel import db
# import os
# env_name = os.getenv('FLASK_ENV')
env_name = 'development'

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {
    "origins": "*"
}})

app.config.from_object(settings[env_name])

from routes.status import *
from routes.auth import *
from routes.user import *

db.init_app(app)
JWTManager(app)

if __name__ == '__main__':
    app.run()