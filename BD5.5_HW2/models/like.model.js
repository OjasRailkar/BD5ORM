let { DataTypes, sequelize } = require("../lib/index.js")
let {user} = require("./user.model.js")
let {movie} = require("./movie.model.js")

let like = sequelize.define("like", {},{timestamps : false})

movie.belongsToMany(user, { through : like })
user.belongsToMany(movie, { through : like })

module.exports = { like }