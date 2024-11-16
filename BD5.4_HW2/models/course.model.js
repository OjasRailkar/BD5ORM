let { DataTypes, sequelize } = require("../lib/index.js")

let course = sequelize.define("course", {
    title : {
        type: DataTypes.STRING,
        allowNull: false
    },
     description : {
        type: DataTypes.STRING,
        allowNull: false
    }
  
})

module.exports = { course };