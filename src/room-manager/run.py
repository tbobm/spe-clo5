#!/usr/bin/env python
from app import app, RoomModel
from faker import Faker
import sys
import json
import random

ac  = len(sys.argv)
fake = Faker()

if (ac > 2 and sys.argv[1] == "mock" and sys.argv[2] == "list"):
    rooms = []

    for i in range(random.randint(0, 100)):
        room = {
            "id": i,
            "name": fake.company(),
            "roomCategoryId": random.randint(0, 100)
        }
        rooms.append(room)
    with open('./tests/mock/Rooms.json', 'w') as outfile:
        json.dump(rooms, outfile, indent=4, sort_keys=True)
elif (ac > 2 and sys.argv[1] == "mock" and sys.argv[2] == "read"):
    room = {
        "id": 1,
        "name": fake.company(),
        "roomCategoryId": random.randint(0, 100)
    }
    with open('./tests/mock/Room.json', 'w') as outfile:
        json.dump(room, outfile, indent=4, sort_keys=True)
elif __name__ == '__main__':
    app.run()

