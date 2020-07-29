import container from "../container";
import { Application } from "../app";
import { expect } from "chai";
import sinon from "sinon";
import { AddressRepository } from "../models/repositories/AddressRepository";
import * as Constants from "../models/utils/Constants";
import * as fs from "fs";
import supertest from "supertest";
import { Address } from "../models/entities/Address";

describe("TEST - ADDRESS CONTROLLER TEST", () => {
    const application : Application = container.resolve(Constants.APP);
    const sum = (a:number, b:number) => a + b;
    let addressRepository: AddressRepository = null;
    const MOCK_DIRECTORY = `${__dirname}/mock`;

    before(async () => {
        await application.start();
        addressRepository = container.resolve(Constants.ADDRESS_REPOSITORY);
        const mockAddresses = JSON.parse(fs.readFileSync(`${MOCK_DIRECTORY}/Addresses.json`, {
            encoding: "utf8"
        }));
        const mockAddress = JSON.parse(fs.readFileSync(`${MOCK_DIRECTORY}/Address.json`, {
            encoding: "utf-8"
        }));
        const mock = sinon.mock(addressRepository);
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
        const address = new Address();

        address.city = mockAddress.city;
        address.id = mockAddress.id;
        address.postalCode = mockAddress.postalCode;
        address.roadNumber = mockAddress.roadNumber;
        address.road = mockAddress.road;
        address.country = mockAddress.country;
        mock.expects("count").returns(98);
        mock.expects("find").returns(tab);
        mock.expects("findOne").withExactArgs(mockAddress.id).returns(address);
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

        try {
            const response = await supertest(application.app).get("/");
            const body = response.body;
            const addresses = body.data;

            for (let i = 0; i < addresses.length; i++){
                const address = addresses[i];

                for (let key in address){
                    expect(address[key]).to.equal(mockAddresses[i][key]);
                }
            }
        }
        catch (error){
            expect(error).to.equal(null);
        }
    });

    it("check address", async () => {
        const mockAddress = JSON.parse(fs.readFileSync(`${MOCK_DIRECTORY}/Address.json`, {
            encoding: "utf-8"
        }));

        try {
            const response = await supertest(application.app)
            .get(`/${mockAddress.id}`)
            .expect(200);
            const body = response.body;
            const address = body.data;

            for (let key in address){
                expect(address[key]).to.equal(mockAddress[key]);
            }
        }
        catch(error){
            expect(error).to.equal(null);
        }
    });
});