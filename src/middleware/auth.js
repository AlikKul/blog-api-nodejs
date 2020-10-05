const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ErrorHandler = require('../helpers/error');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });
    if (!user) {
      throw new ErrorHandler(400, 'Bad request');
    }
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    console.log(e)
    next({ ...e, statusCode: 401, message: 'Unauthorized' });
  }
}

module.exports = auth;