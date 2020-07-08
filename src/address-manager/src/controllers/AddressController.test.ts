import { Application } from "../app";
import { expect } from "chai";
import sinon from "sinon";
import { AddressRepository } from "../models/repositories/AddressRepository";
import * as Constants from "../utils/Constants";
import * as fs from "fs";
import supertest from "supertest";
import { Address } from "../models/entities/Address";

describe("TEST - ADDRESS CONTROLLER TEST", () => {
    const application = new Application();
    const sum = (a:number, b:number) => a + b;
    let addressRepository: AddressRepository = null;
    const MOCK_DIRECTORY = `${__dirname}/mock`;

    before(async () => {
        await application.start();
        const container = application.container;
        addressRepository = container.resolve(Constants.ADDRESS_REPOSITORY);
        const mockAddresses = JSON.parse(fs.readFileSync(`${MOCK_DIRECTORY}/Addresses.json`, {
            encoding: "utf8"
        }));
        const mockAddress = JSON.parse(fs.readFileSync(`${MOCK_DIRECTORY}/Address.json`, {
            encoding: "utf-8"
        }));
        sinon.stub(addressRepository, "count").callsFake((param) => {
            return (Promise.resolve(98));
        });
        sinon.stub(addressRepository, "find").callsFake((param) => {
            const tab = [];
            for (let i = 0; i < mockAddresses.length; i++){
                const address: Address = new Address();
                const mockAddress = mockAddresses[i];

                address.city = mockAddress.city;
                address.id = mockAddress.id;
                address.postalCode = mockAddress.postalCode;
                address.roadNumber = mockAddress.roadNumber;
                address.road = mockAddress.road;
                address.country = mockAddress.country;
                tab.push(address);
            }
            return (Promise.resolve(tab));
        });
        sinon.stub(addressRepository, "findOne").callsFake((param) => {
            const address = new Address();

            address.city = mockAddress.city;
            address.id = mockAddress.id;
            address.postalCode = mockAddress.postalCode;
            address.roadNumber = mockAddress.roadNumber;
            address.road = mockAddress.road;
            address.country = mockAddress.country;
            return (Promise.resolve(address));
        });
    });

    after(async () => {
        await application.stop(); 
    });

    it("TU WORKS ? 1+1=2", () => {
        expect(sum(1, 1)).to.equal(2);
    });

    it("stub works ?", async () => {
        expect(await addressRepository.count()).to.equal(98);
    });

    it("check addresses", async () => {
        const mockAddresses = JSON.parse(fs.readFileSync(`${MOCK_DIRECTORY}/Addresses.json`, {
            encoding: "utf8"
        }));
 
        supertest(application.app)
        .get("/")
         .then((response) => {
            const body = response.body;
            const addresses = body.data;

            for (let i = 0; i < addresses.length; i++){
                const address = addresses[i];

                for (let key in address){
                    expect(address[key]).to.equal(mockAddresses[i][key]);
                }
            }
        })
        .catch((error) => {
            expect(error).to.equal(null);
        });
    });

    it("check address", async () => {
        const mockAddress = JSON.parse(fs.readFileSync(`${MOCK_DIRECTORY}/Address.json`, {
            encoding: "utf-8"
        }));
        const mockAddressId = JSON.parse(fs.readFileSync(`${MOCK_DIRECTORY}/AddressId.json`, {
            encoding: "utf8"
        }));

        supertest(application.app)
        .get(`/${mockAddressId.id}`)
        .expect(200)
        .then((response) => {
            const body = response.body;
            const address = body.data;

            for (let key in address){
                expect(address[key]).to.equal(mockAddress[key]);
            }
        })
        .catch((error) => {
            expect(error).to.equal(null);
        });
    });

});