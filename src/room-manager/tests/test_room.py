from app import RoomDAO, RoomModel, app
import json
import os
import pytest
import json

@pytest.fixture
def client():
    """Create Flask's test client to interact with the application"""
    with app.test_client() as client:
        yield client

def test(mocker, client):
    def getRoom(self, id):
        model = None
        with open("./tests/mock/Room.json") as file:
            data = file.read()
            o = json.loads(data)
            model = RoomModel(o['name'], o['roomCategoryId'])
            model.id = o['id']
        return model
    
    def getRoomCategory(self, id):
        return None
    
    def getRoomEstablishment(self, id):
        return None

    with open("./tests/mock/Room.json") as file:
        mocker.patch("app.RoomDAO.read", getRoom)
        mocker.patch("app.RoomCategoryDAO.read", getRoomCategory)
        mocker.patch("app.RoomEstablishmentDAO.getByRoomId", getRoomEstablishment)
        data = file.read()
        o = json.loads(data)
        rv = client.get("/room/" + str(o["id"]))
        o1 = rv.get_json()["data"]
        print(o1)
        assert o["id"] == o1["id"]
        assert o["name"] == o1["name"]
