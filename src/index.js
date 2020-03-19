require('dotenv').config();

const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const pjson = require('../package.json');

const users = require('./users');

const { log } = console;

const app = express();
const port = process.env.PORT || 3000;

nunjucks.configure(path.join(__dirname, 'views/'), {
  autoescape: true,
  express: app,
});

app.use(express.urlencoded({
  extended: true,
}));

app.use(require('cookie-parser')());

app.get('/', (req, res) => {
  if (!req.cookies.user) {
    res.render('index.html', {
      title: 'Getting Started Page',
      version: pjson.version,
    });
  } else {
    res.render('badges.html', {
      title: 'Badges',
      user: req.cookies.user,
      version: pjson.version,
    });
  }
});

app.get('/logout', (req, res) => {
  res.clearCookie('user');
  res.redirect('/');
});


app.post('/login', async (req, res) => {
  await users.login(req.body.name.toUpperCase(), req.body.section)
    .then((user) => {
      log('User Signed in:', user);
      res.cookie('user', user);
      res.status(201).send(user);
    })
    .catch((err) => {
      log(err);
      res.status(500).send('Sorry an error occured when trying to login. Please try again later.');
    });
});

app.use('/static', express.static(path.join(__dirname, 'public')));

const server = app.listen(port, () => log(`Badgework App Listening on Port ${port}!`));

module.exports = server;
