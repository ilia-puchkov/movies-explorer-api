// Allowed addresses
const allowedCors = [
  'http://movies-reras.students.nomoredomains.rocks',
  'https://movies-reras.students.nomoredomains.rocks',
  'http://api.movies-reras.students.nomoredomains.rocks',
  'https://api.movies-reras.students.nomoredomains.rocks',
  'http://localhost:3000',
  'https://localhost:3000',
];

// Cors
const cors = (req, res, next) => {
  const { method } = req;
  const { origin } = req.headers;

  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  res.header('Access-Control-Allow-Credentials', true);

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  return next();
};

module.exports = { cors };
