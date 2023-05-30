require('dotenv').config();

const { NODE_ENV, MONGO_URL } = process.env;

const MONGO_URL_DEV = 'mongodb://0.0.0.0:27017/bitfilmsdb';
const JWT_SECRET_DEV = 'dev-secret';

const DB_URL = NODE_ENV === 'production' ? MONGO_URL : MONGO_URL_DEV;

module.exports = { DB_URL, JWT_SECRET_DEV };
