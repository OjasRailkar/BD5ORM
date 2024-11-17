let { DataTypes, sequelize } = require("../lib/index.js")
let {user} = require("./user.model.js")
let {book} = require("./book.model.js")

let like = sequelize.define("like", {
    userID : {
        type : DataTypes.INTEGER,
        references:{
            model: user,
            key: "id"
        }
    },
    bookID : {
        type : DataTypes.INTEGER,
        references:{
            model: book,
            key: "id"
        }
    }
})

user.belongsToMany(book, { through : like })
book.belongsToMany(user, { through : like })

module.exports = { like }