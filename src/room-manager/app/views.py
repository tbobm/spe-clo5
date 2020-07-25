from os import getenv
from flask import Flask
from .config import app_config

app = Flask(__name__)
flaskEnv = getenv("FLASK_ENV")
if (flaskEnv == None):
    flaskEnv = "development"

app.config.from_object(app_config[flaskEnv])

__all__ = [
    getenv, Flask, app_config, app, flaskEnv
]
