// Base modules
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

// Error module
const AuthorizationError = require('../errors/AuthorizationError');

// Authorisation
// eslint-disable-next-line consistent-return
const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthorizationError('Требуется авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
    );
  } catch (err) {
    return next(new AuthorizationError('Требуется авторизация'));
  }

  req.user = payload;

  next();
};

module.exports = { auth };
