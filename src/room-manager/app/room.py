from flask_restx import Resource, Namespace
from flask import jsonify, request
from .api import api
from .db import db
from .models import RoomModel

room = Namespace("room", description="Related room endpoints")

api.add_namespace(room)

@room.route("/")
class Rooms(Resource):
    def get(self):
        list = RoomModel.query.all()

        return (({
            "data": list
        }))

@room.route("/<id>")
@room.doc(params={"id": "Room id"})
class Room(Resource):
    def get(self, id):
        item = RoomModel.query.get(id)

        return (({
            "data": item
        }))
