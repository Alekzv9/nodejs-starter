const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserRepo = require('../db/repositories/user.repo');

exports.createUser = async (username, password) => {
  const hashPassword = await encryptPassword(password);
  return UserRepo.createUser(username, hashPassword);
};

/**
 * JWT Docs
 * https://www.npmjs.com/package/jsonwebtoken
 * Units for expiresIn
 * https://github.com/zeit/ms
 */
exports.loginUser = async (username, password) => {
  const user = await UserRepo.findByUsername(username);
  if (user === null) throw new Error('User not found.');

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) throw new Error('Invalid password.');

  const fetchedUser = { username: user.username, userId: user._id };
  const accessToken = jwt.sign(fetchedUser, process.env.JWT_KEY, {
    expiresIn: '30m'
  });
  const refreshToken = jwt.sign(fetchedUser, process.env.JWT_REFRESH_KEY);
  const result = {
    accessToken,
    refreshToken,
    userId: user._id,
    expiresIn: 1800 //Seconds
  };

  await UserRepo.updateRefreshToken(user._id, refreshToken);
  return result;
};

exports.refreshToken = async oldRefreshToken => {
  const user = await UserRepo.findByRefreshToken(oldRefreshToken);

  if (!user) {
    throw Error('User not found.');
  }
  const fetchedUser = { username: user.username, userId: user._id };
  const token = jwt.sign(fetchedUser, process.env.JWT_KEY, {
    expiresIn: '30m'
  });
  const refreshToken = jwt.sign(fetchedUser, process.env.JWT_REFRESH_KEY);
  const result = {
    token,
    refreshToken,
    expiresIn: 1800, // Seconds.
    userId: user._id
  };
  await UserRepo.updateRefreshToken(user._id, refreshToken);
  return result;
};

/**
 * Removes the refresh token from the user.
 */
exports.logout = async userId => {
  console.log(userId);
  const updatedRefreshToken = await UserRepo.updateRefreshToken(userId, null);
  return updatedRefreshToken;
};

const encryptPassword = async password => {
  try {
    const pass = await bcrypt.hash(password, 10);
    return pass;
  } catch (err) {
    console.log(err);
    throw new Error('Problem encrypting password.');
  }
};
