// Base modules
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

// Errors
const AuthorizationError = require('../errors/AuthorizationError');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Неправильный формыт почты',
    },
    password: {
      type: String,
      select: true,
      required: true,
    },
    name: {
      type: String,
      minLength: 2,
      maxLenght: 30,
      required: false,
      default: 'Жан-Люк Годар',
    },
  },
});

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
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
