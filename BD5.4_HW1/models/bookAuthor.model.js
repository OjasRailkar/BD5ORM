let { DataTypes, sequelize } = require("../lib/index.js")
let {author} = require("./author.model.js")
let {book} = require("./book.model.js")

let bookAuthor = sequelize.define("like", {
    authorID : {
        type : DataTypes.INTEGER,
        references:{
            model: author,
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

author.belongsToMany(book, { through : bookAuthor })
book.belongsToMany(author, { through : bookAuthor })

module.exports = { bookAuthor }