const express = require('express');
let { author } = require('./models/author.model.js');
let { book } = require('./models/book.model.js');
let { sequelize } = require('./lib/index.js');

let app = express();
app.use(express.json())

let books = [
    {
        title: "Harry Potter and the Philosopher's Stone",
        genre: 'Fantasy',
        publicationYear: 1997,
    },
    {
        title: 'A Game of Thrones',
        genre: 'Fantasy',
        publicationYear: 1996
    },
    {
        title: 'The Hobbit',
        genre: 'Fantasy',
        publicationYear: 1937
    },
]

let authors = [
    { name: 'J.K Rowling', birthYear: 1965 },
    { name: 'George Orwell', birthYear: 1949 },
    { name: 'Harper Lee', birthYear: 1960 },
]

app.get('/seed_db', async (req, res) => {
    try {
        await sequelize.sync({ force: true });

        await book.bulkCreate(books);
        await author.bulkCreate(authors);

        res.status(200).json({ message: 'Database seeding succesful' });
    } catch (error) {
        return res
            .status(500)
            .json({ message: 'Error seeding the data', error: error.message });
    }
});

//1 create new AUTHOR

async function addNewAuthor(newAuthorData) {
    let newAuthor = await author.create(newAuthorData)
    return { newAuthor }
}

app.post('/authors/new', async (req, res) => {
    try {
        let newAuthor = req.body.newAuthor

        let result = await addNewAuthor(newAuthor)

        return res.status(200).json(result)

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})

// Update Author


async function updateAuthorById(id, newAuthorData) {
    let authorDetails = await author.findOne({ where: { id } })

    if (!authorDetails) {
        return {}
    }

    authorDetails.set(newAuthorData)
    let updatedAuthor = await authorDetails.save()

    return { message: "Author updated successfully", updatedAuthor }
}


app.post('/authors/update/:id', async (req, res) => {
    try {
        let newAuthorData = req.body
        let id = parseInt(req.params.id)

        let result = await updateAuthorById(id, newAuthorData)

        if (!result.message) {
            return res.status(404).json({ message: "No Author found." })
        }

        return res.status(200).json(result)

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})















// //1 
// async function fetchAllTracks() {
//     let tracks = await track.findAll()
//     return { tracks }
// }

// app.get('/tracks', async (req, res) => {
//     try {
//         let response = await fetchAllTracks()

//         if (response.tracks.length === 0) {
//             return res.status(404).json({ message: "No tracks found." })
//         }

//         res.status(200).json(response)
//     } catch (error) {
//         return res.status(500).json({ error: error.message });
//     }
// })

// //2
// async function addNewTrack(trackData) {
//     let newTrack = await track.create(trackData)
//     return { newTrack }
// }

// app.post('/tracks/new', async (req, res) => {
//     try {
//         let newTrack = req.body.newTrack

//         let result = await addNewTrack(newTrack)

//         return res.status(200).json(result)

//     } catch (error) {
//         return res.status(500).json({ error: error.message });
//     }
// })

// //Exercise 3: Update track information

// async function updateTrackById(updatedTrackData, id) {
//     let trackDetails = await track.findOne({ where: { id } })  // find the track to be upadated by id

//     if (!trackDetails) {
//         return {}
//     }

//     trackDetails.set(updatedTrackData)   //set updated data to founded record 

//     let updatedTrack = await trackDetails.save()  // save the record in database

//     return { message: "track Updated successfully", updatedTrack }
// }

// app.post('/tracks/update/:id', async (req, res) => {
//     try {
//         let newTrackData = req.body.newTrackData  //  get data from req.body 
//         let id = parseInt(req.params.id)

//         let result = await updateTrackById(newTrackData, id)

//         if (!result.message) {
//             return res.status(404).json({ message: 'track not found' })
//         }

//         return res.status(200).json(result)
//     } catch (error) {
//         return res.status(500).json({ error: error.message });  //server error
//     }
// })

// //4 delete track
// async function deleteTrackByID(id) {
//     let destroyedTrack = await track.destroy({ where: { id } })

//     if (!destroyedTrack) return {}

//     return { message: "Track deleted successfully" }
// }

// app.post('/tracks/delete', async (req, res) => {
//     try {
//         let id = parseInt(req.body.id)

//         let result = await deleteTrackByID(id)

//         if (!result.message) {
//             return res.status(404).json({ message: "Track not found" })
//         }

//         return res.status(200).json(result)
//     } catch (error) {
//         return res.status(500).json({ error: error.message });  //server error
//     }
// })

// // ************************************************************************************************
// //USER APIs


// //1 Add USer

// async function addNewUser(userData) {
//     let newUser = await user.create(userData)
//     return { newUser }
// }

// app.post('/users/new', async (req, res) => {
//     try {
//         let newUser = req.body.newUser

//         let result = await addNewUser(newUser)

//         return res.status(200).json(result)

//     } catch (error) {
//         return res.status(500).json({ error: error.message });
//     }
// })

// // Update User

// async function updateUserById(id, newUserData) {
//     let userDetails = await user.findOne({ where: { id } })

//     if (!userDetails) {
//         return {}
//     }

//     userDetails.set(newUserData)
//     let updatedUser = await userDetails.save()

//     return { message: "User updated successfully", updatedUser }
// }


// app.post('/users/update/:id', async (req, res) => {
//     try {
//         let newUserData = req.body
//         let id = parseInt(req.params.id)

//         let result = await updateUserById(id, newUserData)

//         if (!result.message) {
//             return res.status(404).json({ message: "No user found." })
//         }

//         return res.status(200).json(result)

//     } catch (error) {
//         return res.status(500).json({ error: error.message });
//     }
// })



const port = 3000;
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
