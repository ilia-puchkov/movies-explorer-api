// Basic elements
const Movie = require('../models/movie');

// Error elements
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');

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
    nameRu,
    nameEn,
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
    nameRu,
    nameEn,
    // owner: req.user._id,
  })
    .then((movie) => {
      res.send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

// DELETE
const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;

  Movie.findbyIdAndUpdate(
    movieId,
    { $pull: { owner: req.user._id } },
    { new: true },
  )
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Данные не найдены');
      }
      return res.send(movie);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные'));
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
