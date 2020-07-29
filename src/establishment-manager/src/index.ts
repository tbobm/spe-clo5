import container from "./container";
import { Application } from ".//app";
import faker from "faker";
import fs from "fs";
import { APP } from "./models/utils/Constants";

if (process.argv.length > 3){
    const ROOT_DIRECTORY = `src/controllers/mock`;
    const op = process.argv[2];
    const command = process.argv[3];
    const MAX = 10;

    if (op === "mock"){
        if (command === "list"){
            const arr :any = [];
            faker.locale = "fr";
            const filename = `${ROOT_DIRECTORY}/Establishments.json`;
            let nb = Number(Math.random() * MAX);
            for (let i = 1; i < nb; i++){
                const o :any = {
                    "id": i,
                    "name": faker.company.companyName(),
                    "phoneNumber": faker.phone.phoneNumber(),
                    "addresses": [],
                };
                const addresses = [];
                nb = Number(Math.random() * MAX);
                for (let j = 0; j < nb; j++){
                    const address = {
                        "addressId": faker.random.number()
                    };

                    addresses.push(address);
                }
                o.addresses = addresses;
                arr.push(o);
            }
            const str = JSON.stringify(arr, null, 4);
            fs.writeFileSync(filename, str);
        }
        else if (command === "read"){
            faker.locale = "fr";            
            const filename = `${ROOT_DIRECTORY}/Establishment.json`;
            const o :any = {
                "id": 1,
                "name": faker.company.companyName(),
                "phoneNumber": faker.phone.phoneNumber(),
                "addresses": [],
            };
            const addresses = [];
            let nb = Number(Math.random() * MAX);
            for (let j = 0; j < nb; j++){
                const address = {
                    "addressId": faker.random.number()
                };

                addresses.push(address);
            }
            o.addresses = addresses;
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
    let application : Application = container.resolve(APP);

    application.start();
}

