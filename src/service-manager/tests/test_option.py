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
    id = 1
    def getOption(self, id):
        with open("./tests/mock/Option.json") as file:
            data = file.read()
            item = json.loads(data)
            model = OptionModel(item['key'], item['basePrice'])
            model.id = id
            return (model)
    mocker.patch("app.OptionDAO.read", getOption)
    rv = client.get('/option/' + str(id))
    o1 = rv.get_json()["data"]
    with open("./tests/mock/Option.json") as file:
        data = file.read()
        o2 = json.loads(data)
        assert o1["key"] == o2["key"]
        assert o1["basePrice"] == o2["basePrice"]
        assert o1["id"] == id
