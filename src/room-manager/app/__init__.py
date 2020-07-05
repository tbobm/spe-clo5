import os
from flask import Flask, jsonify
from flask_migrate import Migrate
from .config import app_config
from flask_sqlalchemy import SQLAlchemy
from flask_restx import Api, Resource, Namespace
from .room import room

app = Flask(__name__)

api = Api(app, version="3.0", doc="/documentation")
ns = Namespace('tools', description="Related tools")

api.add_namespace(ns)
api.add_namespace(room)

venv = os.getenv("FLASK_ENV")
app.config.from_object(app_config[venv])

db = SQLAlchemy(app)
Migrate(app, db)

@ns.route('/ping')
class Ping(Resource):
    def get(self):
        return (jsonify({
            "status": "ok"
        }))

