const express = require('express');
let { sequelize } = require('./lib/index.js');
let { post } = require('./models/post.model.js');


const app = express();
app.use(express.json())
const port = 3000;

// Dummy data
const dummyPosts = [
  {
    title: 'Getting Started with Node.js',
    content:
      'This post will guide you through the basics of Node.js and how to set up a Node.js project.',
    author: 'Alice Smith',
  },
  {
    title: 'Advanced Express.js Techniques',
    content:
      'Learn advanced techniques and best practices for building applications with Express.js.',
    author: 'Bob Johnson',
  },
  {
    title: 'ORM with Sequelize',
    content:
      'An introduction to using Sequelize as an ORM for Node.js applications.',
    author: 'Charlie Brown',
  },
  {
    title: 'Boost Your JavaScript Skills',
    content:
      'A collection of useful tips and tricks to improve your JavaScript programming.',
    author: 'Dana White',
  },
  {
    title: 'Designing RESTful Services',
    content: 'Guidelines and best practices for designing RESTful APIs.',
    author: 'Evan Davis',
  },
  {
    title: 'Mastering Asynchronous JavaScript',
    content:
      'Understand the concepts and patterns for writing asynchronous code in JavaScript.',
    author: 'Fiona Green',
  },
  {
    title: 'Modern Front-end Technologies',
    content:
      'Explore the latest tools and frameworks for front-end development.',
    author: 'George King',
  },
  {
    title: 'Advanced CSS Layouts',
    content:
      'Learn how to create complex layouts using CSS Grid and Flexbox.',
    author: 'Hannah Lewis',
  },
  {
    title: 'Getting Started with React',
    content: "A beginner's guide to building user interfaces with React.",
    author: 'Ian Clark',
  },
  {
    title: 'Writing Testable JavaScript Code',
    content:
      'An introduction to unit testing and test-driven development in JavaScript.',
    author: 'Jane Miller',
  },
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

//Exercise 2: Add a new post in the database

async function addNewPost(newPost){
  let newAddedPost = await post.create(newPost)
  return {newAddedPost}
}

app.post('/posts/new', async (req, res) => {
  try {
    let newPost = req.body.newPost

    let result = await addNewPost(newPost)

    if(!result){
      return res.status(404).json({message : "Post not found"})
    }

  return res.status(200).json(result)  
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
})

//3 update post
async function updatePostById(newPostData, id) {
  let postDetails = await post.findOne({where : {id}})

  if (!postDetails) {
    return {}
  }

  postDetails.set(newPostData)
  let updatedTrack = await postDetails.save()
  
  return {message: "Track updated successfully", updatedTrack}
}

app.post('/posts/update/:id', async (req, res) => {
  try {
    let id = parseInt(req.params.id)
    let newPostData = req.body.newPostData

    let result = await updatePostById(newPostData, id)

    if(!result.message){
      return res.status(404).json({message : "Posts not found"})
    }

  return res.status(200).json(result)  
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
})


// Exercise 4: Delete a post from the database

async function deletePostByID(id) {
  let destroyedPost = await post.destroy({where : {id}})
  
  if(!destroyedPost) return {}

  return {message : "Post deleted successfully"}
}

app.post('/posts/delete', async(req, res) =>{
  try {
    let id = parseInt(req.body.id)
    
    let result = await deletePostByID(id)

    if(!result.message){
      return res.status(404).json({message : "Post not found"})
    }

  return res.status(200).json(result)
  } catch (error) {
    return res.status(500).json({ error: error.message });  //server error
  }
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
