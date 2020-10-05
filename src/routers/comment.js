const express = require('express');
const Comment = require('../models/comment');
const Post = require('../models/post');
const router = new express.Router();
const auth = require('../middleware/auth');
const exceptionsHandler = require('../middleware/errorHandlers');
const ErrorHandler = require('../helpers/error');

router.get('/comments/:id', exceptionsHandler(async (req,res) => {
  const comments = await Comment.find({ postId: req.params.id });
  if (comments && comments.length) {
    return res.send(comments);
  }
  throw new  ErrorHandler(404, `This post doesn't have any comments`);
}));

router.post('/comment/:postId', auth, exceptionsHandler(async (req, res) => {
  const post = await Post.findOne({ _id: req.params.postId });
  if (!post) {
    throw new ErrorHandler(400, `No post with id ${req.params.postId}`);
  }
  const comment = new Comment({
    ...req.body,
    creator: req.user._id,
    postId: req.params.postId
  })
  await comment.save();
  res.status(201).send(comment);
}));

router.delete('/comment/:id', auth, exceptionsHandler(async (req, res) => {
  const comment = await Comment.findOneAndDelete({ _id: req.params.id, creator: req.user._id })
  if (!comment) {
    throw new ErrorHandler(404, 'Comment not found')
  }
  res.send(comment);
}));

router.patch('/comment/:id', auth, exceptionsHandler(async (req, res) => {
  const updates = Object.keys(req.body);
  const validUpdates = ['content'];
  const isUpdateValid = updates.every(update => validUpdates.includes(update));
  if (!isUpdateValid) {
    throw new ErrorHandler(400, 'Invalid update');
  }
  const comment = await Comment.findOne({ _id: req.params.id, creator: req.user._id });
  if (!comment) {
    throw new ErrorHandler(404, 'Comment not found');
  }
  updates.forEach(update => comment[update] = req.body[update]);
  await comment.save();
  res.send(comment);
}));

module.exports = router;