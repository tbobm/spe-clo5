from .db import db
from .models import RoomModel, RoomCategoryModel, RoomEstablishmentModel

class RoomDAO:

    def read(self, id):
        item = RoomModel.query.get(id)

        return (item)
    
    def list(self):
        list = RoomModel.query.all()

        return (list)

    def save(self, room):
        db.session.add(room)
        db.session.commit()
        return (True)

    def update(self, room):
        db.session.add(room)
        db.session.commit()
        return (True)

    def delete(self, id):
        item = self.read(id)

        if (item == None):
            return (False)
        db.session.delete(item)
        db.session.commit()
        return (True)

class RoomCategoryDAO:

    def read(self, id):
        item = RoomCategoryModel.query.get(id)

        return (item)
    
    def list(self):
        list = RoomCategoryModel.query.all()

        return (list)
    
    def save(self, roomCategory):
        db.session.add(roomCategory)
        db.session.commit()
        return (True)
    
    def update(self, roomCategory):
        item = RoomCategoryModel.query.get(roomCategory.id)

        if (item == None):
            return (False)
        db.session.add(roomCategory)
        db.session.commit()
        return (True)
    
    def delete(self, id):
        item = RoomCategoryModel.query.get(id)

        if (item == None):
            return (False)
        db.session.delete(item)
        db.session.commit()
        return (True)

class RoomEstablishmentDAO:

    def getByRoomId(self, roomId):
        roomsEstablishment = RoomEstablishmentModel.filter_by(roomId=roomId).all()

        return (roomsEstablishment)
    
    def list(self):
        list = RoomEstablishmentModel.query.all()

        return (list)

    def deleteByRoomId(self, roomId):
        RoomEstablishmentModel.filter_by(roomId=roomId).delete()

        return (True)

    def save(self, roomEstablishment):
        db.session.add(roomEstablishment)
        db.session.commit()
