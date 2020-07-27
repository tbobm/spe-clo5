const chai = require("chai")

describe("All works", () => {
    it("hello world", () => {
        const message = "Hello World";

        chai.expect(message).to.equal("Hello World");
    });
});
