from .app import app
from flask_restx import Api

api = Api(app, version='3.0', title='Booking Services',
    description='Booking services', doc="/documentation/")
