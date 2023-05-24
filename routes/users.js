// Base module
const userRouter = require('express').Router();

// Controllers
const {
  getCurrentUser,
  updateUserProfile,
} = require('../controllers/users');

// Middlewares
const { validateUser } = require('../middlewares/validation');

// User routes
userRouter.get('/me', getCurrentUser);
userRouter.patch('/me', validateUser, updateUserProfile);

module.exports = userRouter;
