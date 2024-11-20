const express = require('express');
let { user } = require('./models/user.model.js');
let { movie } = require('./models/movie.model.js');
let { like } = require('./models/like.model.js');
let { sequelize } = require('./lib/index.js');
const { Op } = require('@sequelize/core');

let app = express();
app.use(express.json())

let movies = [
    {
        title: 'Inception',
        director: 'Christopher Nolan',
        genre: 'Sci-Fi',
        year: 2010,
        summary: 'A skilled thief is given a chance at redemption if he can successfully perform an inception.',
    },
    {
        title: 'The Godfather',
        director: 'Francis Ford Coppola',
        genre: 'Crime',
        year: 1972,
        summary: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
    },
    {
        title: 'Pulp Fiction',
        director: 'Quentin Tarantino',
        genre: 'Crime',
        year: 1994,
        summary: 'The lives of two mob hitmen, a boxer, a gangster, and his wife intertwine in four tales of violence and redemption.',
    },
    {
        title: 'The Dark Knight',
        director: 'Christopher Nolan',
        genre: 'Action',
        year: 2008,
        summary: 'When the menace known as the Joker emerges, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    },
    {
        title: 'Forrest Gump',
        director: 'Robert Zemeckis',
        genre: 'Drama',
        year: 1994,
        summary: 'The presidencies of Kennedy and Johnson, the Vietnam War, and other events unfold from the perspective of an Alabama man with an IQ of 75.',
    },
]


app.get('/seed_db', async (req, res) => {
    try {
        await sequelize.sync({ force: true });

        await movie.bulkCreate(movies);

        await user.create({
            username: 'moviefan',
            email: 'moviefan@gmail.com',
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
