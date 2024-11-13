let { DataTypes, sequelize } = require('../lib/index');

let employee = sequelize.define("employee", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    salary: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    department: {
        type: DataTypes.STRING,
        allowNull: false
    },
    designation: {
        type: DataTypes.STRING,
        allowNull: false
    },
})

module.exports = { employee }