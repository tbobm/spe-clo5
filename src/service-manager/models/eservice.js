'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class EService extends Model {
        static associate(models) {
            // define association here
        }
    };
    EService.init({
        key: { // 123456789
            type: DataTypes.INTEGER(10)
        },
        code: { // GARAGE_PLACE
            type: DataTypes.STRING
        },
    }, {
        sequelize,
        modelName: 'EService',
    });
    return EService;
};
