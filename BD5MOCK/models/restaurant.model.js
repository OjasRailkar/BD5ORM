let { DataTypes, sequelize } = require('../lib/index.js');

let restaurant = sequelize.define('restaurant', {
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  location: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  cuisine: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = { restaurant };
