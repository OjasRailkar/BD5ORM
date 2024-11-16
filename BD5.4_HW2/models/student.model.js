let { DataTypes, sequelize } = require("../lib/index.js")

let student = sequelize.define("student", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
   age: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

module.exports = { student };