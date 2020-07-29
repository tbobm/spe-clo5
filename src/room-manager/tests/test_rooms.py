from app import RoomDAO, RoomModel, app
import json
import os
import pytest

@pytest.fixture
def client():
    """Create Flask's test client to interact with the application"""
    with app.test_client() as client:
        yield client

def test(mocker, client):
    def getRooms(self):
        models = []
        with open("./tests/mock/Rooms.json") as file:
            data = file.read()
            list = json.loads(data)
            for i in range(len(list)):
                model = RoomModel(list[i]['name'], list[i]['roomCategoryId'])
                model.id = list[i]['id']
                models.append(model)
        return (models)
    
    def getRoomCategory(self, id):
        return None
    
    def getRoomEstablishment(self, id):
        return None

    with open("./tests/mock/Rooms.json") as file:
        data = file.read()
        list_o = json.loads(data)
        mocker.patch("app.RoomDAO.list", getRooms)
        mocker.patch("app.RoomCategoryDAO.read", getRoomCategory)
        mocker.patch("app.RoomEstablishmentDAO.getByRoomId", getRoomEstablishment)
        rv = client.get("/room/")
        list = rv.get_json()["data"]
        for i in range(len(list)):
            assert list[i]["id"] == list_o[i]['id']
            assert list[i]["name"] == list_o[i]['name']
