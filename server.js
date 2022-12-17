/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
// require("dotenv").config()-moved to connection.js
require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const methodOverride = require("method-override")
const Movie = require('./models/movie')
// const mongoose = require("mongoose")-moved to connection.js
const path = require("path")
const movieController = require('./controllers/movie')
const UserRouter = require("./controllers/user")
const session = require("express-session");
const MongoStore = require("connect-mongo");

/////////////////////////////////////////////
// Database Connection
/////////////////////////////////////////////
// ======== Setup inputs for our connect function ** moved to connection.js**
// const DATABASE_URL = process.env.DATABASE_URL;
// const CONFIG = { 
//   useNewUrlParser: true, 
//   useUnifiedTopology: true,
// };

// ============== Establish Connection ** moved to connection.js **
// mongoose.connect(DATABASE_URL, CONFIG)

// // Events for when connection opens/disconnects/errors
// mongoose.connection
//   .on("open", () => console.log("Connected to Mongoose"))
//   .on("close", () => console.log("Disconnected from Mongoose"))
//   .on("error", (error) => console.log(error));


////////////////////////////////////////////////
// Our Models ===moved to models/movie.js
////////////////////////////////////////////////
// ****pull schema and model from mongoose using object destructuring
// const { Schema, model } = mongoose;

// // make movie schema
// const movieSchema = new Schema({
//   title: {type: String, required: true},
//   releaseDate: String,
//   length: Number,
//   genre: String,
//   poster: {type: String, required: true},
//   director: {type: String, required: true},
//   rating: String,
//   watchAgain: Boolean,
//   cast: [{type: String}]
// },{
//     timestamps: true
// });

// // make movie model
// const Movie = model("Movie", movieSchema);

/////////////////////////////////////////////////
// Create our Express Application Object Bind Liquid Templating Engine
/////////////////////////////////////////////////
const app = express()
app.engine('jsx', require('express-react-views').createEngine());
app.set('view engine', 'jsx');


/////////////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////////////
app.use(morgan("tiny")); //logging
app.use(methodOverride("_method")); // override for put and delete requests from forms
app.use(express.urlencoded({ extended: true })); // parse urlencoded request bodies
app.use(express.static("public")); // serve files from public statically
app.use(
    
session({
    secret:process.env.SECRET,
    store:MongoStore.create({mongoUrl:process.env.DATABASE_URL}),
    saveUninitialized: true,
        resave: false,
})
)

//===== connect to routes ====
app.use("/movies", movieController)
app.use("/user", UserRouter); // send all "/user" routes to user router
app.get('/', (req,res)=>{
    res.render('Index.jsx')
})
////////////////////////////////////////////
// // Routes
// /////////////SEED ROUTE MOVED TO SEED.JS , REST OF ROUTES OVED TO MOVIE.JS///////////////////////////////
// app.get("/", (req, res) => {
//   res.send("your server is running... better catch it.");
// });
// app.get("/movies/seed",(req,res)=>{
//     const startMovies = [{
//         title:'Matrix',
//         releaseDate:'1999',
//         length:136,
//         genre:"sci-fi",
//         poster:"https://www.themoviedb.org/t/p/original/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
//         director:"Lana, Lily Wasoki",
//         rating:'R',
//         watchAgain:true,
//         cast:["Keanu Reeves",'Laurence','Fishburne']
//     },
// {
//     title:'50 First Dates',
//     releaseDate:'2004',
//     length:99,
//     genre:"comedy",
//     poster:"https://www.themoviedb.org/t/p/original/5NxTW4SS6aUKZYnbQzh7UYNivd.jpg",
//     director: "Peter Segal",
//     rating:'PG-13',
//     watchAgain:true,
//     cast:["Adam Sandler",'Drew Barrymore','Rob Schneider'] 
// },
// {  title:'The Dark Knight',
// releaseDate:'2008',
// length:152,
// genre:"Action",
// poster:"https://www.themoviedb.org/t/p/original/eP5NL7ZlGoW9tE9qnCdHpOLH1Ke.jpg",
// director:"Christopher Nolan",
// rating:'PG-13',
// watchAgain:true,
// cast:["Christian Bale", "Heath Ledger", "Aaron Eckhart"]
// }
//     ]


//  // Delete all movies
// Movie.deleteMany({}).then((data) => {
//     // Seed Starter movies
//    Movie.create(startMovies).then((data) => {
//       // send created movies as response to confirm creation
//       res.json(data);
//     });
//   });
// })
// //routes
// // Index route USING .THEN METHOD
// // app.get("/fruits", (req, res) => {
// //     // find all the movies
// //     Movie.find({})
// //       // render a template after they are found
// //       .then((movies) => {
// //         res.render("movies/Index", { movies });
// //       })
// //       // send error as json if they aren't
// //       .catch((error) => {
// //         res.json({ error });
// //       });
// //   }); 

// //WILL BE USING AWAIT FUNCTION
// app.get("/movies",async(req,res)=>{
//     try {
//         const movies = await Movie.find({});
//         res.render("movies/Index", { movies });
//       } catch (err) {
//         res.json({ err });
//       }
//     });
// //////////////////////////////////////////////
// //New
// app.get("/movies/new", (req, res) => {
//     res.render("movies/New")
//   })

//   //DELETE
//   app.delete("/movies/:id", (req, res) => {
//     // get the id from params
//     const id = req.params.id;
//     // delete the fruit
//     Movie.findByIdAndRemove(id)
//       .then((movie) => {
//         // redirect to main page after deleting
//         res.redirect("/movies");
//       })
//       // send error as json
//       .catch((error) => {
//         console.log(error);
//         res.json({ error });
//       });
//   });


//   //UPDATE
//   app.put("/movies/:id", async (req, res) => {
//     try {
//       const id = req.params.id;
//       req.body.watchAgain = req.body.watchAgain === "on" ? true : false;
//       req.body.cast = req.body.cast.split(",")
//       await Movie.findByIdAndUpdate(id, req.body)
//       res.redirect(`/movies/${id}`)
//     } catch (error) {
//       console.log(error);
//       res.json({ error });
//     }
//   })

//   // CREATE
//   app.post("/movies", async (req, res) => {
//     try {
//       req.body.watchAgain = req.body.watchAgain === "on" ? true : false;
//       req.body.cast = req.body.cast.split(",")
//       console.log(req.body)
//       const createdMovie = await Movie.create(req.body)
//       res.redirect("/movies")
//     } catch (error) {
//       console.log(error);
//       res.json({ error });
//     }
//   })



//   //Edit 
//   app.get("/movies/:id/edit", (req, res) => {
//     // get the id from params
//     const id = req.params.id;
//     // get the fruit from the database
//     Movie.findById(id)
//       .then((movie) => {
//         // render Edit page and send fruit data
//         res.render("movies/Edit.jsx", { movie });
//       })
//       // send error as json
//       .catch((error) => {
//         console.log(error);
//         res.json({ error });
//       });
//   });

//   //Show Route
//   app.get("/movies/:id", async (req, res) => {
//     const id = req.params.id

//     try {
//       const movie = await Movie.findById(id)
//       res.render("movies/Show", { movie })
//     } catch (error){
//       console.log(error);
//       res.json({ error });
//     }
//   })

//////////////////////////////////////////////
// Server Listener
//////////////////////////////////////////////
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`));