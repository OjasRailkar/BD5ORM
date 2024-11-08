const express = require('express');
let { sequelize } = require('./lib/index.js');
let { post } = require('./models/post.model.js');

const app = express();
app.use(express.json())
const port = 3000;

// Dummy data
const dummyPosts = [
  {
    name: 'Post1',
    author: 'Author1',
    content: 'This is the content of post 1',
    title: 'Title1'
  },
  {
    'name': 'Post2',
    'author': 'Author2',
    'content': 'This is the content of post 2',
    'title': 'Title2'
  },
  {
    name: 'Post3',
    author: 'Author1',
    content: 'This is the content of post 3',
    title: 'Title3'
  }
]

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


//1
async function fetchAllPosts() {
  let allPosts = await post.findAll()

  return { posts: allPosts }
}

app.get('/posts', async (req, res) => {
  try {
    let result = await fetchAllPosts()

    if (result.posts.length === 0) {
      return res.status(404).json({ message: 'No posts found.' })
    }

    return res.status(200).json(result)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
})

//2 POST BY ID

async function fetchPostById(id) {
  let postData = await post.findOne({ where: { id } })

  return { post: postData }
}

app.get('/posts/details/:id', async (req, res) => {
  try {
    let id = parseInt(req.params.id)

    let result = await fetchPostById(id)

    if (result.post === null) {
      return res.status(404).json({ message: 'No post found.' })
    }

    return res.status(200).json(result)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
})

//Exercise 3: Fetch all posts by an author

async function fetchPostsByAuthor(author) {
  let postData = await post.findAll({ where: { author } })

  return { posts: postData }
}

app.get('/posts/author/:author', async (req, res) => {
  try {
    let author = req.params.author

    let result = await fetchPostsByAuthor(author)

    if (result.posts.length === 0) {
      return res.status(404).json({ message: 'No posts found for the author ' + author })
    }

    return res.status(200).json(result)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
})

//Exercise 4: Sort all the posts by their name

async function sortPostsByName(order) {
  let sortedPosts = await post.findAll({ order: [["name", order]] })

  return { posts: sortedPosts }
}

app.get('/posts/sort/name', async (req, res) => {
  try {
    let order = req.query.order

    let result = await sortPostsByName(order)

    if (result.posts.length === 0) {
      return res.status(404).json({ message: 'No posts found' })
    }

    return res.status(200).json(result)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
