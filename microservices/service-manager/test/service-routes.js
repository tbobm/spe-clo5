const chai = require("chai");
const fs = require("fs");
const runtime = require("../app");
const sinon = require("sinon");
const Service = require('../models').Service;
const supertest = require("supertest");
const file = `${__dirname}/mock/service/getOne.json`;
const service = JSON.parse(fs.readFileSync(file, {
    encoding: "utf8"
}));
const prepareList = require("./prepare/service/list");
const prepareGetOne = require("./prepare/service/getOne");

let mock = null;

describe("Service routes", () => {

    before(async () => {
        await runtime.start();
        mock = sinon.mock(Service);
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
            const response = await supertest(runtime.app).get("/api/service");
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
        try {
            const response = await supertest(runtime.app).get(`/api/service/${service.id}`);
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
