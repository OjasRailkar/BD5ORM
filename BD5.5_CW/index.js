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

    await user.create({
      username: 'testuser',
      email: 'testuser@gmail.com',
      password: 'testuser',
    })

    await track.bulkCreate(movieData);

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
    trackID : data.trackID
  })

  return {message : "Track liked", newLike}
}

app.get('/users/:id/like', async (req, res) => {
  try {
    let userID = req.params.id
    let trackID = req.query.trackID

    let response = await likeTrack({userID, trackID})
    return res.status(200).json(response)
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message });
  }
})













//********************************************************************************************************* */

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

// //2
// async function addNewTrack(trackData) {
//   let newTrack = await track.create(trackData)
//   return { newTrack }
// }

// app.post('/tracks/new', async (req, res) => {
//   try {
//     let newTrack = req.body.newTrack

//     let result = await addNewTrack(newTrack)

//     return res.status(200).json(result)

//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// })

// //Exercise 3: Update track information

// async function updateTrackById(updatedTrackData, id) {
//   let trackDetails = await track.findOne({ where: { id } })  // find the track to be upadated by id

//   if (!trackDetails) {
//     return {}
//   }

//   trackDetails.set(updatedTrackData)   //set updated data to founded record 

//   let updatedTrack = await trackDetails.save()  // save the record in database

//   return { message: "track Updated successfully", updatedTrack }
// }

// app.post('/tracks/update/:id', async (req, res) => {
//   try {
//     let newTrackData = req.body.newTrackData  //  get data from req.body 
//     let id = parseInt(req.params.id)

//     let result = await updateTrackById(newTrackData, id)

//     if (!result.message) {
//       return res.status(404).json({ message: 'track not found' })
//     }

//     return res.status(200).json(result)
//   } catch (error) {
//     return res.status(500).json({ error: error.message });  //server error
//   }
// })

// //4 delete track
// async function deleteTrackByID(id) {
//   let destroyedTrack = await track.destroy({ where: { id } })

//   if (!destroyedTrack) return {}

//   return { message: "Track deleted successfully" }
// }

// app.post('/tracks/delete', async (req, res) => {
//   try {
//     let id = parseInt(req.body.id)

//     let result = await deleteTrackByID(id)

//     if (!result.message) {
//       return res.status(404).json({ message: "Track not found" })
//     }

//     return res.status(200).json(result)
//   } catch (error) {
//     return res.status(500).json({ error: error.message });  //server error
//   }
// })

// // ************************************************************************************************
// //USER APIs


// //1 Add USer

// async function addNewUser(userData) {
//   let newUser = await user.create(userData)
//   return { newUser }
// }

// app.post('/users/new', async (req, res) => {
//   try {
//     let newUser = req.body.newUser

//     let result = await addNewUser(newUser)

//     return res.status(200).json(result)

//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// })

// // Update User

// async function updateUserById(id , newUserData) {
//   let userDetails = await user.findOne({where : {id}})

//   if (!userDetails) {
//     return {}
//   }

//   userDetails.set(newUserData)
//   let updatedUser = await userDetails.save()
  
//   return { message : "User updated successfully", updatedUser }
// }


// app.post('/users/update/:id', async (req, res) => {
//   try {
//     let newUserData = req.body
//     let id = parseInt(req.params.id)

//     let result = await updateUserById(id, newUserData)

//     if(!result.message){
//       return res.status(404).json({message : "No user found."})
//     }

//     return res.status(200).json(result)

//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// })



const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
