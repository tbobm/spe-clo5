const chai = require("chai");
const app = require("../app");

describe("Server stop", () => {
    it("Stop server", async () => {
        chai.expect(await app.stop()).to.equal(true);
    });
});
