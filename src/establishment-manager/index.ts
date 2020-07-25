import { Application } from "./src/app";
import faker from "faker";
import fs from "fs";

if (process.argv.length > 3){
    const ROOT_DIRECTORY = `src/controllers/mock`;
    const op = process.argv[2];
    const command = process.argv[3];

    if (op === "mock"){
        if (command === "list"){
            const arr : any = [
                {
                    "id": 1,
                    "name": "Hotel 01",
                    "phoneNumber": "0123456789",
                    "addresses": [
                        {
                            "addressId": 3
                        }
                    ],
                    "services": [
                        {
                            "serviceId": 2,
                            "overridePrice": 45,
                            "model": 1,
                            "interval": 30
                        }
                    ]
                },
                {
                    "id": 2,
                    "name": "Hotel 02",
                    "phoneNumber": "0123456789",
                    "addresses": [
                        {
                            "addressId": 4
                        }
                    ],
                    "services": [
                        {
                            "serviceId": 2,
                            "overridePrice": 45,
                            "model": 1,
                            "interval": 30
                        }
                    ]
                }
            ];
            faker.locale = "fr";
            const filename = `${ROOT_DIRECTORY}/Establishments.json`;
            for (let i = 0; i < arr.length; i++){
                arr[i]["id"] = faker.random.number();
                arr[i]["name"] = faker.company.companyName();
                arr[i]["phoneNumber"] = faker.phone.phoneNumber();
                for (let j = 0; j < arr[i]["addresses"].length; j++){
                    arr[i]["addresses"][j]["addressId"] = faker.random.number();
                }
                for (let k = 0; k < arr[i]["services"].length; k++){
                    arr[i]["services"][k]["serviceId"] = faker.random.number();
                    arr[i]["services"][k]["overridePrice"] = parseInt(faker.finance.amount(), 10);
                    arr[i]["services"][k]["model"] = faker.random.number();
                    arr[i]["services"][k]["interval"] = faker.random.number();
                }
            }
            const str = JSON.stringify(arr, null, 4);

            fs.writeFileSync(filename, str);
        }
        else if (command === "read"){
            const o : any ={
                "id": 1,
                "name": "Hotel 01",
                "phoneNumber": "0123456789",
                "addresses": [
                    {
                        "addressId": 3
                    }
                ],
                "services": [
                    {
                        "serviceId": 2,
                        "overridePrice": 45,
                        "model": 1,
                        "interval": 30
                    }
                ]
            };
            faker.locale = "fr";            
            const filename = `${ROOT_DIRECTORY}/Establishment.json`;
            o["id"] = faker.random.number();
            o["name"] = faker.company.companyName();
            o["phoneNumber"] = faker.phone.phoneNumber();
            for (let j = 0; j < o["addresses"].length; j++){
                o["addresses"][j]["addressId"] = faker.random.number();
            }
            for (let k = 0; k < o["services"].length; k++){
                o["services"][k]["serviceId"] = faker.random.number();
                o["services"][k]["overridePrice"] = parseInt(faker.finance.amount(), 10);
                o["services"][k]["model"] = faker.random.number();
                o["services"][k]["interval"] = faker.random.number();
            }
            const str = JSON.stringify(o, null, 4);

            fs.writeFileSync(filename, str);
        }
        else if (command === "write"){
            const filename = `${ROOT_DIRECTORY}/EstablishmentId.json`;
            const o = {
                "id": faker.random.number()
            };
            const str = JSON.stringify(o, null, 4);

            fs.writeFileSync(filename, str);
        }
    }
}
else {
    (async () => {
        try {
            const application = new Application();
    
            await application.start();
        }
        catch (e){
            console.log(`Error ${e.message}`);
        }
    })();
}
