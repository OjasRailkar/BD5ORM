let { DataTypes, sequelize } = require("../lib/index.js")

let book = sequelize.define("book", {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    summary: {
        type: DataTypes.STRING,
        allowNull: false,
    },
})

module.exports = { book };