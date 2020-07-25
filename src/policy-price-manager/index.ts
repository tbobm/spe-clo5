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
                    "key": 1,
                    "policyPriceEstablishments": [
                        {
                            "establishmentId": 1
                        }
                    ],
                    "policyPricePeriods": [
                        {
                            "periodId": 1,
                            "period": {
                                "id": 1,
                                "from": 4,
                                "to": 5,
                                "sign": 1,
                                "percent": 15
                            }
                        }
                    ],
                    "policyPricePersons": []
                },
                {
                    "id": 2,
                    "key": 2,
                    "policyPriceEstablishments": [
                        {
                            "establishmentId": 1
                        }
                    ],
                    "policyPricePeriods": [],
                    "policyPricePersons": [
                        {
                            "personId": 1,    
                            "person": {
                                "id": 1,
                                "nb": 3,
                                "sign": 1,
                                "percent": 10
                            }
                        }
                    ]
                }
            ];
            faker.locale = "fr";
            const filename = `${ROOT_DIRECTORY}/PolicyPrices.json`;
            for (let i = 0; i < arr.length; i++){
                arr[i]["id"] = faker.random.number();
                arr[i]["key"] = faker.random.number() % 3;
                for (let j = 0; j < arr[i]["policyPriceEstablishments"].length; j++){
                    arr[i]["policyPriceEstablishments"][j]["establishmentId"] = faker.random.number();
                }
                const id = faker.random.number();
                for (let k = 0; k < arr[i]["policyPricePeriods"].length; k++){
                    arr[i]["policyPricePeriods"][k]["periodId"] = id;
                    arr[i]["policyPricePeriods"][k]["period"]["id"] = id;
                    arr[i]["policyPricePeriods"][k]["period"]["from"] = faker.random.number();
                    arr[i]["policyPricePeriods"][k]["period"]["to"] = faker.random.number();
                    arr[i]["policyPricePeriods"][k]["period"]["sign"] = faker.random.number() % 1;
                    arr[i]["policyPricePeriods"][k]["period"]["percent"] = faker.random.number() % 100;
                }
                const id2 = faker.random.number();
                for (let l = 0; l < arr[i]["policyPricePersons"].length; l++){
                    arr[i]["policyPricePersons"][l]["personId"] = id2;
                    arr[i]["policyPricePersons"][l]["person"]["id"] = id2;
                    arr[i]["policyPricePersons"][l]["person"]["nb"] = faker.random.number();
                    arr[i]["policyPricePersons"][l]["person"]["sign"] = faker.random.number() % 1;
                    arr[i]["policyPricePersons"][l]["person"]["percent"] = faker.random.number() % 100;
                }
            }
            const str = JSON.stringify(arr, null, 4);

            fs.writeFileSync(filename, str);
        }
        else if (command === "read"){
            const o : any = {
                "id": 1,
                "key": 1,
                "policyPriceEstablishments": [
                    {
                        "establishmentId": 1
                    }
                ],
                "policyPricePeriods": [
                    {
                        "periodId": 1,
                        "period": {
                            "id": 1,
                            "from": 4,
                            "to": 5,
                            "sign": 1,
                            "percent": 15
                        }
                    }
                ],
               "policyPricePersons": []
            };
            faker.locale = "fr";            
            const filename = `${ROOT_DIRECTORY}/PolicyPrice.json`;
            o["id"] = faker.random.number();
            o["key"] = faker.random.number() % 3;
            for (let j = 0; j < o["policyPriceEstablishments"].length; j++){
                o["policyPriceEstablishments"][j]["establishmentId"] = faker.random.number();
            }
            const id = faker.random.number();
            for (let k = 0; k < o["policyPricePeriods"].length; k++){
                o["policyPricePeriods"][k]["periodId"] = id;
                o["policyPricePeriods"][k]["period"]["id"] = id;
                o["policyPricePeriods"][k]["period"]["from"] = faker.random.number();
                o["policyPricePeriods"][k]["period"]["to"] = faker.random.number();
                o["policyPricePeriods"][k]["period"]["sign"] = faker.random.number() % 1;
                o["policyPricePeriods"][k]["period"]["percent"] = faker.random.number() % 100;
            }
            const id2 = faker.random.number();
            for (let l = 0; l < o["policyPricePersons"].length; l++){
                o["policyPricePersons"][l]["personId"] = id2;
                o["policyPricePersons"][l]["person"]["id"] = id2;
                o["policyPricePersons"][l]["person"]["nb"] = faker.random.number();
                o["policyPricePersons"][l]["person"]["sign"] = faker.random.number() % 1;
                o["policyPricePersons"][l]["person"]["percent"] = faker.random.number() % 100;
            }
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