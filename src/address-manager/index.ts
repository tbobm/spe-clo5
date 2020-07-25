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
                    "road": "Ouvrecourt",
                    "postalCode": 93400,
                    "roadNumber": 3,
                    "city": "Paris",
                    "country": "France"
                },
                {
                    "id": 2,
                    "road": "Evreytour",
                    "postalCode": 93400,
                    "roadNumber": 3,
                    "city": "Paris",
                    "country": "France"
                }
            ];
            faker.locale = "fr";
            const filename = `${ROOT_DIRECTORY}/Addresses.json`;
            for (let i = 0; i < arr.length; i++){
                arr[i]["id"] = faker.random.number();
                arr[i]["road"] = faker.address.streetName();
                arr[i]["postalCode"] = parseInt(faker.address.zipCode(), 10);
                arr[i]["roadNumber"] = parseInt((Math.random() * 10).toString());
                arr[i]["city"] = faker.address.city();
                arr[i]["country"] = faker.address.country();
            }
            const str = JSON.stringify(arr, null, 4);

            fs.writeFileSync(filename, str);
        }
        else if (command === "read"){
            const o : any  = {
                "id": 1,
                "road": "Ouvrecourt",
                "postalCode": 93400,
                "roadNumber": 3,
                "city": "Paris",
                "country": "France"
            };
            faker.locale = "fr";            
            const filename = `${ROOT_DIRECTORY}/Address.json`;
            o["id"] = faker.random.number();
            o["road"] = faker.address.streetName();
            o["postalCode"] = parseInt(faker.address.zipCode(), 10);
            o["city"] = faker.phone.phoneNumber();
            o["roadNumber"] = parseInt((Math.random() * 10).toString());
            o["country"] = faker.address.country();
            const str = JSON.stringify(o, null, 4);

            fs.writeFileSync(filename, str);
        }
        else if (command === "write"){
            const filename = `${ROOT_DIRECTORY}/AddressId.json`;
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
