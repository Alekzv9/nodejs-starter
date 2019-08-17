const dbConfig = require('./db-configuration')[process.env.ENVIRONMENT];
const DbError = require('../db.error');

const getDbConfig = () => {
  if (!process.env.ENVIRONMENT)
    throw new DbError(
      'ENVIRONMENT is undefined. process.env.ENVIRONMENT: ' +
        process.env.ENVIRONMENT,
      null
    );

  if (!dbConfig) {
    throw new DbError('dbConfig is undefined. dbconfig' + dbConfig, null);
  }

  return dbConfig;
};

module.exports.db_config = getDbConfig();
