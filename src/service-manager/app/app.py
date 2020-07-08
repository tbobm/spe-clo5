from flask import Flask
from .config import app_config
import os

app = Flask(__name__)
flaskEnv = os.getenv('FLASK_ENV')
if (flaskEnv == None):
    flaskEnv = "development"
item = app_config[flaskEnv]
app.config.from_object(item)
