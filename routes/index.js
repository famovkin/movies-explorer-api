const express = require('express');
const { celebrate, Joi } = require('celebrate');

const userRoutes = require('./users');
const movieRoutes = require('./movies');
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');
const { validateEmail } = require('../utils/validators');
const NotFoundError = require('../errors/notFoundError');

const routes = express.Router();

routes.post('/api/signup', express.json(), celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().custom(validateEmail, 'Email validation').required(),
    password: Joi.string().required(),
  }),
}), createUser);
routes.post('/api/signin', express.json(), celebrate({
  body: Joi.object().keys({
    email: Joi.string().custom(validateEmail, 'Email validation').required(),
    password: Joi.string().required(),
  }),
}), login);
routes.use(auth);
routes.use('/api/users', userRoutes);
routes.use('/api/movies', movieRoutes);
routes.use('*', () => {
  throw new NotFoundError('Страница не найдена. Проверьте URL');
});

module.exports = routes;
