// Base modules
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const router = require('./routes/index');

// Middlewares
const { cors } = require('./middlewares/cors');
const { customError } = require('./middlewares/customError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { MONGO_DEV } = require('./utils/constants');
const limiter = require('./middlewares/limiter');

const { NODE_ENV, MONGO_URL } = process.env;
const { PORT = 3000 } = process.env;
const app = express();

app.use(helmet());
app.use(express.json());

mongoose.connect(NODE_ENV === 'production' ? MONGO_URL : MONGO_DEV);

app.use(requestLogger);
app.use(limiter);
app.use(cors);

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(customError);

app.listen(PORT);
