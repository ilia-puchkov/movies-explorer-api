const { rateLimit } = require('express-rate-limit');

const LIMIT_ERROR_TEXT = require('../utils/errorConstants');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: LIMIT_ERROR_TEXT,
});

module.exports = limiter;
