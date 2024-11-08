const express = require('express');
let { track } = require('./models/track.model.js');
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

    res.status(200).json({ message: 'Database seeding succesful' });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error seeding the data', error: error.message });
  }
});

//1 

async function fetchAllTracks() {
  let tracks = await track.findAll()
  return { tracks }
}

app.get('/tracks', async (req, res) => {
  try {
    let response = await fetchAllTracks()

    if (response.tracks.length === 0) {
      return res.status(404).json({ message: "No tracks found." })
    }

    res.status(200).json(response)
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
})

//2

async function fetchTrackById(id) {
  let trackData = await track.findOne({ where: { id } })  // return first single data o.w. returns null. 

  return { track: trackData }
}

app.get('/tracks/details/:id', async (req, res) => {
  try {
    let id = parseInt(req.params.id)
    let result = await fetchTrackById(id)

    if (result.track === null) {
      return res.status(404).json({ message: "No track found." })
    }

    return res.status(200).json(result)
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
})

//3

async function fetchTrackByArtist(artist) {
  let tracksData = await track.findAll({ where: { artist } })

  return { tracks: tracksData }
}

app.get('/tracks/artist/:artist', async (req, res) => {
  try {
    let artist = req.params.artist
    let result = await fetchTrackByArtist(artist)

    if (result.tracks.length === 0) {
      return res.status(404).json({ message: "No track found." })
    }

    return res.status(200).json(result)
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
})

//Exercise 4: Sort all the tracks by their release year

async function sortTracksByReleaseYear(order) {
  let sortedTracks = await track.findAll({ order: [["release_year", order]] })

  return { tracks: sortedTracks }
}

app.get('/tracks/sort/release_year', async (req, res) => {
  try {
    let order = req.query.order

    let result = await sortTracksByReleaseYear(order)

    if (result.tracks.length === 0) {
      return res.status(404).json({ message: "No tracks found." })
    }

    return res.status(200).json(result)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
})


const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
