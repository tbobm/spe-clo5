import json
import os
from app import RoomDAO, RoomModel



def test(mocker):
    def getRoom(self, id):
        model = None
        with open("./tests/mock/Room.json") as file:
            data = file.read()
            o = json.loads(data)
            model = RoomModel(o['name'], o['room_category_id'])
            model.id = o['id']
        return (model)

    with open("./tests/mock/Room.json") as file:
        data = file.read()
        o = json.loads(data)
        mocker.patch("app.RoomDAO.read", getRoom)
        dao = RoomDAO()
        ret = dao.read(o['id'])
        assert ret.id == o['id']
        assert ret.name == o['name']
        assert ret.roomCategoryId == o['room_category_id']


