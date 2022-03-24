const express = require('express');

const movieRoutes = express.Router();

const {
  getSavedMovies,
  createMovie,
  deleteSavedMovie,
} = require('../controllers/movies');

movieRoutes.get('/', getSavedMovies);
movieRoutes.post('/', createMovie);
movieRoutes.delete('/:id', deleteSavedMovie);

module.exports = movieRoutes;
