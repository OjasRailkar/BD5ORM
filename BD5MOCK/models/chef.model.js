let { DataTypes, sequelize } = require('../lib/index.js');

let chef = sequelize.define('chef', {
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  specialty: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = { chef };
