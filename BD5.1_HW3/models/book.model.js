let { DataTypes, sequelize } = require('../lib/index.js');

let book = sequelize.define('book', {
  title: DataTypes.TEXT,
  author: DataTypes.TEXT,
  description: DataTypes.TEXT,
  genre: DataTypes.TEXT,
});

module.exports = { book };
