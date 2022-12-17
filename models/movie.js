//---import dependencies =========
const mongoose = require('./connection')

const { Schema, model } = mongoose;

// make movie schema
const movieSchema = new Schema({
  title: {type: String, required: true},
  releaseDate: String,
  length: Number,
  genre: String,
  poster: {type: String, required: true},
  director: {type: String, required: true},
  rating: String,
  watchAgain: Boolean,
  cast: [{type: String}],
  username: String
},{
    timestamps: true
});

// make movie model
const Movie = model("Movie", movieSchema);
module.exports = Movie