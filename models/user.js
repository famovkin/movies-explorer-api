const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true,
    validate: (v) => validator.isEmail(v),
    message: 'Проверьте правильность ввода электронной почты',
  },
  password: {
    type: String,
    require: true,
    select: false,
  },
  name: {
    type: String,
    require: true,
    minlength: 2,
    maxlength: 30,
  },
});

module.exports = mongoose.model('user', userSchema);
