//---import dependencies =========
const mongoose = require('./connection')
const Movie = require('./movie')
// save the connection in a variable
const db = mongoose.connection;

// Make sure code is not run till connected
db.on("open", () => {
    //////////////////////
    // router.get("/seed",(req,res)=>{
    const startMovies = [{
        title: 'Matrix',
        releaseDate: '1999',
        length: 136,
        genre: "sci-fi",
        poster: "https://www.themoviedb.org/t/p/original/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
        director: "Lana, Lily Wasoki",
        rating: 'R',
        watchAgain: true,
        cast: ["Keanu Reeves", 'Laurence', 'Fishburne']
    },
    {
        title: '50 First Dates',
        releaseDate: '2004',
        length: 99,
        genre: "comedy",
        poster: "https://www.themoviedb.org/t/p/original/5NxTW4SS6aUKZYnbQzh7UYNivd.jpg",
        director: "Peter Segal",
        rating: 'PG-13',
        watchAgain: true,
        cast: ["Adam Sandler", 'Drew Barrymore', 'Rob Schneider']
    },
    {
        title: 'The Dark Knight',
        releaseDate: '2008',
        length: 152,
        genre: "Action",
        poster: "https://www.themoviedb.org/t/p/original/eP5NL7ZlGoW9tE9qnCdHpOLH1Ke.jpg",
        director: "Christopher Nolan",
        rating: 'PG-13',
        watchAgain: true,
        cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"]
    }
    ]


    // Delete all movies

    Movie.deleteMany({})
        .then((deletedMovies) => {
            // add the starter movies
            Movie.create(startMovies)
                .then((NewMovies) => {
                    // log the New movies to confirm their creation
                    console.log(NewMovies);
                    db.close();
                })
                .catch((error) => {
                    console.log(error);
                    db.close();
                });
        })
        .catch((error) => {
            console.log(error);
            db.close();
        });
})