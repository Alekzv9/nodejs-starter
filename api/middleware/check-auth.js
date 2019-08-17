const jwt = require('jsonwebtoken');
const Response = require('../models/response');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    // If this fails will throw an exception
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    // Add 'userData' key to req for whoever need it.
    req.userData = {
      username: decodedToken.username,
      userId: decodedToken.userId
    };
    next();
  } catch (err) {
    res
      .status(401)
      .json(new Response(false, 'You are not authenticared.', err));
  }
};
