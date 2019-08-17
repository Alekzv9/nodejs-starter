const mongoose = require('mongoose');
const config = require('./db-config');

const dbConfig = config.db_config;

// Set up default connection.
mongoose.connect(dbConfig.url, dbConfig.options);

// Set up JS Promises as default.
mongoose.Promise = global.Promise;

// Disable warning '`findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify` option set to false are deprecated.'
mongoose.set('useFindAndModify', false);

// Disabling 'ensureIndex' warning.
mongoose.set('useCreateIndex', true);

const db = mongoose.connection;
db.on('connected', () => {
  console.log('---Database Listening---');
});
db.on('error', err => {
  console.log('Db error: ' + err);
});

exports.db = db;
