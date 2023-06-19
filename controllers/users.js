// Basic elements
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Model element
const User = require('../models/user');

// ENV elements
const { NODE_ENV, JWT_SECRET } = process.env;
const { JWT_SECRET_DEV } = require('../utils/constants');

// Error elements
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');
const {
  INVALID_USER_DATA_TEXT,
  USER_NOT_FOUND_TEXT,
  USER_CONFICT_TEXT,
} = require('../utils/errorConstants');

// Controllers
// GET (current user)
const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(USER_NOT_FOUND_TEXT);
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(INVALID_USER_DATA_TEXT));
      } else {
        next(err);
      }
    });
};

// POST (create user / signup)
const createUser = (req, res, next) => {
  const { email, name, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      email,
      name,
      password: hash,
    }))
    .then(() => {
      res.status(201).send({
        email,
        name,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(INVALID_USER_DATA_TEXT));
      } else if (err.code === 11000) {
        next(new ConflictError(USER_CONFICT_TEXT));
      } else {
        next(err);
      }
    });
};

// POST (login user / signin)
const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEV,
        {
          expiresIn: '7d',
        },
      );

      res.send({ token });
    })
    .catch(next);
};

// PATCH (update user info)
const updateUserProfile = (req, res, next) => {
  const { email, name } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError(USER_NOT_FOUND_TEXT);
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(USER_CONFICT_TEXT));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError(INVALID_USER_DATA_TEXT));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getCurrentUser,
  createUser,
  login,
  updateUserProfile,
};
