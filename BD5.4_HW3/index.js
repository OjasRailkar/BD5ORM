const express = require('express');
let { chef } = require('./models/chef.model.js');
let { dish } = require('./models/dish.model.js');
// let { chefDish } = require('./models/chefDish.model.js');
let { sequelize } = require('./lib/index.js');

const app = express();
const port = 3000;
app.use(express.json());

//DATA
// dishes
let dishes = [
  {
    name: 'Margherita Pizza',
    cuisine: 'Italian',
    preparationTime: 20,
  },
  {
    name: 'Sushi',
    cuisine: 'Japanese',
    preparationTime: 50,
  },
  {
    name: 'Poutine',
    cuisine: 'Canadian',
    preparationTime: 30,
  },
]

// chefs
let chefs = [
  { name: 'Gordon Ramsay', birthYear: 1966 },
  { name: 'Masaharu Morimoto', birthYear: 1955 },
  { name: 'Ricardo Larrivée', birthYear: 1967 },
]


app.get('/seed_db', async (req, res) => {
  try {
    await sequelize.sync({ force: true })

    await chef.bulkCreate(chefs)
    await dish.bulkCreate(dishes)

    return res.status(200).json({ message: "Database seeding successful" })

  } catch (error) {
    res.status(500).json({ message: "Error Seeding Database", error: error.message })
  }
})

// Exercise 1: Create New Chef
async function addNewChef(newChef) {
  let chefDetails = await chef.create(newChef)

  if (!chefDetails) {
    return {}
  }

  return { message: "chef added successfully", chefDetails }
}

app.post("/chefs/new", async (req, res) => {
  try {
    let newChef = req.body.newChef

    let result = await addNewChef(newChef)

    if (!result.message) {
      return res.status(404).json({ message: "Chef not found." })
    }

    return res.status(200).json(result)

  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
})

//Exercise 2: Update Chef by ID.
async function updateChefByID(id, newChefData) {
  let chefDetails = await chef.findOne({ where: { id } })

  if (!chefDetails) return {}

  chefDetails.set(newChefData)

  let updatedChefDetails = await chefDetails.save()

  return { message: "Chef details upadated succefully.", updatedChefDetails }
}

app.post('/chefs/upadte/:id', async (req, res) => {
  try {
    let id = parseInt(req.params.id)
    let newChefData = req.body

    let result = await updateChefByID(id, newChefData)

    if (!result.message) {
      return res.status(404).json({ message: "chef not found." })
    }

    return res.status(200).json(result)

  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
