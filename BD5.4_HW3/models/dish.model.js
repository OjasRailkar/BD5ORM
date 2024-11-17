let { DataTypes, sequelize } = require('../lib/index.js');

let dish = sequelize.define("dish", {
    name : {
        type : DataTypes.STRING
    },
    cuisine : {
        type : DataTypes.STRING
    },
    preparationTime : {
        type : DataTypes.INTEGER 
    }
})

module.exports = { dish }