from flask_restx import Namespace, Resource, fields
from .api import api
from .dao import BookingDAO
from werkzeug.exceptions import HTTPException
import datetime
import requests
from .services import serviceManager, roomManager, establishmentManager, policyPriceManager

ns = Namespace("booking", description="Booking operations")

booking = ns.model('Booking', {
    "id": fields.Integer(required=False),
    "roomId": fields.Integer(min=0),
    "userId": fields.Integer(min=0),
    "code": fields.String,
    "totalPrice": fields.Integer,
    "createdAt": fields.DateTime(default=datetime.datetime.now()),
    "updatedAt": fields.DateTime(default=datetime.datetime.now()),
    "from": fields.Date,
    "to": fields.Date,
})

api.add_namespace(ns)

@ns.route("/")
class Bookings(Resource):
    bookingDao = BookingDAO()

    def get(self):
        list = self.bookingDao.list()

        if (list == None or len(list) == 0):
            return {
                "message": "no content",
                "data": []
            }, 200
        ret = []
        for item in list:
            ret.append({
                "id": item.id,
                "roomId": item.roomId,
                "userId": item.userId,
                "code": item.code,
                "totalPrice": item.totalPrice,
                "createdAt": item.createdAt,
                "updatedAt": item.updatedAt,
                "from": item.fromDate,
                "to": item.toDate,
            })
        o = {
                "data": ret,
                "message": "Booking list"
        }
        return o, 200

    @ns.expect(booking)
    def post(self):
        try:
            keys = [
                "from",
                "to"
            ]
            for key in keys:
                api.payload[key] = datetime.datetime.fromtimestamp(api.payload[key])
            keys = [
                "createdAt",
                "updatedAt"
            ]
            for key in keys:
                api.payload[key] = datetime.datetime.now()
            # r = requests.post(roomManager + "/" + api.payload['roomId'])
            # o = r.json()
            # print(o)
            print("debug")
            i = self.bookingDao.save(api.payload)
            print("debug 2")

            return ({
                "data": i,
                "message": "Booking created"            
            }), 201
        except HTTPException as e:
            return ({ "message": e.description}), e.code
        except KeyError as e:
            print(e)
            return ({
                "message": f"fields in missing: {str(e)}"
            }), 400
        except Exception as e:
            return ({ "message": str(e)}), 500

    @ns.expect(booking)
    def put(self):
        try:
            keys = [
                "from",
                "to",
                "createdAt"
            ]
            for key in keys:
                api.payload[key] = datetime.datetime.fromtimestamp(api.payload[key])
            keys = [
                "updatedAt"
            ]
            for key in keys:
                api.payload[key] = datetime.datetime.now()
            if (self.bookingDao.update(api.payload)):
                return ({
                    "message": "Booking updated"
                }), 200
            return ({
                "message": "Fail to update"
            }), 400
        except HTTPException as e:
            return ({ "message": e.description}), e.code
        except KeyError as e:
            return ({
                "message": f"fields in missing: {str(e)}"
            }), 400
        except Exception as e:
            return ({ "message": str(e)}), 500

@ns.route("/<id>")
@ns.doc(params={"id": "Booking id"})
class Booking(Resource):

    bookingDao = BookingDAO()

    def get(self, id):
        booking = self.bookingDao.read(id)

        print(booking)
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
