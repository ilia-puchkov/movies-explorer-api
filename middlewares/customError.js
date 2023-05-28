const SERVER_ERROR_TEXT = require('../utils/errorConstants');

// Custom error
const customError = (err, _, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? SERVER_ERROR_TEXT : message,
  });

  next();
};

module.exports = { customError };
