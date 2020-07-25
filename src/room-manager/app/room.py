from flask_restx import Resource, Namespace, fields
from flask import jsonify, request, Response
from .api import api
from .RoomDAO import RoomDAO, RoomCategoryDAO, RoomEstablishmentDAO
from .models import RoomModel, RoomCategoryModel, RoomEstablishmentModel

room = Namespace(name="room", description="Related room endpoints", path="")

api.add_namespace(room)

room_category_fields = room.model('RoomCategory', {
    'id': fields.Integer(min=0),
    'key': fields.String,
    'maxLength': fields.Integer(min=0),
    'basePrice': fields.Integer(min=0)
})

room_establishments = room.model('RoomEstablishment', {
    'roomId': fields.Integer(min=0),
    'establishmentId': fields.Integer(min=0),
    'overridePrice': fields.Integer(min=0)
})

room_fields = room.model('Room', {
    'id': fields.Integer(min=0),
    'name': fields.String,
    'roomCategory': room_category_fields,
    'establishments': fields.List(fields.Nested(room_establishments))
})

@room.route("/")
class Rooms(Resource):
    roomDAO = RoomDAO()
    roomCategoryDAO = RoomCategoryDAO()
    roomEstablishmmentDAO = RoomEstablishmentDAO()
    
    def get(self):
        list = self.roomDAO.list()
        rooms = []

        if (list is not None and len(list)):
            for item in list:
                es = self.roomEstablishmmentDAO.getByRoomId(item.id)
                roomCategory = self.roomCategoryDAO.read(item.roomCategoryId)
                room = {
                    "id": item.id,
                    "name": item.name,
                }
                if (roomCategory is not None):
                    room["roomCategory"] = {
                        "id": roomCategory.id,
                        "key": roomCategory.key,
                        "maxLength": roomCategory.maxLength,
                        "basePrice": roomCategory.basePrice
                    }
                if (es is not None and len(es) > 0):
                    room["establishments"] = []
                    for e in es:
                        print(e.roomId)
                        room["establishments"].append({
                            "roomId": e.roomId,
                            "establishmentId": e.establishmentId,
                            "overridePrice": e.overridePrice
                        })
                rooms.append(room) 
        return ({
            "data": rooms,
            "message": "Room list"
        }), 200

    def post(self):
        room = request.json
        roomCategoryId = 0
        roomCategoryModel = None
        if (room['roomCategory'] != None and 'id' not in room['roomCategory']):
            roomCategoryModel = RoomCategoryModel(room['roomCategory']['key'], room['roomCategory']['maxLength'], room['roomCategory']['basePrice'])
            roomCategoryId = self.roomCategoryDAO.save(roomCategoryModel)
        elif ('id' in room['roomCategory'] and room['roomCategory']['id'] > 0):
            roomCategoryId = room['roomCategory']['id']
            roomCategoryModel = self.roomCategoryDAO.read(roomCategoryId)
        else:
            return ({
                "message": "invalid input"
            }), 400
        roomModel = RoomModel(room['name'], roomCategoryId)
        self.roomDAO.save(roomModel)
        establishments = []
        if (room['establishments'] != None and len(room['establishments']) > 0):
            for establishment in room['establishments']:
                roomEstablishmentModel = RoomEstablishmentModel(roomModel.id, establishment['establishmentId'], establishment['overridePrice'])
                self.roomEstablishmmentDAO.save(roomEstablishmentModel)
                establishments.append(roomEstablishmentModel)
        resourceCategory = {
            "key": roomCategoryModel.key,
            "maxLength": roomCategoryModel.maxLength,
            "basePrice": roomCategoryModel.basePrice,
            "id": roomCategoryId
        }
        resourceEstablishments = []
        for establishment in establishments:
            resourceEstablishment = {
                "roomId": roomModel.id, 
                "establishmentId": establishment.establishmentId,
                "overridePrice": establishment.overridePrice
            }
            resourceEstablishments.append(resourceEstablishment)
        roomResource = {
            "name": roomModel.name,
            "resourceCategory": resourceCategory,
            "establishments": resourceEstablishments,
            "id": roomModel.id
        }
        return ({
            "message": "Room updated",
            "data": roomResource
        }), 201
    
   # @room.expect(room_fields)
    def put(self):
        room = request.json
        roomCategoryId = 0
        roomCategoryModel = None
        if (room['roomCategory'] != None and 'id' not in room['roomCategory']):
            roomCategoryModel = RoomCategoryModel(room['roomCategory']['key'], room['roomCategory']['maxLength'], room['roomCategory']['basePrice'])
            roomCategoryId = self.roomCategoryDAO.save(roomCategoryModel)
        elif ('id' in room['roomCategory'] and room['roomCategory']['id'] > 0):
            roomCategoryId = room['roomCategory']['id']
            roomCategoryModel = self.roomCategoryDAO.read(roomCategoryId)
        else:
            return ({
                "message": "invalid input"
            }), 400
        roomModel = RoomModel(room['name'], roomCategoryId)
        roomModel.id = room['id']
        self.roomDAO.update(roomModel)
        self.roomEstablishmmentDAO.deleteByRoomId(roomModel.id)
        establishments = []
        if (room['establishments'] != None and len(room['establishments']) > 0):
            for establishment in room['establishments']:
                roomEstablishmentModel = RoomEstablishmentModel(roomModel.id, establishment['establishmentId'], establishment['overridePrice'])
                self.roomEstablishmmentDAO.save(roomEstablishmentModel)
                establishments.append(roomEstablishmentModel)
        resourceCategory = {
            "key": roomCategoryModel.key,
            "maxLength": roomCategoryModel.maxLength,
            "basePrice": roomCategoryModel.basePrice,
            "id": roomCategoryId
        }
        resourceEstablishments = []
        for establishment in establishments:
            resourceEstablishment = {
                "roomId": roomModel.id, 
                "establishmentId": establishment.establishmentId,
                "overridePrice": establishment.overridePrice
            }
            resourceEstablishments.append(resourceEstablishment)
        roomResource = {
            "name": roomModel.name,
            "resourceCategory": resourceCategory,
            "establishments": resourceEstablishments,
            "id": roomModel.id
        }
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

        if (item is None):
            return ({
                "message": "Room not finded"
            }), 404
        establishments = self.roomEstablishmmentDAO.getByRoomId(item.id)
        category = self.roomCategoryDAO.read(item.roomCategoryId)
        room = {
            "id": item.id,
            "name": item.name,
        }
        if (category is not None):
            room["roomCategory"] = {
                "id": category.id,
                "key": category.key,
                "maxLength": category.maxLength,
                "basePrice": category.basePrice
            }
        if (establishments is not None and len(establishments) > 0):
            room["establishments"] = []
            for establishment in establishments:
                room["establishments"].append({
                    "roomId": establishment.roomId,
                    "establishmentId": establishment.establishmentId,
                    "overridePrice": establishment.overridePrice
                })
        return ({
            "message": "room details",
            "data": room
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

__all__ = [
    api, 
    room, 
    Room, 
    Rooms, 
    RoomDAO, 
    RoomCategoryDAO, 
    RoomEstablishmentDAO, 
    RoomModel, 
    RoomCategoryModel, 
    RoomEstablishmentModel
]
