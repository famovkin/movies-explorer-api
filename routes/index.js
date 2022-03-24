const express = require('express');

const userRoutes = require('./users');
const movieRoutes = require('./movies');
const { login, createUser } = require('../controllers/users');

const routes = express.Router();

routes.post('/signup', createUser);
routes.post('/signin', login);
routes.use('/user', userRoutes);
routes.use('/movie', movieRoutes);

module.exports = routes;
