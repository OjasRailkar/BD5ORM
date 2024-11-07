const express = require('express');
let { sequelize } = require('./lib/index.js');
let { book } = require('./models/book.model.js');

const app = express();
const port = 3000;
//data
const booksData = [
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    description:
      'A story about the mysterious Jay Gatsby and his unrequited love for Daisy Buchanan.',
    genre: 'Classic',
  },
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    description:
      'A poignant tale of racial injustice in the Deep South, seen through the eyes of a young girl.',
    genre: 'Historical Fiction',
  },
  {
    title: '1984',
    author: 'George Orwell',
    description:
      'A dystopian novel about a totalitarian regime and the fight for individuality.',
    genre: 'Dystopian',
  },
  {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    description:
      'A romantic tale of manners, marriage, and misunderstandings in Georgian England.',
    genre: 'Romance',
  },
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    description:
      'The adventure of Bilbo Baggins as he seeks treasure guarded by a dragon.',
    genre: 'Fantasy',
  },
  {
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    description:
      "A young man's journey through New York as he struggles with identity and belonging.",
    genre: 'Coming-of-Age',
  },
  {
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    description:
      "A philosophical story about a shepherd's quest to find his personal legend.",
    genre: 'Adventure',
  },
  {
    title: 'The Da Vinci Code',
    author: 'Dan Brown',
    description:
      'A thrilling mystery involving art, religion, and secret societies.',
    genre: 'Thriller',
  },
  {
    title: "Harry Potter and the Sorcerer's Stone",
    author: 'J.K. Rowling',
    description:
      "The beginning of Harry Potter's journey in the magical world of Hogwarts.",
    genre: 'Fantasy',
  },
  {
    title: 'The Road',
    author: 'Cormac McCarthy',
    description: 'A haunting tale of survival in a post-apocalyptic world.',
    genre: 'Post-Apocalyptic',
  },
];

app.get('/seed_db', async (req, res) => {
  try {
    await sequelize.sync({ force: true });

    await book.bulkCreate(booksData);

    return res.status(200).json({ message: 'Database seeding succesful' });
  } catch (error) {
    return res
      .status(500)
      .json({ message: ' Error seeding data', erroe: error.message });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
