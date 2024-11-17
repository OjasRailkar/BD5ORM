let { DataTypes, sequelize } = require('../lib/index.js');
let { chef } = require('./chef.model.js')
let { dish } = require('./dish.model.js')

let chefDish = sequelize.define('chefDish', {
    chefId: {
        type: DataTypes.INTEGER,
        references: {
            model: chef,
            key: "id"
        }
    },
    dishId: {
        type: DataTypes.INTEGER,
        references: {
            model: dish,
            key: "id"
        }
    }
})

chef.belongsToMany(dish, { through: chefDish })
dish.belongsToMany(chef, { through: chefDish })


module.exports = { chefDish }