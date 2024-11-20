let { DataTypes, sequelize } = require("../lib/index.js")

let movie = sequelize.define("movie", {
    title : {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    director : {
        type: DataTypes.STRING,
        allowNull: false
    },
    genre : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    year : {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    summary : {
        type: DataTypes.STRING,
        allowNull: false
    }
    
})

module.exports = { movie };