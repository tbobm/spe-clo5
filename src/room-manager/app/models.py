from .db import db
from sqlalchemy import Integer, PrimaryKeyConstraint, ForeignKeyConstraint
from os import getenv

class RoomModel(db.Model):
    __tablename__ = "room"
    id = db.Column("id", db.Integer, primary_key=True)
    name = db.Column("name", db.String(), nullable=False)
    roomCategoryId = db.Column("room_category_id", db.Integer, db.ForeignKey('room_category.id'), nullable=False)

    def __init__(self, name, roomCategoryId):
        self.name = name
        self.roomCategoryId = roomCategoryId

class RoomCategoryModel(db.Model):
    __tablename__ = "room_category"
    id = db.Column("id", db.Integer, primary_key=True)
    key = db.Column("key", db.String(), nullable=False)
    maxLength = db.Column("max_length", db.Integer, nullable=False)
    basePrice = db.Column("base_price", db.Integer, nullable=False)

    def __init__(self, roomCategoryModel):
        self.key = roomCategoryModel["key"]
        self.maxLength = roomCategoryModel["maxLength"]
        self.basePrice = roomCategoryModel["basePrice"]

class RoomEstablishmentModel(db.Model):
    __tablename__ = "establishment_room"
    roomId = db.Column("room_id", db.Integer, db.ForeignKey('room.id'), primary_key=True)
    establishmentId = db.Column("establishment_id", db.Integer, primary_key=True)
    overridePrice = db.Column("override_price", db.Integer, nullable=False)

    def __init__(self, roomId, establishmentId, overridePrice):
        self.roomId = roomId
        self.establishmentId = establishmentId
        self.overridePrice = overridePrice

RoomModel.roomCategory = db.relationship(RoomCategoryModel, back_populates = "rooms")
RoomModel.establishments = db.relationship(RoomEstablishmentModel, back_populates = "room")
RoomCategoryModel.rooms = db.relationship(RoomModel, back_populates = "roomCategory")
RoomEstablishmentModel.room = db.relationship(RoomModel, back_populates = "establishments")


if getenv("FLASK_ENV") != "test":
    db.create_all()

__all__ = [
    db, RoomModel, RoomCategoryModel, RoomEstablishmentModel
]
