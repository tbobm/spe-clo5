import { Application } from "../app";
import { expect } from "chai";
import sinon from "sinon";
import { AddressRepository } from "../models/repositories/AddressRepository";
import * as Constants from "../utils/Constants";

describe("TEST - ADDRESS CONTROLLER TEST", () => {
    const application = new Application();
    const sum = (a:number, b:number) => a + b;
    let addressRepository: AddressRepository = null;

    before(async () => {
        await application.start();
        const container = application.container;
        addressRepository = container.resolve(Constants.ADDRESS_REPOSITORY);

        sinon.stub(addressRepository, "count").callsFake((param) => {
            return (Promise.resolve(98));
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

});