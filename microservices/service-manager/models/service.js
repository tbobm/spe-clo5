'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Service extends Model {
        static associate(models) {
            // define association here
            // Service.hasMany(models.EstablishmentService, {
            //     as: 'establishments',
            //     foreignKey: 'id'
            // });
        }
    };
    Service.init({
        key: { // 123456789
            type: DataTypes.INTEGER(10)
        },
        basePrice: { // 15 euros
            type: DataTypes.INTEGER(10)
        },
    }, {
        sequelize,
        modelName: 'Service',
    });
    return Service;
};
