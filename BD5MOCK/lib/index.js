let sq = require('sequelize');

let sequelize = new sq.Sequelize({
  dialect: 'sqlite',
  storage: 'BD5MOCK/sequelize_database.sqlite',
});

module.exports = { DataTypes: sq.DataTypes, sequelize };
