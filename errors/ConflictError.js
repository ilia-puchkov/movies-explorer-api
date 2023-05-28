const CONFLICT_ERROR_CODE = require('../utils/errorConstants');

class ConflictError extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.statusCode = CONFLICT_ERROR_CODE; // 409
  }
}

module.exports = ConflictError;
