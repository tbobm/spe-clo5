from .db import db

class RoomModel(db.Model):
    __tablename__ = "room"
    id = db.Column("id", db.Integer, primary_key=True)
    name = db.Column("name", db.String(), nullable=False)
    roomCategoryId = db.Column("room_category_id", db.Integer, nullable=False)

    def __init__(self, name, roomCategoryId):
        self.name = name
        self.roomCategoryId = roomCategoryId

class RoomCategoryModel(db.Model):
    __tablename__ = "room_category"
    id = db.Column("id", db.Integer, primary_key=True)
    key = db.Column("key", db.String(), nullable=False)
    maxLength = db.Column("max_length", db.Integer, nullable=False)
    basePrice = db.Column("base_price", db.Integer, nullable=False)

    def __init__(self, key, maxLength, basePrice):
        self.key = key
        self.maxLength = maxLength
        self.basePrice = basePrice

class RoomEstablishmentModel(db.Model):
    __tablename__ = "establishment_room"
    roomId = db.Column("room_id", db.Integer, primary_key=True)
    establishmentId = db.Column("establishment_id", db.Integer, primary_key=True)
    overridePrice = db.Column("override_price", db.Integer, nullable=False)

    def __init__(self, roomId, establishmentId, overridePrice):
        self.roomId = roomId
        self.establishmentId = establishmentId
        self.overridePrice = overridePrice

db.create_all()