// Base modules
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

// Errors
const AuthorizationError = require('../errors/AuthorizationError');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Неправильный формат почты',
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
    maxLenght: 30,
    required: false,
    default: 'Жан-Люк Годар',
  },
});

userSchema.statics.findUserByCredentials = function findOne(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(
          new AuthorizationError('Неправильные почта или пароль'),
        );
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(
            new AuthorizationError('Неправильные почта или пароль'),
          );
        }

        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
