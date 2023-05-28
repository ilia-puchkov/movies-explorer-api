// Base modules
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const { JWR_SECRET_DEV } = require('../utils/constants');

// Error module
const AuthorizationError = require('../errors/AuthorizationError');
const AUTH_ERROR_TEXT = require('../utils/errorConstants');

// Authorization
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthorizationError(AUTH_ERROR_TEXT);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : JWR_SECRET_DEV,
    );
  } catch (err) {
    next(new AuthorizationError(AUTH_ERROR_TEXT));
    return;
  }

  req.user = payload;

  next();
};
