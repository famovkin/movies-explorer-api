const express = require('express');

const userRoutes = require('./users');
const movieRoutes = require('./movies');
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');
const NotFoundError = require('../errors/notFoundError');

const routes = express.Router();

routes.post('/signup', express.json(), createUser);
routes.post('/signin', express.json(), login);
routes.use(auth);
routes.use('/users', userRoutes);
routes.use('/movies', movieRoutes);
routes.use('*', () => {
  throw new NotFoundError('Страница не найдена. Проверьте URL');
});

module.exports = routes;
