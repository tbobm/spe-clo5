#!/usr/bin/env python
from app import app
from faker import Faker
import sys
import json
import random

ac  = len(sys.argv)
fake = Faker()

if (ac > 2 and sys.argv[1] == "mock" and sys.argv[2] == "list"):
    bookings = []

    for i in range((random.randint(0, 1000))):
        booking = {
            "id": random.randint(0, 100),
            "userId": random.randint(0, 5),
            "roomId": random.randint(0, 5),
            "code": fake.color(hue=135, luminosity='dark'),
            "totalPrice": random.randint(0, 100),
            "from": random.randint(0, 100),
            "to": random.randint(0, 100),
            "createdAt": random.randint(0, 10000),
            "updatedAt": random.randint(0, 10000)
        }
        bookings.append(booking)
    with open('./tests/mock/Bookings.json', 'w') as outfile:
        json.dump(bookings, outfile, indent=4, sort_keys=True)
elif (ac > 2 and sys.argv[1] == "mock" and sys.argv[2] == "read"):
    booking = {
        "id": 1,
        "userId": 1,
        "roomId": 2,
        "code": "LLOPX",
        "totalPrice": 34,
        "from": 13333,
        "to": 14444,
        "createdAt": 122222,
        "updatedAt": 2333331
    }
    booking["id"] = random.randint(0, 100)
    booking["userId"] = random.randint(0, 5)
    booking["roomId"] = random.randint(0, 5)
    booking["code"] = fake.color(hue=135, luminosity='dark')
    booking["totalPrice"] = random.randint(0, 100)
    booking["from"] = random.randint(0, 100)
    booking["to"] = random.randint(0, 100)
    booking["createdAt"] = random.randint(0, 10000)
    booking["updatedAt"] = random.randint(0, 10000)
    with open('./tests/mock/Booking.json', 'w') as outfile:
        json.dump(booking, outfile, indent=4, sort_keys=True)
elif __name__ == '__main__':
    app.run()
