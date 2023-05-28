// Base modules
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

// Errors
const AuthorizationError = require('../errors/AuthorizationError');
const { INVALID_USER_MAIL_TEXT, INVALID_USER_AUTH_ERROR_TEXT } = require('../utils/errorConstants');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: INVALID_USER_MAIL_TEXT,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    required: true,
  },
});

userSchema.statics.findUserByCredentials = function findOne(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(
          new AuthorizationError(INVALID_USER_AUTH_ERROR_TEXT),
        );
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(
            new AuthorizationError(INVALID_USER_AUTH_ERROR_TEXT),
          );
        }

        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
