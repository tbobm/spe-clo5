import os
import tempfile
from app import app, OptionDAO, OptionModel
import pytest
import json

@pytest.fixture
def client():
    with app.test_client() as client:
        yield client


def test(client, mocker):
    def getOptions(self):
        models = []
        with open("./tests/mock/Options.json") as file:
            data = file.read()
            list = json.loads(data)
            for i in range(len(list)):
                model = OptionModel(list[i]['key'], list[i]['basePrice'])
                model.id = list[i]['id']
                models.append(model)
        return (models)
    mocker.patch("app.OptionDAO.list", getOptions)
    rv = client.get('/option/')
    list1 = rv.get_json()["data"]
    with open("./tests/mock/Options.json") as file:
        data = file.read()
        list2 = json.loads(data)
        for i in range(len(list1)):
            assert list1[i]["key"] == list2[i]["key"]
            assert list1[i]["basePrice"] == list2[i]["basePrice"]
            assert list1[i]["id"] == list2[i]["id"]

