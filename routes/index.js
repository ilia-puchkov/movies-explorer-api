// Base module
const router = require('express').Router();

// Middlewares
const auth = require('../middlewares/auth');
const { validateAuth, validateRegistration } = require('../middlewares/validation');

// Routes
const userRouter = require('./users');
const movieRouter = require('./movies');

// Controllers
const { createUser, login } = require('../controllers/users');

// Errors
const NotFoundError = require('../errors/NotFoundError');
const { PAGE_NOT_FOUND_ERROR_TEXT } = require('../utils/errorConstants');

// Index routes
router.post('/signin', validateAuth, login);
router.post('/signup', validateRegistration, createUser);

router.use(auth);
router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.use((req, res, next) => {
  next(new NotFoundError(PAGE_NOT_FOUND_ERROR_TEXT));
});

module.exports = router;
