const { SERVER_ERROR_CODE, SERVER_ERROR_TEXT } = require('../utils/errorConstants');

// Custom error
const customError = (err, _, res, next) => {
  const { statusCode = SERVER_ERROR_CODE, message } = err;

  res.status(statusCode).send({
    message: statusCode === SERVER_ERROR_CODE ? SERVER_ERROR_TEXT : message,
  });

  next();
};

module.exports = { customError };
