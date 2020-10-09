const express = require('express');
const User = require('../models/user');
const router = new express.Router();
const auth = require('../middleware/auth');
const exceptionsHandler = require('../middleware/errorHandlers');
const ErrorHandler = require('../helpers/error');

router.post('/user/login', exceptionsHandler(async (req, res) => {
  const user = await User.findByCredentials(req.body.email, req.body.password);
  if (!user) {
    throw new ErrorHandler(400, 'Invalid user password or email')
  }
  const token = await user.generateAuthToken();
  res.send({ user, token });
}));

router.post('/user/logout', auth, exceptionsHandler(async (req, res) => {
  req.user.tokens = req.user.tokens.filter(token => token.token !== req.token);
  await req.user.save();
  res.send();
}));

router.post('/user', exceptionsHandler(async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).send(user);
}));

router.get('/users', exceptionsHandler(async (req, res) => {
  const users = await User.find();
  res.send(users);
}));

module.exports = router;