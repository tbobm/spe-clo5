import { Application } from "../app";
import { expect } from "chai";
import { describe, it } from "mocha";
import  sinon from "sinon";
import { EstablishmentRepository } from "../models/repositories/EstablishmentRepository";

describe("TEST - ESTABLISHMENT CONTROLLER", () => {
    const app = new Application();
    const sum = (a: number, b: number) => a + b
    let repository : EstablishmentRepository = null; 

    before(async () => {
        await app.start();

        repository = new EstablishmentRepository();
        sinon.stub(repository, "count").callsFake((param) => {
            return (Promise.resolve(12));
        });


    });

    after(async () => {
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

    it("count", async () => {
        const nb = await repository.count();

        expect(nb).equal(12);
    })
});

