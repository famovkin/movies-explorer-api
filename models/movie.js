const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    require: true,
  },
  director: {
    type: String,
    require: true,
  },
  duration: {
    type: Number,
    require: true,
  },
  year: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
    validate: (v) => validator.isURL(v),
    message: 'Проверьте правильность ссылки на постер',
  },
  trailerLink: {
    type: String,
    require: true,
    validate: (v) => validator.isURL(v),
    message: 'Проверьте правильность ссылки на трейлер',
  },
  thumbnail: {
    type: String,
    require: true,
    validate: (v) => validator.isURL(v),
    message: 'Проверьте правильность ссылки на миниатюру постера',
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  movieId: {
    require: true,
  },
  nameRU: {
    type: String,
    require: true,
  },
  nameEN: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
