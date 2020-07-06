from flask_restx import Resource, Namespace
from flask import jsonify, request, Response
from .api import api
from .RoomDAO import RoomDAO

room = Namespace(name="room", description="Related room endpoints", path="")

api.add_namespace(room)

@room.route("/")
class Rooms(Resource):
    roomDAO = RoomDAO()
        
    def get(self):
        list = self.roomDAO.list()

        return ({
            "data": list,
            "message": "Room list"
        }), 200

    def post(self, room):
        flag = self.roomDAO.save(room)

        return ({
            "message": "Room inserted"
        }), 201
    
    def put(self, room):
        flag = self.roomDAO.update(room)

        return ({
            "message": "Room updated"
        }), 200

@room.route("/<id>")
@room.doc(params={"id": "Room id"})
class Room(Resource):

    roomDAO = RoomDAO()

    def get(self, id):
        item = self.roomDAO.read(id)

        if (item == None):
            return ({
                "message": "Room not finded"
            }), 404
        return ({
            "data": item,
            "message": "Room finded"
        }), 200
    
    def delete(self, id):
        flag = self.roomDAO.delete(id)

        if (flag == False):
            return ({
                "message": "Room not finded"
            }), 404
        return ({
            "message": "Room deleted"
        }), 200

