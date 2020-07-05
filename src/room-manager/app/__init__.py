import os
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_swagger import swagger
from .config import app_config

app = Flask(__name__)

venv = os.getenv("FLASK_ENV")
app.config.from_object(app_config[venv])
db = SQLAlchemy(app)
migrate = Migrate(app, db)

from app.auth.views import auth_api

app.register_blueprint(auth_api, url_prefix="/api/v1/auth")

from app.auth.helpers import auth_required

from app.models import User, BlacklistToken

@app.route("/ping")
def index():
    return jsonify({"status": "running"})


@app.route("/protected")
@auth_required
def protected():
    return jsonify({"message": "Protected message"})


from app.exceptions import AppError, NotFoundError


@app.errorhandler(404)
def custom404(error):
    return NotFoundError().to_api_response()


@app.errorhandler(Exception)
def handle_exception(exception):
    return AppError().to_api_response()


@app.errorhandler(AppError)
def handle_application_error(exception):
    return exception.to_api_response()

@app.route("/swagger.json", methods = ["GET"])
def swagger():
    return jsonify(swagger(app))
