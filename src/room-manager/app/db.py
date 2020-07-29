from .views import app
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from os import getenv

db = SQLAlchemy(app)
if getenv("FLASK_ENV") != "test":
    Migrate(app, db)

__all__ = [
    db, app, SQLAlchemy, Migrate
]
