// Basic elements
const Movie = require('../models/movie');

// Error elements
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const {
  INVALID_MOVIE_DATA_TEXT,
  MOVIE_NOT_FOUND_TEXT,
  FORBIDDEN_MOVIE_TEXT,
} = require('../utils/errorConstants');

// GET (get movies)
const getUserMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

// POST (create movie)
const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => {
      res.send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(INVALID_MOVIE_DATA_TEXT));
      } else {
        next(err);
      }
    });
};

// DELETE
const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(MOVIE_NOT_FOUND_TEXT);
      }
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError(FORBIDDEN_MOVIE_TEXT);
      }
      movie
        .deleteOne()
        .then(() => {
          res.send(movie);
        })
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(INVALID_MOVIE_DATA_TEXT));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getUserMovies,
  createMovie,
  deleteMovie,
};
