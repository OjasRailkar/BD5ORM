let { DataTypes, sequelize } = require('../lib/index.js');

const chef = sequelize.define("chef", {
    name: {
        type: DataTypes.STRING
    },
    birthYear: {
        type: DataTypes.INTEGER
    }
})

module.exports = { chef }