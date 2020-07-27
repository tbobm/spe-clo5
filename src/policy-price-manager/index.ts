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
            const arr = [];
            const filename = `${ROOT_DIRECTORY}/PolicyPrices.json`;
            let nb = Math.random() * 12;
            for (let i = 1; i < nb; i++){
                const o : any= {
                    "id": i,
                    "key": Number(faker.random.number(3)),
                    "policyPriceEstablishments": [],
                    "policyPricePeriods": [],
                    "policyPricePersons": []
                };
                nb = Math.random() * 15;
                const policyPricePeriods = [];
                for (let k = 1; k < nb; k++){
                    policyPricePeriods.push({
                        "periodId": k,
                        "period": {
                            "id": k,
                            "from": faker.random.number(),
                            "to": faker.random.number(),
                            "sign": faker.random.number() % 1,
                            "percent": faker.random.number() % 100
                        }
                    });
                }
                const policyPricePersons = [];
                nb = Math.random() * 15;
                for (let l = 1; l < nb; l++){
                    policyPricePersons.push({
                        "personId": l,
                        "person": {
                            "id": l,
                            "nb": faker.random.number(),
                            "sign": faker.random.number() % 1,
                            "percent": faker.random.number() % 100
                        }
                    });
                }
                const policyPriceEstablishments = [];
                nb = Math.random() * 15;
                for (let j = 0; j < nb; j++){
                    policyPriceEstablishments.push({
                        "establishmentId": faker.random.number()
                    });
                }
                o.policyPricePersons = policyPricePersons;
                o.policyPricePeriods = policyPricePeriods;
                o.policyPriceEstablishments = policyPriceEstablishments;
                arr.push(o);
            }
            const str = JSON.stringify(arr, null, 4);

            fs.writeFileSync(filename, str);
        }
        else if (command === "read"){
            faker.locale = "fr";            
            const filename = `${ROOT_DIRECTORY}/PolicyPrice.json`;
            const o : any = {
                "id": 1,
                "key": Number(faker.random.number(3)),
                "policyPriceEstablishments": [],
                "policyPricePeriods": [],
                "policyPricePersons": []
            }
            const policyPriceEstablishments = [];
            let nb = Math.random() * 15;
            for (let j = 0; j < nb; j++){
                policyPriceEstablishments.push({
                    "establishmentId": faker.random.number()
                });
            }
            o["policyPriceEstablishments"] = policyPriceEstablishments;
            nb = Math.random() * 10;
            const policyPricePeriods = [];
            for (let k = 1; k < nb; k++){
                policyPricePeriods.push({
                    "periodId": k,
                    "period": {
                        "id": k,
                        "from": faker.random.number(),
                        "to": faker.random.number(),
                        "sign": faker.random.number() % 1,
                        "percent": faker.random.number() * 100
                    }
                });
            }
            o["policyPricePeriods"] = policyPricePeriods;
            const policyPricePersons = [];
            nb = Math.random() * 8;
            for (let l = 1; l < nb; l++){
                policyPricePersons.push({
                    "personId": l,
                    "person": {
                        "id": l,
                        "nb": faker.random.number(),
                        "sign": faker.random.number() % 1,
                        "percent": faker.random.number() * 100
                    }
                });
            }
            o["policyPricePersons"] = policyPricePersons;
            const str = JSON.stringify(o, null, 4);

            fs.writeFileSync(filename, str);
        }
        else if (command === "write"){
            const filename = `${ROOT_DIRECTORY}/PolicyPriceId.json`;
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