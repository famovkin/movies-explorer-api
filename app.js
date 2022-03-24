const express = require('express');
const mongoose = require('mongoose');

const app = express();
const { PORT = 3000 } = process.env;
const routes = require('./routes');

app.use(routes);
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });

  next();
});

async function startApp() {
  await mongoose.connect('mongodb://localhost:27017/bitfilmsdb');
  await app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
}

startApp();
