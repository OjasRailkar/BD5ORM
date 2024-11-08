let { DataTypes, sequelize } = require("../lib/index.js")

let book = sequelize.define("book", {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    publicationYear: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

module.exports = { book };