from flask_restx import Api
from .views import app

api = Api(app, version="3.0", doc="/documentation")
