import { Application } from "../app";
import container from "../container";
import { expect } from "chai";
import { describe, it } from "mocha";
import  sinon from "sinon";
import { EstablishmentRepository } from "../models/repositories/EstablishmentRepository";
import { Establishment } from "../models/entities/Establishment";
import fs from "fs";
import { EstablishmentAddress } from "../models/entities/EstablishmentAddress";
import supertest from "supertest";
import { APP } from "../models/utils/Constants";

describe("TEST - ESTABLISHMENT CONTROLLER", () => {
    const sum = (a: number, b: number) => a + b
    const MOCK_REPOSITORY = `${__dirname}/mock`;
    const FIND = "find";
    const FIND_ONE = "findOne";
    const COUNT = "count";
    const REPOSITORY = "establishmentRepository";
    let repository: EstablishmentRepository = null; 
    let mock: any = null;
    const app : Application = container.resolve(APP);

    before(async () => {
        await app.start();
        repository = container
        .resolve(REPOSITORY);
        mock = sinon
        .mock(repository);
        mock
        .expects(COUNT)
        .returns(12);
        const tab = [];
        const filename = `${MOCK_REPOSITORY}/Establishments.json`;
        const data = fs.readFileSync(filename, {
            encoding: "utf8"
        });
        const arr = JSON.parse(data);

        for (let item of arr){
            const establishment = new Establishment();

            establishment.id = item.id;
            establishment.name = item.name;
            establishment.phoneNumber = item.phoneNumber;
            if (!item.addresses){
                item.addresses = [];
            }
            establishment.addresses = item.addresses.map((addr: any)  => {
                const establishmentAddress = new EstablishmentAddress();

                establishmentAddress.addressId = addr.addressId;
                establishmentAddress.establishment = establishment;
                establishmentAddress.establishmentId = establishment.id;
                return (establishmentAddress);
            });
            tab.push(establishment);
        }
        mock
        .expects(FIND)
        .withExactArgs({
            relations: [
                "addresses"
            ]
        })
        .returns(tab);
        const filename2 = `${MOCK_REPOSITORY}/Establishment.json`
        const data2 = fs.readFileSync(filename2, {
            encoding: "utf8"
        });
        const o = JSON.parse(data2);
        const establishment = new Establishment();

        establishment.id = o.id;
        establishment.name = o.name;
        establishment.phoneNumber = o.phoneNumber;
        if (!o.addresses){
            o.addresses = [];
        }
        establishment.addresses = o.addresses.map((addr: any) => {
            const establishmentAddress = new EstablishmentAddress();

            establishmentAddress.addressId = addr.addressId;
            establishmentAddress.establishment = establishment;
            establishmentAddress.establishmentId = establishment.id;
            return (establishmentAddress);
        });
        mock
        .expects(FIND_ONE)
        .withExactArgs(o.id, {
            relations: [
                "addresses",
            ]
        })
        .returns(establishment);
    });

    after(async () => {
        mock.verify();
        mock.restore();
        await app.stop();
    })

    it("1+1=2",  (done) => {
        expect(sum(1, 1)).equal(2)
        done()
    })

    it("1+2=3", (done) => {
        expect(sum(1, 2)).equal(3)
        done()
    });

    it("stub works", async () => {
        const nb = await repository.count();

        expect(nb).equal(12);
    });

    it("list establishments",  async () => {
        const filename = `${MOCK_REPOSITORY}/Establishments.json`
        const data = fs.readFileSync(filename, {
            encoding: "utf8"
        });
        const arr = JSON.parse(data);

        try {
            const response = await supertest(app.app).get(`/`).expect(200);
            const body = response.body;
            const establishments = body.data;
            
            for (let i = 0; i < arr.length; i++){
                const o = arr[i];
                const establishment = establishments[i];

                for (let key in o){
                    if (key == "addresses"){
                        let addresses = o[key];

                        for (let j = 0; j < addresses.length; j++){
                            const addr = addresses[j];

                            expect(addr["addressId"]).equal(establishment["addresses"][j]["address_id"]);
                        }
                    }
                    else {
                        expect(o[key]).equal(establishment[key]);
                    }
                }
            }
        }
        catch(e){
            console.log(e);
            expect(e).equal(null);
        }
    });

    it("details establishment", async () => {
        const filename = `${MOCK_REPOSITORY}/Establishment.json`
        const data = fs.readFileSync(filename, {
            encoding: "utf8"
        });
        const o = JSON.parse(data);

        try {
            const response = await supertest(app.app).get(`/${o.id}`).expect(200);
            const body = response.body;
            const establishment = body.data;

            for (let key in o){
                if (key == "addresses"){
                    let addresses = o[key];

                    for (let i = 0; i < addresses.length; i++){
                        const addr = addresses[i];

                        expect(addr["addressId"], establishment["addresses"][i]["address_id"]);
                    }
                }
                else {
                    expect(o[key]).equal(establishment[key]);
                }
            }
        }
        catch (error){
            expect(error).equal(null);
        }
    });
});

