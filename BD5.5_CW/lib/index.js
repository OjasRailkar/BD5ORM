let sq = require('sequelize');

let sequelize = new sq.Sequelize({
  dialect: 'sqlite',
  storage: './BD5.5_CW/sqlite.database',
});

module.exports = { DataTypes: sq.DataTypes, sequelize };
