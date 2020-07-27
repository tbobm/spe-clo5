import { Application } from "./src/app";
import faker from "faker";
import fs from "fs";

if (process.argv.length > 3){
    const ROOT_DIRECTORY = `src/controllers/mock`;
    const op = process.argv[2];
    const command = process.argv[3];

    if (op === "mock"){
        if (command === "list"){
            faker.locale = "fr";
            const filename = `${ROOT_DIRECTORY}/Addresses.json`;
            let nb = Number(Math.random() * 25);
            const arr = [];
            for (let i = 1; i < nb; i++){
                const o = {
                    "id": i,
                    "road": faker.address.streetName(),
                    "postalCode": parseInt(faker.address.zipCode(), 10),
                    "roadNumber": parseInt((Math.random() * 10).toString()),
                    "city": faker.address.city(),
                    "country": faker.address.country()
                };

                arr.push(o);
            }
            const str = JSON.stringify(arr, null, 4);

            fs.writeFileSync(filename, str);
        }
        else if (command === "read"){
            const o = {
                "id": 1,
                "road": faker.address.streetName(),
                "postalCode": parseInt(faker.address.zipCode(), 10),
                "roadNumber": parseInt((Math.random() * 10).toString()),
                "city": faker.address.city(),
                "country": faker.address.country()
            };
            faker.locale = "fr";            
            const filename = `${ROOT_DIRECTORY}/Address.json`;
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
