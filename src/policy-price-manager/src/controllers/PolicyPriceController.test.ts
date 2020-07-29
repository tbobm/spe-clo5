import { expect } from "chai";
import container from "../container";
import { Application } from "../app";
import { DTOPolicyPriceKey } from "./types/EPolicyPrice";
import {
    PERIOD_REPOSITORY, 
    POLICY_PRICE_ESTABLISHMENT_REPOSITORY, 
    POLICY_PRICE_PERIOD_REPOSITORY, 
    POLICY_PRICE_REPOSITORY, 
    PERSON_REPOSITORY, 
    APP
} from "../models/utils/Constants";
import sinon from "sinon";
import { PolicyPriceRepository } from "../models/repositories/PolicyPriceRepository";
import { PersonRepository } from "../models/repositories/PersonRepository";
import { PeriodRepository } from "../models/repositories/PeriodRepository";
import { PolicyPriceEstablishmentRepository } from "../models/repositories/PolicyPriceEstablishmentRepository";
import { PolicyPricePeriodRepository } from "../models/repositories/PolicyPricePeriodRepository";
import * as fs from "fs";
import supertest from "supertest";
import { PolicyPrice } from "../models/entities/PolicyPrice";

describe("Test - Policy Price Controller", () => {
    const app : Application = container.resolve(APP);
    let policyPriceRepository : PolicyPriceRepository = null;
    let personRepository: PersonRepository = null;
    let periodRepository : PeriodRepository = null;
    let policyPriceEstablishmentRepository : PolicyPriceEstablishmentRepository  = null;
    let policyPricePeriodRepository : PolicyPricePeriodRepository = null;
    let mock :any= null; 

    before(async () => {
        await app.start();
        const MOCK_DIR = `${__dirname}/mock`;
        const policyPrices = `${MOCK_DIR}/PolicyPrices.json`;
        const data = JSON.parse(fs.readFileSync(policyPrices, {
            encoding: "utf-8"
        }));
        policyPriceRepository = container.resolve(POLICY_PRICE_REPOSITORY);
        periodRepository = container.resolve(PERIOD_REPOSITORY);
        personRepository = container.resolve(PERSON_REPOSITORY);
        policyPricePeriodRepository = container.resolve(POLICY_PRICE_PERIOD_REPOSITORY);
        policyPriceEstablishmentRepository = container.resolve(POLICY_PRICE_ESTABLISHMENT_REPOSITORY);
        mock = sinon.mock(policyPriceRepository);
        mock.expects("count").returns(12);
        mock.expects("find").withExactArgs({
            relations: [
                "policyPricePeriods",
                "policyPricePersons"
            ]
        }).returns(data as PolicyPrice);
        const policyPrice = `${MOCK_DIR}/PolicyPrice.json`;
        const item = JSON.parse(fs.readFileSync(policyPrice, {
            encoding: "utf-8"
        }));
        mock.expects("findOne").withExactArgs(item.id, {
            relations: [
                "policyPricePeriods",
                "policyPriceEstablishments",
                "policyPricePersons"
            ]
        }).returns(item as PolicyPrice);
    })

    after(async () => {
        mock.verify();
        mock.restore();
        await app.stop();
    })

    it("Test", () => {
       expect(1 + 1).equal(2);
    })

    it('stub work', async () => {
        const nb = await policyPriceRepository.count();

        expect(nb).equal(12);
    });

    it("check list of policy prices", async () => {
        try {
            const response = await supertest(app.app).get("/").expect(200);
            const body = response.body;
            const list = body.data;
            const MOCK_DIR = `${__dirname}/mock`;
            const policyPrices = `${MOCK_DIR}/PolicyPrices.json`;
            const data = JSON.parse(fs.readFileSync(policyPrices, {
                encoding: "utf-8"
            }));
    
            expect(response.status).to.equal(200);
            for (let i = 0; i < list.length; i++){
                const item = list[i];
            
                for (let key in item){
                    if (key == "persons"){
                        for (let j = 0; j < item[key].length; j++){
                            expect(item[key][j]["id"]).to.equal(data[i]["policyPricePersons"][j]["personId"]);
                        }
                    }
                    else if (key == "periods"){
                        for (let j = 0; j < item[key].length; j++){
                            expect(item[key][j]["id"]).to.equal(data[i]["policyPricePeriods"][j]["periodId"]);
                        }
                    }
                    else if (key == "key"){
                        var d = DTOPolicyPriceKey[item[key]];

                        expect(d).to.equal(data[i][key]);
                    }
                    else {
                        expect(item[key]).to.equal(data[i][key]);
                    }
                }
            }
        }
        catch (e){
            expect(e).to.equal(null);
        }
    });

    it("check policy price", async () => {
        try {
            const MOCK_DIR = `${__dirname}/mock`;
            const policyPrices = `${MOCK_DIR}/PolicyPrice.json`;
            const data = JSON.parse(fs.readFileSync(policyPrices, {
                encoding: "utf-8"
            }));
            const response = await supertest(app.app).get(`/${data.id}`).expect(200);
            const body = response.body;
            const item = body.data;

            expect(response.status).to.equal(200);
            for (let key in item){
                if (key == "establishments"){
                    for (let i = 0; i < item[key].length; i++){
                        expect(item[key][i]["establishmentId"]).to.equal(data["policyPriceEstablishments"][i]["establishmentId"]);
                    }
                }
                else if (key == "persons"){
                    for (let i = 0; i < item[key].length; i++){
                        expect(item[key][i]["id"]).to.equal(data["policyPricePersons"][i]["personId"]);
                    }
                }
                else if (key == "periods"){
                    for (let i = 0; i < item[key].length; i++){
                        expect(item[key][i]["id"]).to.equal(data["policyPricePeriods"][i]["periodId"]);
                    }
                }
                else if (key == "key"){
                    var d = DTOPolicyPriceKey[item[key]];

                    expect(d).to.equal(data[key]);
                }
                else {
                    expect(item[key]).to.equal(data[key]);
                }
            }
        }
        catch (error){
            console.log(error.message);
            
            expect(error).to.equal(null);
        }
    });
});
