from .app import app
from flask_restx import Api

api = Api(app, version='1.0', title='Option API',
    description='Service Manager API', doc="/documentation/")

