from .db import db
from .models import BookingModel

class BookingDAO:

    def read(self, id):
        book = BookingModel.query.get(id)

        return (book)

    def list(self):
        list = BookingModel.query.all()

        return (list)

    def save(self, book):
        model = BookingModel({
            "userId": book["userId"],
            "roomId": book["roomId"],
            "code": book["code"],
            "totalPrice": book["totalPrice"],
            "from": book["from"],
            "to": book["to"],
            "createdAt": book["createdAt"],
            "updatedAt": book["updatedAt"]
        })

        db.session.add(book)
        db.session.commit()
        return (model.id)
    
    def delete(self, id):
        book = read(id)

        if (book == None):
            return (False)
        db.session.delete(book)
        db.session.commit()
        return (True)

    def update(self, book):
        model = BookingModel(book)
        db.session.query(model).filter_by(id=model.id).update(book)

        return (True)
