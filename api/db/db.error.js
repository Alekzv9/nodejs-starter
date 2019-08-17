/**
 * Custom DB exception.
 */
class DbError extends Error {
  constructor(customError, rootError) {
    super(rootError);
    this.customError = customError;
    this.rootError = rootError;
  }
}

module.exports = DbError;
