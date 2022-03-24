const express = require('express');
const mongoose = require('mongoose');

const app = express();
const { PORT = 3000 } = process.env;
const routes = require('./routes');

app.use(routes);

async function startApp() {
  await mongoose.connect('mongodb://localhost:27017/bitfilmsdb');
  await app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
}

startApp();
