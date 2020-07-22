from .api import api
from flask_restx import Resource, Namespace
from flask import jsonify

tool = Namespace('tools', description="Related tools")
api.add_namespace(tool)

@tool.route('/ping')
class Ping(Resource):
    def get(self):
        return (jsonify({
            "status": "ok"
        }))

__all__ = [
    api, tool, Ping
]
