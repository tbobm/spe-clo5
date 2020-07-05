import os
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from .config import app_config
from flask_restx import Api, Resource, Namespace

app = Flask(__name__)

api = Api(app, version="3.0", doc="/documentation")
ns = Namespace('tools', description="Related tools")

api.add_namespace(ns)

venv = os.getenv("FLASK_ENV")
app.config.from_object(app_config[venv])
db = SQLAlchemy(app)
migrate = Migrate(app, db)

from app.auth.views import auth_api

app.register_blueprint(auth_api, url_prefix="/api/v1/auth")

from app.auth.helpers import auth_required

from app.models import User, BlacklistToken

@ns.route('/ping')
class Ping(Resource):
    def get(self):
        return (jsonify({
            "status": "ok"
        }))

