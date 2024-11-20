let { sequelize } = require("../lib/index.js")
let { user } = require("./user.model.js")
let { book } = require("./book.model.js")

let like = sequelize.define("like", {})

book.belongsToMany(user, { through: like })
user.belongsToMany(book, { through: like })

module.exports = { like }