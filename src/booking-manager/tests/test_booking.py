import pytest
import json
from app import BookingModel, app

@pytest.fixture
def client():
    """Create Flask's test client to interact with the application"""
    with app.test_client() as client:
        yield client

def testBooking(mocker, client):
    def getBooking(self, id):
        with open("./tests/mock/Booking.json") as file:
            data = file.read()
            item = json.loads(data)
            model = BookingModel(item)
            model.id = item['id']
            return (model)
        return (None)
    mocker.patch("app.BookingDAO.read", getBooking)
    rv = client.get('/booking/1')
    o1 = rv.get_json()["data"]
    with open("./tests/mock/Booking.json") as file:
        data = file.read()
        o2 = json.loads(data)
        for key in o2:
            assert o1[key] == o2[key]

def testBookings(mocker, client):
    def getBookings(self):
        print("enter ?")
        models = []
        with open("./tests/mock/Bookings.json") as file:
            data = file.read()
            item = json.loads(data)
            print(item)
            for i in range(len(item)):
                model = BookingModel(item[i])
                models.append(model)
        return (models)
    mocker.patch("app.BookingDAO.list", getBookings)
    rv = client.get('/booking/')
    o = rv.get_json()
    o1 = o["data"]
    with open("./tests/mock/Bookings.json") as file:
        data = file.read()
        o2 = json.loads(data)
        for i in range(len(o1)):
            item = o1[i]
            for key in item:
                assert item[key] == o2[i][key]
