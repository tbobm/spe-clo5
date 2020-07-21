/*
{
     "GARAGE_PLACE", "BABY_BED", "ROMANTIC", "BREAKFAST"
}
*/
const sequelize = require('sequelize');

var Service = sequelize.define('service', {
    key: DataTypes.INTEGER(10),
    base_price: DataTypes.INTEGER(10),
    fa: DataTypes.ENUM({
        values: ['GARAGE_PLACE', 'BABY_BED', 'ROMANTIC', 'BREAKFAST']
    })
});

x = Service.schema('service');
