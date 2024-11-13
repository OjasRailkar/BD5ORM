let sq = require("sequelize")

let sequelize = new sq.Sequelize({
    dialect: "sqlite",
    storage: "./sqlite.database"
})

module.exports = ({ DataTypes : sq.DataTypes ,sequelize})