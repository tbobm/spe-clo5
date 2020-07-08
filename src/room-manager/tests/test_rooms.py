import json
import os
from app import RoomDAO, RoomModel



def test(mocker):
    def getRooms(self):
        models = []
        with open("./tests/mock/Rooms.json") as file:
            data = file.read()
            list = json.loads(data)
            for i in range(len(list)):
                model = RoomModel(list[i]['name'], list[i]['room_category_id'])
                model.id = list[i]['id']
                models.append(model)
        return (models)

    with open("./tests/mock/Rooms.json") as file:
        data = file.read()
        list_o = json.loads(data)
        mocker.patch("app.RoomDAO.list", getRooms)
        dao = RoomDAO()
        list = dao.list()
        for i in range(len(list)):
            assert list[i].id == list_o[i]['id']
            assert list[i].name == list_o[i]['name']
            assert list[i].roomCategoryId == list_o[i]['room_category_id']
