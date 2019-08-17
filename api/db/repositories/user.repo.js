const UserSchema = require('../schemas/user.schema');
const DbError = require('../db.error');

exports.createUser = async (username, password) => {
  try {
    const user = new UserSchema({
      username,
      password
    });
    return user.save();
  } catch (err) {
    throw new DbError('User creation failed.', err);
  }
};

exports.findByUsername = async username => {
  try {
    return UserSchema.findOne({ username }).exec();
  } catch (err) {
    throw new DbError('Error finding user.', err);
  }
};

exports.updateRefreshToken = async (userId, refreshToken) => {
  try {
    const updateData = { $set: { refreshToken } };
    return UserSchema.updateOne({ _id: userId }, updateData).exec();
  } catch (err) {
    throw new DbError('Updating refresh token failed.', err);
  }
};

exports.findByRefreshToken = token => {
  try {
    const query = { refreshToken: token };
    return UserSchema.findOne(query);
  } catch (err) {
    throw new DbError('Error finding user by refresh token,', err);
  }
};
