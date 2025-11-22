const express = require('express');
const path = require('path');
const logger = require('morgan');
const db = require('./db'); // connect to Mongo

const indexRouter = require('../routes/index');
const habitRouter = require('../routes/habits');
const habitRoutes = require('../routes/habits');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// static files
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../node_modules')));

// routes
app.use('/', indexRouter);
app.use('/habits', habitRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});

module.exports = app;
