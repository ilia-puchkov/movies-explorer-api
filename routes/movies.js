// Base module
const movieRouter = require('express').Router();

// Controllers
const {
  getUserMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

// Middlewares
const { validateMovie, validateMovieId } = require('../middlewares/validation');

// Movie routes
movieRouter.get('/', getUserMovies);
movieRouter.post('/', validateMovie, createMovie);
movieRouter.delete('/:movieId', validateMovieId, deleteMovie);

module.exports = movieRouter;
