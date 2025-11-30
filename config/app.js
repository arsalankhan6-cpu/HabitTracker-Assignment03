const express = require('express');
const path = require('path');
const logger = require('morgan');
const db = require('./db'); // connect to Mongo

// session + passport
const session = require('express-session');
const passport = require('passport');
require('./passport')(passport); // load Google + GitHub strategies

const indexRouter = require('../routes/index');
const habitRouter = require('../routes/habits');
const authRouter = require('../routes/auth');    // NEW: auth routes

const app = express();

// view engine setup
// where the EJS view files are stored
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 🔹 NEW: session middleware (must be BEFORE passport)
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secretKey',
    resave: false,
    saveUninitialized: false
  })
);

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

// NEW: make user available to all EJS views as `user`
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

// static files
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../node_modules')));

// routes
app.use('/', indexRouter);
app.use('/habits', habitRouter);
app.use('/auth', authRouter); // NEW: /auth/google, /auth/github, /auth/logout

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
