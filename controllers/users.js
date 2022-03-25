const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const BadRequestError = require('../errors/badRequestError');
const DuplicateError = require('../errors/duplicateError');
const ServerError = require('../errors/serverError');
const AuthError = require('../errors/authError');

const {
  SALT_ROUND,
  OK_CODE,
  CREATED_CODE,
  MONGO_DUPLICATE_ERROR_CODE,
} = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUser = () => {
  // getUser
};

module.exports.updateUser = () => {
  // updateUser
};

module.exports.createUser = async (req, res, next) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    next(new BadRequestError('Не передан email, пароль или имя пользователя'));
  }

  bcrypt.hash(password, SALT_ROUND)
    .then((hash) => {
      User.create({ ...req.body, password: hash })
        .then((createdUser) => {
          res.status(CREATED_CODE).send({
            name: createdUser.name,
            email: createdUser.email,
          });
        })
        .catch((err) => {
          if (err.code === MONGO_DUPLICATE_ERROR_CODE) {
            throw new DuplicateError('Такой пользователь уже существует');
          } else if (err.name === 'ValidationError') {
            throw new BadRequestError(err.message);
          } else {
            throw new ServerError('Произошла ошибка');
          }
        })
        .catch(next);
    })
    .catch(() => next(new BadRequestError('Произошла ошибка')));
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError('Не передан email или пароль');
  }

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthError('Неверные почта или пароль');
      }

      bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthError('Неверные почта или пароль');
          }
          const token = jwt.sign({ _id: user._doc._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
          res.status(OK_CODE).send({ token });
        })
        .catch(next);
    })
    .catch(next);
};
