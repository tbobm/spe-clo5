const chai = require("chai");
const fs = require("fs");
const runtime = require("../app");
const sinon = require("sinon");
const EstablishmentService = require('../models').EstablishmentService;
const supertest = require("supertest");
const file = `${__dirname}/mock/establishment-service/getOne.json`;
const establishmentService = JSON.parse(fs.readFileSync(file, {
    encoding: "utf8"
}));
const prepareList = require("./prepare/establishment-service/list");
const prepareGetOne = require("./prepare/establishment-service/getOne");

let mock = null;

describe("Establishment Service routes", () => {

    before(async () => {
        await runtime.start();
        mock = sinon.mock(EstablishmentService);
        prepareList(mock);
        prepareGetOne(mock);
    });

    after(async () => {
        mock.verify();
        mock.restore();
        await runtime.stop();
    });

    it("#List", async () => {
        try {
            const response = await supertest(runtime.app).get("/api/establishment_service");
            const obj = response.body;
            const data = obj.data;
            
            chai.expect(response.status).to.equal(200);
            chai.expect(data).to.be.not.equal(null);
            chai.expect(data.length).to.equal(2);
        }
        catch (e){
            console.log(e.message);
            chai.expect(e).to.equal(null);
        }
    });

    it("#GetOne", async () => {
        try {
            const response = await supertest(runtime.app).get(`/api/establishment_service/${establishmentService.id}`).expect(200);
            const obj = response.body;
            const data = obj.data;

            chai.expect(response.status).to.equal(200);
            chai.expect(data).to.be.not.equal(null);
        }
        catch (e){
            console.log(e.message);
            chai.expect(e).to.equal(null);
        }
    });
});
