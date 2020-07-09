from .app import app
from flask_restx import Api

api = Api(app, version='3.0', title='Sample API',
    description='Booking services', doc="/documentation/")
