const AUTH_ERROR_CODE = require('../utils/errorConstants');

class AuthorisationError extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.statusCode = AUTH_ERROR_CODE; // 401
  }
}

module.exports = AuthorisationError;
