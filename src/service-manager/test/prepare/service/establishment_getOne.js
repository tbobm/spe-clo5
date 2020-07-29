const sinon = require("sinon");
const fs = require("fs");
const mock = `${__dirname}/../../mock/service/establishment_getOne.json`;
const data = JSON.parse(fs.readFileSync(mock, {
    encoding: "utf8"
}));

const list = [];

for (let item of data)
{
    const o = {};

    for (let key in item){
        o[key] = item[key];
    }
    item.dataValues = o;    
    list.push(item);
}


module.exports = (mock) => {
    mock.expects("findAll").returns(Promise.resolve(list));
};
