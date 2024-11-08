let { DataTypes, sequelize } = require('../lib/index.js');

let employee = sequelize.define('employee', {
  name: DataTypes.TEXT,
  department: DataTypes.TEXT,
  salary: DataTypes.INTEGER,
  designation: DataTypes.TEXT,
});

module.exports = { employee };