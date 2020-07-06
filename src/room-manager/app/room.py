from flask_restx import Resource, Namespace, fields
from flask import jsonify, request, Response
from .api import api
from .RoomDAO import RoomDAO, RoomCategoryDAO, RoomEstablishmentDAO

room = Namespace(name="room", description="Related room endpoints", path="")

api.add_namespace(room)

room_category_fields = api.model('RoomCategory', {
    'id': fields.Integer(min=0),
    'key': fields.String,
    'maxLength': fields.Integer(min=0),
    'basePrice': fields.Integer(min=0)
})

room_establishments = api.model('RoomEstablishment', {
    'roomId': fields.Integer(min=0),
    'establishmentId': fields.Integer(min=0),
    'overridePrice': fields.Integer(min=0)
})

room_fields = api.model('Room', {
    'id': fields.Integer(min=0),
    'name': fields.String,
    'roomCategory': room_category_fields,
    'establishments': room_establishments
})

class RoomCategoryResource:
    id = 0
    key = ""
    maxLength = 0
    basePrice = 0

class RoomEstablishmentResource:
    roomId = 0
    establishmentId = 0
    overridePrice = 0

class RoomResource:
    id = 0
    name = ""
    category = None
    establishments = None

    def __init__(self, id, name, category, establishments):
        self.id = id
        self.name = name
        self.category = category
        self.establishments = establishments

@room.route("/")
class Rooms(Resource):
    roomDAO = RoomDAO()
    roomCategoryDAO = RoomCategoryDAO()
    roomEstablishmmentDAO = RoomEstablishmentDAO()

    def get(self):
        list = self.roomDAO.list()
        rooms = []

        if (list != None and len(list)):
            for item in list:
                es = self.roomEstablishmmentDAO.getByRoomId(item.id)
                rooms.append(RoomResource(item.id, item.name, self.roomCategoryDAO.read(item.roomCategoryId), es)) 
        return ({
            "data": rooms,
            "message": "Room list"
        }), 200

    @room.expect(room_fields)
    def post(self, room):
        flag = self.roomDAO.save(room)

        return ({
            "message": "Room inserted"
        }), 201
    
    @room.expect(room_fields)
    def put(self, room):
        flag = self.roomDAO.update(room)

        return ({
            "message": "Room updated"
        }), 200

@room.route("/<id>")
@room.doc(params={"id": "Room id"})
class Room(Resource):
    roomDAO = RoomDAO()
    roomCategoryDAO = RoomCategoryDAO()
    roomEstablishmmentDAO = RoomEstablishmentDAO()

    def get(self, id):
        item = self.roomDAO.read(id)

        if (item == None):
            return ({
                "message": "Room not finded"
            }), 404
        establishments = self.roomEstablishmmentDAO.getByRoomId(item.id)
        category = self.roomCategoryDAO.read(item.roomCategoryId)
        resource = RoomResource(item.id, item.name, category, establishments)
        return ({
            "data": resource,
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

