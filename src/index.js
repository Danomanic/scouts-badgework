require('dotenv').config();

const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const db = require('./utils/db');
const pjson = require('../package.json');

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


app.post('/login', (req, res) => {
  db.connect((cerr) => {
    if (cerr) {
      log('Unable to connect to Database', cerr);
      process.exit(0);
    }

    const user = {
      name: req.body.name,
      section: req.body.section,
    };
    db.db('badgework').collection('users').insertOne(user, (err, data) => {
      if (err) throw err;
      log(`Added new user: ${user.name}`);

      const newUser = {
        name: user.name,
        section: user.section,
        id: data.insertedId,
      };
      db.close();
      res.cookie('user', newUser);
      res.status(201).send(newUser);
    });
  });
});

app.use('/static', express.static(path.join(__dirname, 'public')));

const server = app.listen(port, () => log(`Badgework App Listening on Port ${port}!`));

module.exports = server;
