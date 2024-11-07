const express = require('express');
let { sequelize } = require('./lib/index.js');
let { post } = require('./models/post.model.js');

const app = express();
const port = 3000;

// Dummy data
const dummyPosts = [
  {
    name: 'John Doe',
    author: 'John',
    title: 'Introduction to Sequelize',
    content: 'Sequelize is a powerful ORM for Node.js.',
  },
  {
    name: 'Jane Smith',
    author: 'Jane',
    title: 'Understanding Express Middleware',
    content: 'Middleware functions are crucial in Express.',
  },
  {
    name: 'Emily Davis',
    author: 'Emily',
    title: 'REST APIs with Node.js',
    content: 'Learn how to build REST APIs using Node.js.',
  },
  {
    name: 'Michael Brown',
    author: 'Michael',
    title: 'JavaScript Async/Await',
    content: 'Async/Await simplifies asynchronous code in JavaScript.',
  },
  {
    name: 'Chris Wilson',
    author: 'Chris',
    title: 'Deploying Node.js Apps',
    content: 'Steps to deploy your Node.js app successfully.',
  },
  {
    name: 'Laura Johnson',
    author: 'Laura',
    title: 'SQL vs NoSQL Databases',
    content: 'Understand the differences between SQL and NoSQL.',
  },
  {
    name: 'Robert Taylor',
    author: 'Robert',
    title: 'Version Control with Git',
    content: 'Git is a powerful tool for version control.',
  },
  {
    name: 'Sarah Lee',
    author: 'Sarah',
    title: 'Frontend Frameworks Overview',
    content: 'React, Angular, and Vue are popular frontend frameworks.',
  },
  {
    name: 'Tom Harris',
    author: 'Tom',
    title: 'Mastering Node Streams',
    content: 'Streams are a core part of Node.js.',
  },
  {
    name: 'Anna Martinez',
    author: 'Anna',
    title: 'Error Handling in Express',
    content: 'Learn how to handle errors effectively in Express.',
  },
];

app.get('/seed_db', async (req, res) => {
  try {
    await sequelize.sync({ force: true });

    await post.bulkCreate(dummyPosts);

    return res.status(200).json({ message: 'Database seeding succesful' });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error Seeding Data', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
