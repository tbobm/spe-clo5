from .db import db

class OptionModel(db.Model):
    __tablename__  = "option"
    id = db.Column("id", db.Integer, primary_key=True)
    key = db.Column("key", db.Integer, nullable=False)
    basePrice = db.Column("base_price", db.Integer, nullable=False)

    def __init__(self, key, basePrice):
        self.key = key
        self.basePrice = basePrice
