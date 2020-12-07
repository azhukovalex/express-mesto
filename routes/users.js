const usersRouter = require('express').Router();
const { getUsers, getProfile } = require('../controllers/users');

usersRouter.get('/users', getUsers);
usersRouter.get('/users/:id', getProfile);

module.exports = usersRouter;
