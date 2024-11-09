let { DataTypes, sequelize } = require('../lib/index.js');

let dish = sequelize.define('dish', {
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

module.exports = { dish };
