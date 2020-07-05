from os import getenv
from flask import Flask
from .config import app_config

app = Flask(__name__)
app.config.from_object(app_config[getenv("FLASK_ENV")])



