let { DataTypes, sequelize } = require('../lib/index');

let company = sequelize.define("company", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    industry: {
        type: DataTypes.STRING,
        allowNull: false
    },
    foundedYear: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    headquarters: {
        type: DataTypes.STRING,
        allowNull: false
    },
    revenue : {
        type : DataTypes.INTEGER,
        allowNull: false
    }
   
})

module.exports = { company }