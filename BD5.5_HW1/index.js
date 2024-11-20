const express = require('express');
let { user } = require('./models/user.model.js');
let { book } = require('./models/book.model.js');
let { like } = require('./models/like.model.js');
let { sequelize } = require('./lib/index.js');
const { Op } = require('@sequelize/core');

let app = express();
app.use(express.json())

let books = [
    {
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      genre: 'Fiction',
      year: 1960,
      summary: 'A novel about the serious issues of rape and racial inequality.',
    },
    {
      title: '1984',
      author: 'George Orwell',
      genre: 'Dystopian',
      year: 1949,
      summary: 'A novel presenting a dystopian future under a totalitarian regime.',
    },
    {
      title: 'Moby-Dick',
      author: 'Herman Melville',
      genre: 'Adventure',
      year: 1851,
      summary: 'The narrative of the sailor Ishmael and the obsessive quest of Ahab.',
    },
    {
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      genre: 'Romance',
      year: 1813,
      summary: 'A romantic novel that charts the emotional development of the protagonist Elizabeth Bennet.',
    },
    {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      genre: 'Fiction',
      year: 1925,
      summary: 'A novel about the American dream and the roaring twenties.',
    },
  ]



app.get('/seed_db', async (req, res) => {
    try {
        await sequelize.sync({ force: true });

        await book.bulkCreate(books);

        await user.create({
            username: 'booklover',
            email: 'booklover@gmail.com',
            password: 'password123',
          })
    
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
