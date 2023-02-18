require('dotenv').config();
const path = require('path');
const express = require('express');
const createError = require('http-errors');
const nunjucks = require('nunjucks');
const i18n = require('i18n');

const routers = require('./routers/index');

const PORT = process.env.PORT || 3000;
const app = express();

const env = nunjucks.configure(path.resolve(__dirname, 'views'), {
  autoescape: true,
  express: app,
  watch: process.env.NODE_ENV === 'development'
});

i18n.configure({
  locales: ['en', 'it', 'sv'],
  localePath: path.resolve('./locales'),
  defaultLocale: 'en',
  retryInDefaultLocale: true,
  queryParameter: 'language',
  directory: './locales'
});
env.addGlobal('date', new Date());
env.addGlobal('__', i18n.__);
env.addGlobal('__n', i18n.__n);
env.addFilter('t', i18n.__);

app.set('view engine', 'njk');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(i18n.init);


app.use('/', routers);

app.use((req, res, next) => {
  next(createError(404, res.__('error.PAGE_NOT_FOUND')));
});

app.use((err, req, res, next) => {
  err.status = err.status || 500;
  err.message = err.message || res.__('error.INTERNAL_ERROR');

  res.status(err.status);
  res.format({
    html: () => {
      res.render('viewer', { title: err.status, error: err });
    },
    'image/*': () => {
      res.set('Content-Type', 'image/svg+xml');
      res.render('error', { title: err.status, error: err });
    },
    default: () => {
      res.send(`${err.status} | ${err.message}`)
    }
  });
});


app.listen(PORT, () => {
  console.log(`App running on PORT ${PORT}`);
});

module.exports = app;
