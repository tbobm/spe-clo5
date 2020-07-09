#!/usr/bin/env python
from app import app
from faker import Faker
import sys
import json
import random

ac  = len(sys.argv)
fake = Faker()

if (ac > 2 and sys.argv[1] == "mock" and sys.argv[2] == "list"):
    rooms = [
        {
            "id": 1,
            "name": "Room 01",
            "room_category_id": 1
        },
        {
            "id": 2,
            "name": "Room 02",
            "room_category_id": 1
        }
    ]
    for i in range(len(rooms)):
        rooms[i]["id"] = random.randint(0, 100)
        rooms[i]["name"] = fake.company()
        rooms[i]["room_category_id"] = 1
    with open('./tests/mock/Rooms.json', 'w') as outfile:
        json.dump(rooms, outfile, indent=4, sort_keys=True)
elif (ac > 2 and sys.argv[1] == "mock" and sys.argv[2] == "read"):
    room = {
        "id": 1,
        "name": "Room 01",
        "room_category_id": 1
    }
    room["id"] = random.randint(0, 100)
    room["name"] = fake.company()
    room["room_category_id"] = 1
    with open('./tests/mock/Room.json', 'w') as outfile:
        json.dump(room, outfile, indent=4, sort_keys=True)
elif __name__ == '__main__':
    app.run()

