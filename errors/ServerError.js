const { SERVER_ERROR_CODE } = require('../utils/errorConstants');

class ServerError extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.statusCode = SERVER_ERROR_CODE; // 500
  }
}

module.exports = ServerError;
