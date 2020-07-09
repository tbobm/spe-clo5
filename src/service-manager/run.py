from app import app
from faker import Faker
import sys
import json
import random

ac  = len(sys.argv)
fake = Faker()

if (ac > 2 and sys.argv[1] == "mock" and sys.argv[2] == "list"):
    options = []
    for i in range((random.randint(0, 10))):
        option = {
            "id": random.randint(0, 100),
            "key": random.randint(0, 5),
            "basePrice": random.randint(0, 100)
        }
        options.append(option)
    with open('./tests/mock/Options.json', 'w') as outfile:
        json.dump(options, outfile, indent=4, sort_keys=True)
elif (ac > 2 and sys.argv[1] == "mock" and sys.argv[2] == "read"):
    option = {
        "id": 1,
        "key": 2,
        "basePrice": 13
    }
    option["id"] = random.randint(0, 100)
    option["key"] = random.randint(0, 5)
    option["basePrice"] = random.randint(0, 100)
    with open('./tests/mock/Option.json', 'w') as outfile:
        json.dump(option, outfile, indent=4, sort_keys=True)
elif __name__ == '__main__':
    app.run()
