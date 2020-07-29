from .app import app
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from os import getenv

db = SQLAlchemy(app)
if getenv("FLASK_ENV") != "test":
    migrate = Migrate(app, db)
