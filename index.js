/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const router = require('./router');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.CORS_ORIGIN,
}));
app.use(helmet());
app.use(express.json());
app.use(morgan('common'));

app.use(router);
app.use(express.static('public'));

app.use((req, res, next) => {
  const error = new Error(`Not Found | ${req.originalUrl}`);
  res.status(404);
  next(error);
});

app.use((error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
    stack: process.env.ENV === 'production' ? '' : error.stack,
  });
});

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
