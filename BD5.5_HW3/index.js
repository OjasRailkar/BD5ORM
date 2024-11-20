const express = require('express');
let { user } = require('./models/user.model.js');
let { recipe } = require('./models/recipe.model.js');
let { favorite } = require('./models/favorite.model.js');
let { sequelize } = require('./lib/index.js');
const { Op } = require('@sequelize/core');

let app = express();
app.use(express.json())

let recipes = [
    {
        title: 'Spaghetti Carbonara',
        chef: 'Chef Luigi',
        cuisine: 'Italian',
        preparationTime: 30,
        instructions: 'Cook spaghetti. In a bowl, mix eggs, cheese, and pepper. Combine with pasta and pancetta.',
    },
    {
        title: 'Chicken Tikka Masala',
        chef: 'Chef Anil',
        cuisine: 'Indian',
        preparationTime: 45,
        instructions: 'Marinate chicken in spices and yogurt. Grill and serve with a creamy tomato sauce.',
    },
    {
        title: 'Sushi Roll',
        chef: 'Chef Sato',
        cuisine: 'Japanese',
        preparationTime: 60,
        instructions: 'Cook sushi rice. Place rice on nori, add fillings, roll, and slice into pieces.',
    },
    {
        title: 'Beef Wellington',
        chef: 'Chef Gordon',
        cuisine: 'British',
        preparationTime: 120,
        instructions: 'Wrap beef fillet in puff pastry with mushroom duxelles and bake until golden.',
    },
    {
        title: 'Tacos Al Pastor',
        chef: 'Chef Maria',
        cuisine: 'Mexican',
        preparationTime: 50,
        instructions: 'Marinate pork in adobo, grill, and serve on tortillas with pineapple and cilantro.',
    },
]

app.get('/seed_db', async (req, res) => {
    try {
        await sequelize.sync({ force: true });

        await user.create({
            username: 'foodlover',
            email: 'foodlover@example.com',
            password: 'securepassword',
        })

        await recipe.bulkCreate(recipes);

        return res.status(200).json({ message: 'Database seeding succesful' });
    } catch (error) {
        return res
            .status(500)
            .json({ message: 'Error seeding the data', error: error.message });
    }
});


const port = 3000;
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
