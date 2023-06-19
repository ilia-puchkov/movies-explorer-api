const { FORBIDDEN_ERROR_CODE } = require('../utils/errorConstants');

class ForbiddenError extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.statusCode = FORBIDDEN_ERROR_CODE; // 403
  }
}

module.exports = ForbiddenError;
