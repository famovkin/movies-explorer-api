const express = require('express');

const userRoutes = express.Router();

const {
  getUser,
  updateUser,
} = require('../controllers/users');

userRoutes.get('/me', getUser);
userRoutes.patch('/me', express.json(), updateUser);

module.exports = userRoutes;
