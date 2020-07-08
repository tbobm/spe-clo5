from flask_restx import fields, Resource, Namespace
from .api import api
from .dao import OptionDAO

ns = Namespace('option', description="Option related operations", path="")

api.add_namespace(ns)

@ns.route("/")
class Option(Resource):

    optionDao = OptionDAO()

    def get(self):
        list = self.optionDao.list()
        if (list == None):
            list = []
        options = []

        for item in list:
            option = {
                'id': item.id,
                'key': item.key,
                'basePrice': item.basePrice
            }

            options.append(option)
        obj = {
            'message': 'List options',
            'data': options
        }
        return (obj), 200

    def post(self, option):
        id = self.optionDao.save(option)
        obj = {
            'message': 'Save option',
            'data': id
        }
        if (id == None):
            return {
                'message': 'Failed to update option'
            }, 400
        return (obj), 200

    def put(self, option):
        if (self.optionDao.update(option)):
            obj = {
                'message': 'Option updated',
                'data': option
            }
            return (obj), 200
        return ({
            'message': 'Failed to update option'
        }), 400

@ns.route("/<id>")
@ns.doc(params={"id": "Option id"})
class Options(Resource):

    optionDao = OptionDAO()

    def get(self, id):
        option = self.optionDao.read(id)

        if (option == None):
            return {
                'message': 'no content'
            }, 204
        return {
            'message': 'Find option',
            'data': {
                "id": 1,
                "key": option.key,
                "basePrice": option.basePrice
            }
        }, 200

    def delete(self, id):
        flag = self.optionDao.delete(id)

        if (flag):
            return {
                'message': 'Option deleted'
            }, 200
        return {
            'message': 'Failed to delete'
        }, 400
