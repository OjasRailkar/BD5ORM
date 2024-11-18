let { DataTypes, sequelize } = require("../lib/index.js")

let track = sequelize.define("track", {
    name : {
        type: DataTypes.STRING,
        allowNull: false
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    release_year: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    artist: {
        type: DataTypes.STRING,
        allowNull: false
    },
    album: {
        type: DataTypes.STRING,
        allowNull: false
    },
    duration : {
        type : DataTypes.INTEGER
    }
})

module.exports = { track };