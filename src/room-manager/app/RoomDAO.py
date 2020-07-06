from .db import db
from .models import RoomModel

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

