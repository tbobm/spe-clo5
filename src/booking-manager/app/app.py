import os
from flask import Flask
from .config import app_config

app = Flask(__name__)
env = os.getenv("FLASK_ENV")
if (env == None):
    env = "development"
config = app_config[env]
app.config.from_object(config)
