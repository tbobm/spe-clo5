'use strict';
const {
    Model
} = require('sequelize');

if (process.env.NODE_ENV === "test"){
    module.exports = {
        name: "ModelOption",
        findByPk: () => {},
        findAll: () => {}
    };
    return;
}
module.exports = (sequelize, DataTypes) => {
    class ModelOption extends Model {
        static associate(models) {
            // define association here
        }
    };
    ModelOption.init({
        key: { // 123456789
            type: DataTypes.INTEGER(10)
        },
        code: {
            type: DataTypes.STRING
        },
    }, {
        sequelize,
        modelName: 'ModelOption',
    });
    return ModelOption;
};
