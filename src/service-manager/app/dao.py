from .db import db
from .models import OptionModel

class OptionDAO:

    def read(self, id):
        option = OptionModel.query.get(id)

        return (option)
    
    def list(self):
        list = OptionModel.query.all()

        return (list)
    
    def save(self, option):
        model = OptionModel(option['model'], option['basePrice'])

        db.session.add(model)
        db.session.commit()
        return (model.id)

    def delete(self, id):
        item = self.read(id)

        if (item == None):
            return (False)
        db.session.delete(item)
        db.session.commit()
        return (True)

    def update(self, option):
        db.session.query(OptionModel).filter_by(id=option.id).update(OptionModel(option['key'], option['basePrice']))

        db.session.commit()
        return (True)
