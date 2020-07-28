import app from "../../index";
import container from "../container";
import { expect } from "chai";
import { describe, it } from "mocha";
import  sinon from "sinon";
import { EstablishmentRepository } from "../models/repositories/EstablishmentRepository";
import { Establishment } from "../models/entities/Establishment";
import fs from "fs";
import { EstablishmentAddress } from "../models/entities/EstablishmentAddress";
import supertest from "supertest";

describe("TEST - ESTABLISHMENT CONTROLLER", () => {
    const sum = (a: number, b: number) => a + b
    const MOCK_REPOSITORY = `${__dirname}/mock`;
    const FIND = "find";
    const FIND_ONE = "findOne";
    const COUNT = "count";
    const REPOSITORY = "establishmentRepository";
    let repository: EstablishmentRepository = null; 
    let mock: any = null;

    before(async () => {
        repository = container
        .resolve(REPOSITORY);
        mock = sinon
        .mock(repository);
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
        .expects(COUNT)
        .returns(12);
        mock
        .expects(FIND)
        .withExactArgs({
            relations: [
                "addresses"
            ]
        })
        .returns(arr);
        const filename2 = `${MOCK_REPOSITORY}/Establishment.json`
        const data2 = fs.readFileSync(filename2, {
            encoding: "utf8"
        });
        const o = JSON.parse(data2);
        const establishment = new Establishment();

        establishment.id = o.id;
        establishment.name = o.name;
        establishment.phoneNumber = o.phoneNumber;
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

    it("list establishments", async () => {
        try {
            const response = await supertest(app).get(`/`);/*.expect(200)*/;
            const body = response.body;
            const establishments = body.data;
            const filename = `${MOCK_REPOSITORY}/Establishments.json`
            const data = fs.readFileSync(filename, {
                encoding: "utf8"
            });
            const arr = JSON.parse(data);
            
            for (let i = 0; i < arr.length; i++){
                let o = arr[i];
                for (let key in o){
                    if (key == "addresses"){
                        let addresses = o[key];

                        for (let j = 0; j < addresses.length; j++){
                            const addr = addresses[j];

                            expect(addr["addressId"], establishments[i]["addresses"][j]["address_id"]);
                        }
                    }
                    else {
                        expect(o[key]).equal(establishments[i][key]);
                    }
                }
            }
        }
        catch(error){
            expect(error).equal(null);
        }
    });

    it("details establishment", async () => {
        const filename = `${MOCK_REPOSITORY}/Establishment.json`;
        const obj = JSON.parse(fs.readFileSync(filename, {
            encoding: "utf8"
        }));

        try {
            const response = await supertest(app).get(`/${obj.id}`).expect(200);
            const body = response.body;
            const establishment = body.data;
            const filename = `${MOCK_REPOSITORY}/Establishment.json`
            const data = fs.readFileSync(filename, {
                encoding: "utf8"
            });
            const o = JSON.parse(data);

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

