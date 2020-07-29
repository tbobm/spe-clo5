const sinon = require("sinon");
const fs = require("fs");
const mock = `${__dirname}/../../mock/service/getOne.json`;
const data = JSON.parse(fs.readFileSync(mock, {
    encoding: "utf8"
}));

const o = {};

for (let k in data)
{
    o[k] = data[k];
}

data.dataValues = o;

module.exports = (mock) => {
    mock.expects("findByPk").returns(Promise.resolve(data));
};
