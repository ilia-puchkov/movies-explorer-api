const { NOT_FOUND_ERROR_CODE } = require('../utils/errorConstants');

class NotFoundError extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.statusCode = NOT_FOUND_ERROR_CODE; // 404
  }
}

module.exports = NotFoundError;
