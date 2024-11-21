const express = require('express');
const sqlite3 = require('sqlite3').verbose();
let { open } = require('sqlite');
let { sequelize } = require('./lib/index.js');
let { chef } = require('./models/chef.model.js');
let { restaurant } = require('./models/restaurant.model.js');
let { dish } = require('./models/dish.model.js');

const app = express();
const port = 3000;
app.use(express.json());

let db;

(async () => {
  db = await open({
    filename: 'BD5MOCK/database.sqlite',
    driver: sqlite3.Database,
  });
})();

//Exercise 1: Fetch All Chefs

async function fetchAllChefs() {
  let query = 'SELECT * FROM chefs';
  let response = await db.all(query, []);

  return { chefs: response };
}

app.get('/v1/chefs', async (req, res) => {
  try {
    let results = await fetchAllChefs();

    if (results.chefs.length === 0) {
      return res.status(404).json({ message: 'No Chefs Found!' });
    }

    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 2: Fetch All Dishes by Chef

async function fetchDishesByChef(id) {
  let query = 'SELECT * FROM dishes WHERE chef_id = ?';

  let response = await db.all(query, [id]);

  return { dishes: response };
}

app.get('/v1/dishes/chef/:id', async (req, res) => {
  try {
    let id = parseInt(req.params.id);

    let results = await fetchDishesByChef(id);

    if (results.dishes.length === 0) {
      return res.status(404).json({ message: 'No dishes Found!' });
    }

    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//Exercise 3: Fetch Restaurant Details by Name

async function fetchRestaurantByName(name) {
  let query = 'SELECT * FROM restaurants WHERE name = ?';

  let response = await db.get(query, [name]);

  return { restaurant: response };
}

app.get('/v1/restaurants/search', async (req, res) => {
  try {
    let name = req.query.name;

    let results = await fetchRestaurantByName(name);

    if (results.restaurant === undefined) {
      return res.status(404).json({ message: 'No Restaurant Found!' });
    }

    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//Exercise 4: Fetch Dishes by Restaurant

async function fetchDishesByRestaurant(id) {
  let query = 'SELECT * FROM dishes WHERE restaurant_id = ?';

  let response = await db.all(query, [id]);

  return { dishes: response };
}

app.get('/v1/dishes/restaurant/:id', async (req, res) => {
  try {
    let id = parseInt(req.params.id);

    let results = await fetchDishesByRestaurant(id);

    if (results.dishes.length === 0) {
      return res.status(404).json({ message: 'No dishes Found!' });
    }

    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//Exercise 5: Fetch Chefs by Specialty

async function fetchChefsBySpecialty(specialty) {
  let query = 'SELECT * FROM chefs WHERE specialty = ?';

  let response = await db.all(query, [specialty]);

  return { chefs: response };
}

app.get('/v1/chefs/search', async (req, res) => {
  try {
    let specialty = req.query.specialty;

    let results = await fetchChefsBySpecialty(specialty);

    if (results.chefs.length === 0) {
      return res.status(404).json({ message: 'No Chefs Found!' });
    }

    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//*************************************  ORM   ******************************* */

//seed data
app.get('/v2/seed_db', async (req, res) => {
  try {
    // Clear existing data
    await sequelize.sync({ force: true });

    // Seed Chefs
    await chef.create({ name: 'Vikas Khanna', specialty: 'Indian' });
    await chef.create({ name: 'Sanjeev Kapoor', specialty: 'Indian' });
    await chef.create({
      name: 'Gaggan Anand',
      specialty: 'Progressive Indian',
    });

    // Seed Restaurants
    await restaurant.create({
      name: 'Junoon',
      location: 'New York',
      cuisine: 'Indian',
    });

    await restaurant.create({
      name: 'The Yellow Chilli',
      location: 'Mumbai',
      cuisine: 'Indian',
    });
    
    await restaurant.create({
      name: 'Gaggan',
      location: 'Bangkok',
      cuisine: 'Progressive Indian',
    });

    // Seed Dishes
    await dish.create({ name: 'Dal Makhani', price: 20.0 });
    await dish.create({ name: 'Paneer Butter Masala', price: 25.0 });
    await dish.create({ name: 'Molecular Chaat', price: 40.0 });

    res.status(200).json({ message: 'Database seeded successfully' });
  } catch (error) {
    console.error('Error seeding database:', error);
    res.status(500).json({ message: 'Error seeding database' });
  }
});

// Exercise 6: Fetch All Restaurants (Sequelize)

async function fetchAllRestaurants() {
  let restaurants = await restaurant.findAll();
  return { restaurants };
}

app.get('/v2/restaurants', async (req, res) => {
  try {
    let response = await fetchAllRestaurants();

    if (response.restaurants.length === 0) {
      return res.status(404).json({ message: 'No restaurants found.' });
    }

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 7: Fetch Chef Details by ID (Sequelize)

async function fetchChefDetailsById(id) {
  let chefData = await chef.findOne({ where: { id } });

  return { chef: chefData };
}

app.get('/v2/chefs/:id', async (req, res) => {
  try {
    let id = parseInt(req.params.id);

    let result = await fetchChefDetailsById(id);

    if (result.chef === null) {
      return res.status(404).json({ message: 'No Chef found.' });
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 8: Fetch All Dishes by Name (Sequelize)

async function fetchAllDishesByName(name) {
  let dishesData = await dish.findAll({ where: { name } });

  return { dishes: dishesData };
}

app.get('/v2/dishes/filter', async (req, res) => {
  try {
    let name = req.query.name;

    let result = await fetchAllDishesByName(name);

    if (result.dishes.length === 0) {
      return res.status(404).json({ message: 'No Dish found.' });
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//Exercise 9: Fetch Restaurants by Location (Sequelize)

async function fetchRestaurantsByLocation(location) {
  let restaurantsData = await restaurant.findAll({ where: { location } });

  return { restaurants: restaurantsData };
}

app.get('/v2/restaurants/location/:location', async (req, res) => {
  try {
    let location = req.params.location;

    let result = await fetchRestaurantsByLocation(location);

    if (result.restaurants.length === 0) {
      return res.status(404).json({ message: 'No restaurants found.' });
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
