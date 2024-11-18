let { DataTypes, sequelize } = require("../lib/index.js")
let {user} = require("./user.model.js")
let {track} = require("./track.model.js")

let like = sequelize.define("like", {},{timestamps : false})

track.belongsToMany(user, { through : like })
user.belongsToMany(track, { through : like })

module.exports = { like }