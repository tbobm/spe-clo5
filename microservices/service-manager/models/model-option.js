'use strict';
const {
    Model
} = require('sequelize');
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
        modelName: 'model_option',
    });
    return ModelOption;
};
