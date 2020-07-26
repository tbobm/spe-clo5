from app import db

class BookingModel(db.Model):
    __tablename__ = "booking"
    id = db.Column("id", db.Integer, primary_key=True)
    userId = db.Column("user_id", db.Integer, nullable=False)
    roomId = db.Column("room_id", db.Integer, nullable=False)
    code = db.Column("code", db.String(256), unique=True, nullable=False)
    totalPrice = db.Column("total_price", db.Integer, nullable=False)
    fromDate = db.Column("from", db.DateTime, nullable=False)
    toDate = db.Column("to", db.DateTime, nullable=False)
    createdAt = db.Column("created_at", db.DateTime, nullable=False)
    updatedAt = db.Column("updated_at", db.DateTime, nullable=False)

    def __init__(self, book):
        self.id = book["id"]
        self.userId = book["userId"]
        self.roomId = book["roomId"]
        self.code = book["code"]
        self.totalPrice = book["totalPrice"]
        self.fromDate = book["from"]
        self.toDate = book["to"]
        self.createdAt = book["createdAt"]
        self.updatedAt = book["updatedAt"]
