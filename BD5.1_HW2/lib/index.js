let sq = require('sequelize');

let sequelize = new sq.Sequelize({
  dialect: 'sqlite',
  storage: './BD5.1_HW2/sqlite.database',
});

module.exports = { DataTypes: sq.DataTypes, sequelize };
