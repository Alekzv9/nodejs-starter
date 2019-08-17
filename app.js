// const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const db = require('./api/db/config/datatabase');

// # Routes
const userRoutes = require('./api/routes/user.route');

// Configure body paser for JSON bodies and url params
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Configure static folder for images.
// app.use('/images', express.static(path.join('backend/images')));
// Server static resources for angular.
// app.use('/', express.static(path.join(__dirname, 'angular')));

// Configure headers.
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

// Configure custom routes.
app.use('/api/user', userRoutes);

// Serve an angular app.
// app.use((req, res, next) => {
//   res.sendFile(path.join(__dirname, "angular", "index.html"));
// });

module.exports = app;
