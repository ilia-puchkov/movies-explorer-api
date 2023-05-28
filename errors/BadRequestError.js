const BAD_REQUEST_ERROR_CODE = require('../utils/errorConstants');

class BadRequestError extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.statusCode = BAD_REQUEST_ERROR_CODE; // 400
  }
}

module.exports = BadRequestError;
