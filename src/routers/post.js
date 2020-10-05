const express = require('express');
const Post = require('../models/post');
const router = new express.Router();
const auth = require('../middleware/auth');
const exceptionsHandler = require('../middleware/errorHandlers');
const ErrorHandler = require('../helpers/error');

router.post('/post', auth, exceptionsHandler(async (req, res) => {
    const post = new Post({
      ...req.body,
      creator: req.user._id
    })
    await post.save();
    res.status(201).send(post);
}));

router.get('/posts', exceptionsHandler(async (req, res) => {
  const posts = await Post.find();
  if (posts && posts.length) {
    return res.send(posts);
  }
  res.status(404).send();
}));

router.get('/post/:id', exceptionsHandler(async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id })
  if (!post) {
    return res.status(404).send({ error: 'Post not found' });
  }
  res.send(post);
}));

router.patch('/post/:id', auth, exceptionsHandler(auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const validUpdates = ['title', 'content'];
  const isUpdateValid = updates.every(update => validUpdates.includes(update));
  if (!isUpdateValid) {
    throw new ErrorHandler(400, 'Invalid update');
  }
  const post = await Post.findOne({ _id: req.params.id, creator: req.user._id });
  if (!post) {
    throw new ErrorHandler(404, 'Post not found');
  }
  updates.forEach(update => post[update] = req.body[update]);
  await post.save();
  res.send(post);
}));

router.delete('/post/:id', auth, exceptionsHandler(async (req, res) => {
  const post = await Post.findOneAndDelete({ _id: req.params.id, creator: req.user._id });
  if (!post) {
    throw new ErrorHandler(404, 'Post not found')
  }
  res.send(post);
}));

router.get('/postsByAuthor/:id', exceptionsHandler(async(req, res) => {
  const posts = await Post.find({ creator: req.params.id });
  if (posts && posts.length) {
    return req.send(posts)
  }
  throw new ErrorHandler(404, 'No posts found');
}));

module.exports = router;