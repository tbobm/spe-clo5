from flask_restx import Namespace, Resource
from .api import api
from .dao import BookingDAO

ns = Namespace("booking", description="Booking operations")

api.add_namespace(ns)

@ns.route("/")
class Bookings(Resource):

    bookingDao = BookingDAO()

    def get(self):
        list = self.bookingDao.list()

        if (list == None or len(list)):
            return {
                "message": "no content",
                "data": []
            }, 404
        ret = []
        for i in range(len(list)):
            ret.append({
                "id": list[i].id,
                "roomId": list[i].roomId,
                "userId": list[i].userId,
                "code": list[i].code,
                "totalPrice": list[i].totalPrice,
                "createdAt": list[i].createdAt,
                "updatedAt": list[i].updatedAt,
                "from": list[i].fromDate,
                "to": list[i].toDate,
            })
        o = {
                "data": ret,
                "message": "Booking list"
        }
        print(o)
        return o, 200

    def post(self, booking):
        id = self.bookingDao.save(booking)

        return ({
            "data": id,
            "message": "Booking created"            
        }), 201

    def put(self, booking):
        if (self.bookingDao.update(booking)):
            return ({
                "data": booking,
                "message": "Booking updated"
            }), 200
        return ({
            "message": "Fail to update"
        }), 400

@ns.route("/<id>")
@ns.doc(params={"id": "Booking id"})
class Booking(Resource):

    bookingDao = BookingDAO()

    def get(self, id):
        booking = self.bookingDao.read(id)

        if (booking == None):
            return ({
                "message": "no content"
            }), 204
        return ({
            "message": "get book",
            "data": {
                "id": booking.id,
                "roomId": booking.roomId,
                "userId": booking.userId,
                "code": booking.code,
                "totalPrice": booking.totalPrice,
                "createdAt": booking.createdAt,
                "updatedAt": booking.updatedAt,
                "from": booking.fromDate,
                "to": booking.toDate,
            }
        }), 200

    def delete(self, id):
        flag = self.bookingDao.delete(id)

        if (flag):
            return ({
                "message": "Book deleted"
            }), 200
        return ({
            "message": "failed"
        }), 400
