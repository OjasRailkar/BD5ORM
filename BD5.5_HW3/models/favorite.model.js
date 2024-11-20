let { DataTypes, sequelize } = require("../lib/index.js")
let { user } = require("./user.model.js")
let { recipe } = require("./recipe.model.js")

let favorite = sequelize.define("favorite", {}, { timestamps: false })

recipe.belongsToMany(user, { through: favorite })
user.belongsToMany(recipe, { through: favorite })

module.exports = { favorite }