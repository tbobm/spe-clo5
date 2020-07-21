/*
*
{
   "establishmentId": Int,
   "overridePrice": Int,
    "model": ModelOption,
    "interval": Int
}
* */
const sequelize = require('sequelize');

var OptionEstablishment = sequelize.define('establishment_service', {
    establishmentId: DataTypes.INTEGER(10),
    overridePrice: DataTypes.INTEGER(10),
    model: DataTypes.INTEGER,
    interval: DataTypes.INTEGER
});

x = Service.schema('service');
