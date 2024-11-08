let { DataTypes, sequelize } = require("../lib/index.js")
let {user} = require("./user.model.js")
let {track} = require("./track.model.js")

let like = sequelize.define("like", {
    userID : {
        type : DataTypes.INTEGER,
        references:{
            model: user,
            key: "id"
        }
    },
    trackID : {
        type : DataTypes.INTEGER,
        references:{
            model: track,
            key: "id"
        }
    }
})

user.belongsToMany(track, { through : like })
track.belongsToMany(user, { through : like })

module.exports = { like }