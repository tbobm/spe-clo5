'use strict';
const {
    Model
} = require('sequelize');

if (process.env.NODE_ENV === "test"){
    module.exports = {
        name: "EstablishmentService",
        findByPk: () => {},
        findAll: () => {}
    };
    return;
}
module.exports = (sequelize, DataTypes) => {
    class EstablishmentService extends Model {
        static associate(models) {
            // define association here
            // EstablishmentService.belongsTo(models.Service, {foreignKey: 'service_id'});
        }
    };
    EstablishmentService.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        service_id: {
            type: DataTypes.INTEGER(10)
        },
        establishment_id: {
            type: DataTypes.INTEGER(10)
        },
        override_price: {
            type: DataTypes.INTEGER(10)
        },
        model: {
            type: DataTypes.INTEGER(10)
        },
        interval: {
            type: DataTypes.INTEGER(10)
        }
    }, {
        sequelize,
        modelName: 'EstablishmentService',
    });
    return EstablishmentService;
};
