const Path = require('path');

const configPath = Path.join(__dirname, "../config/config.json");
const config = require(configPath);

const Sequelize = require('sequelize');
const db = new Sequelize(config.CONNECTION_STRING);

db.options.logging = false;

var User = db.define('users', {
  id: { type: Sequelize.STRING, primaryKey: true },
  username: { type: Sequelize.STRING },
  email: { type: Sequelize.STRING },
  inscription_confirmed: { type: Sequelize.BOOLEAN },
  password: { type: Sequelize.STRING },
  role: { type: Sequelize.INTEGER },
  stripe_id: { type: Sequelize.STRING },
  last_connection: {type: Sequelize.DATE}
}, {
  underscored: true,
  paranoid: true,
  freezeTableName: true, // Model tableName will be the same as the model name
  tableName: 'users'
});

User.sync({force: false}).then(function () {
    // console.log("OK !\n");
});

module.exports = User;
