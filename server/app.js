
import services from './services/context.service';
import config from './config/local';
import routes from './routes/index.route';

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const app = express();

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressValidator());
app.use((req, res, next) => {
  services(config)
    .then(context => {
      req.context = context;
      next();
    });
});

app.use(routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.locals.message = err.message;
  res.locals.error = err;
  res.status(err.status || 500);
  res.json({status: 'error'});
});

module.exports = app;