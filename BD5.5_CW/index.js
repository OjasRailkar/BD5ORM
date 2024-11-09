const express = require('express');
let { track } = require('./models/track.model.js');
let { user } = require('./models/user.model.js');
let { like } = require('./models/like.model.js');
let { sequelize } = require('./lib/index.js');

let app = express();
app.use(express.json())

let movieData = [
    {
        name: 'Raabta',
        genre: 'Romantic',
        release_year: 2012,
        artist: 'Arijit Singh',
        album: 'Agent Vinod',
        duration: 4,
    },
    {
        name: 'Naina Da Kya Kasoor',
        genre: 'Pop',
        release_year: 2018,
        artist: 'Amit Trivedi',
        album: 'Andhadhun',
        duration: 3,
    },
    {
        name: 'Ghoomar',
        genre: 'Traditional',
        release_year: 2018,
        artist: 'Shreya Ghoshal',
        album: 'Padmaavat',
        duration: 3,
    },
    {
        name: 'Bekhayali',
        genre: 'Rock',
        release_year: 2019,
        artist: 'Sachet Tandon',
        album: 'Kabir Singh',
        duration: 6,
    },
    {
        name: 'Hawa Banke',
        genre: 'Romantic',
        release_year: 2019,
        artist: 'Darshan Raval',
        album: 'Hawa Banke (Single)',
        duration: 3,
    },
    {
        name: 'Ghungroo',
        genre: 'Dance',
        release_year: 2019,
        artist: 'Arijit Singh',
        album: 'War',
        duration: 5,
    },
    {
        name: 'Makhna',
        genre: 'Hip-Hop',
        release_year: 2019,
        artist: 'Tanishk Bagchi',
        album: 'Drive',
        duration: 3,
    },
    {
        name: 'Tera Ban Jaunga',
        genre: 'Romantic',
        release_year: 2019,
        artist: 'Tulsi Kumar',
        album: 'Kabir Singh',
        duration: 3,
    },
    {
        name: 'First Class',
        genre: 'Dance',
        release_year: 2019,
        artist: 'Arijit Singh',
        album: 'Kalank',
        duration: 4,
    },
    {
        name: 'Kalank Title Track',
        genre: 'Romantic',
        release_year: 2019,
        artist: 'Arijit Singh',
        album: 'Kalank',
        duration: 5,
    },
];

app.get('/seed_db', async (req, res) => {
    try {
      await sequelize.sync({ force: true });
  
      await track.bulkCreate(movieData);

      await user.create({
        username: 'testuser',
        email: 'testuser@gmail.com',
        password: 'testuser',
      });
  
      // await like.create({
      //   userID: 1,
      //   trackID: 2,
      // });

      res.status(200).json({ message: 'Database seeding succesful' });
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Error seeding the data', error: error.message });
    }
  });

async function fetchAllUsers() {
    let users = await user.findAll()
    return { users }
}

app.get('/users', async (req, res) => {
    try {
        let response = await fetchAllUsers()

        if (response.users.length === 0) {
            return res.status(404).json({ message: "No user found." })
        }

        res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})

//2

async function likeTrack(data) {
  let newLike = await like.create({
    userID: data.userID,
    trackID: data.trackID,
  });

  return { message: 'Track Liked', newLike };
}

app.get('/users/:id/like', async (req, res) => {
  try {
    let userId = parseInt(req.params.id);
    let trackID = parseInt(req.query.trackId);

    let response = await likeTrack({ userId, trackID });

    return res.status(200).json(response);
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

/* 
const express = require('express');
const { user } = require('./models/user.model');
const { track } = require('./models/track.model');
const { sequelize } = require('./lib');
const { like } = require('./models/like.model');

const app = express();
const port = 3000;

let movieData = [
  {
    name: 'Raabta',
    genre: 'Romantic',
    release_year: 2012,
    artist: 'Arijit Singh',
    album: 'Agent Vinod',
    duration: 4,
  },
  {
    name: 'Naina Da Kya Kasoor',
    genre: 'Pop',
    release_year: 2018,
    artist: 'Amit Trivedi',
    album: 'Andhadhun',
    duration: 3,
  },
  {
    name: 'Ghoomar',
    genre: 'Traditional',
    release_year: 2018,
    artist: 'Shreya Ghoshal',
    album: 'Padmaavat',
    duration: 3,
  },
  {
    name: 'Bekhayali',
    genre: 'Rock',
    release_year: 2019,
    artist: 'Sachet Tandon',
    album: 'Kabir Singh',
    duration: 6,
  },
  {
    name: 'Hawa Banke',
    genre: 'Romantic',
    release_year: 2019,
    artist: 'Darshan Raval',
    album: 'Hawa Banke (Single)',
    duration: 3,
  },
  {
    name: 'Ghungroo',
    genre: 'Dance',
    release_year: 2019,
    artist: 'Arijit Singh',
    album: 'War',
    duration: 5,
  },
  {
    name: 'Makhna',
    genre: 'Hip-Hop',
    release_year: 2019,
    artist: 'Tanishk Bagchi',
    album: 'Drive',
    duration: 3,
  },
  {
    name: 'Tera Ban Jaunga',
    genre: 'Romantic',
    release_year: 2019,
    artist: 'Tulsi Kumar',
    album: 'Kabir Singh',
    duration: 3,
  },
  {
    name: 'First Class',
    genre: 'Dance',
    release_year: 2019,
    artist: 'Arijit Singh',
    album: 'Kalank',
    duration: 4,
  },
  {
    name: 'Kalank Title Track',
    genre: 'Romantic',
    release_year: 2019,
    artist: 'Arijit Singh',
    album: 'Kalank',
    duration: 5,
  },
];

app.get('/seed_db', async (req, res) => {
  try {
    await sequelize.sync({ force: true });

    await track.bulkCreate(movieData);
    await user.create({
      username: 'testuser',
      email: 'testuser@gmail.com',
      password: 'testuser',
    });

    res.status(200).json({ message: 'Database seeding succesful' });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error seeding the data', error: error.message });
  }
});

//1

async function likeTrack(data) {
  let newLike = await like.create({
    userID: data.userID,
    trackID: data.trackID,
  });

  return { message: 'Track Liked', newLike };
}

app.get('/users/:id/like', async (req, res) => {
  try {
    let userId = req.params.id;
    let trackID = req.query.trackId;

    let response = await likeTrack({ userId, trackID });

    return res.status(200).json(response);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error seeding the data', error: error.message });
  }
});


*/