const DbError = require('../db/db.error');

// module.exports = class Response {}
class Response {
  constructor(success, message, data) {
    this.success = success;
    this.message = message;
    this.data = data;
    if (data instanceof DbError) {
      this.message = data.customError;
    }
  }
}

module.exports = Response;
