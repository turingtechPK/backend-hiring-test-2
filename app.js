const express = require('express');
const morgan = require('morgan');

const RichError = require('./utils/richError');
const accountRouter = require('./routes/api/account');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use('/api/v1/accounts', accountRouter);

app.all('*', (req, res, next) => {
  next(new RichError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;
