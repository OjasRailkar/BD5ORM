let sq = require('sequelize');

let sequelize = new sq.Sequelize({
  dialect: 'sqlite',
  storage: './BD5.2_HW3/companies_sqlite.database',
});

module.exports = { DataTypes: sq.DataTypes, sequelize };
