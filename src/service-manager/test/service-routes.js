const chai = require("chai");
const fs = require("fs");
const runtime = require("../app");
const sinon = require("sinon");
const {
    sequelize,
    dataTypes
  } = require('sequelize-test-helpers');
const supertest = require("supertest");
const file = `${__dirname}/mock/service/getOne.json`;
const service = JSON.parse(fs.readFileSync(file, {
    encoding: "utf8"
}));
const prepareList = require("./prepare/service/list");
const prepareGetOne = require("./prepare/service/getOne");
const prepareEstablishmentGetOne = require("./prepare/service/establishment_getOne");

let mock = null;

describe("Service routes", () => {

    before(async () => {
        await runtime.start();
        mock = sinon.mock(require("../models").Service);
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
            const response = await supertest(runtime.app).get("/");
            const obj = response.body;
            const data = obj.data;
    
            chai.expect(response.status).to.equal(200);
            chai.expect(data).to.be.not.equal(null);
            chai.expect(data.length).to.equal(3);
        }
        catch (e){
            console.log(e.message);
            chai.expect(e).to.equal(null);
        }
    });

    it("#GetOne", async () => {
        const mock2 = sinon.mock(require("../models").EstablishmentService);
        prepareEstablishmentGetOne(mock2);
        try {
            const response = await supertest(runtime.app).get(`/${service.id}`);
            const obj = response.body;
            const data = obj.data;


            chai.expect(response.status).to.equal(200);
            chai.expect(data).to.be.not.equal(null);
         }
        catch (e){
            console.log(e.message);
            chai.expect(e).to.equal(null);
        }
        mock2.verify();
        mock2.restore();
    });
});
