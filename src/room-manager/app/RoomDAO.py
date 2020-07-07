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

        return (room.id)

    def update(self, room):
        db.session.query(RoomModel).filter_by(id=room.id).update({
            'name': room.name
        })

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
        item = db.session.query(RoomCategoryModel).get(id)

        return (item)
    
    def list(self):
        list = RoomCategoryModel.query.all()

        return (list)
    
    def save(self, roomCategory):
        db.session.add(roomCategory)
        db.session.commit()
        return (roomCategory.id)
    
    def update(self, roomCategory):
        RoomCategoryModel.query.filter(RoomCategoryModel.id == roomCategory.id).update(roomCategory)

        return True

    def deleteByRoomId(self, roomId):
        pass

    def delete(self, id):
        item = RoomCategoryModel.query.get(id)

        if (item == None):
            return (False)
        db.session.delete(item)
        db.session.commit()
        return (True)

class RoomEstablishmentDAO:

    def getByRoomId(self, roomId):
        roomEstablishments = RoomEstablishmentModel.query.filter(RoomEstablishmentModel.roomId == roomId).all()

        return(roomEstablishments)

    def list(self):
        list = RoomEstablishmentModel.query.all()

        return (list)

    def deleteByRoomId(self, roomId):
        db.session.query(RoomEstablishmentModel).filter_by(roomId=roomId).delete()

        return (True)

    def save(self, roomEstablishment):
        db.session.add(roomEstablishment)
        db.session.commit()
        return (True)
