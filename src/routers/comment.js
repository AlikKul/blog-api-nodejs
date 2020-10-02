const express = require('express');
const Comment = require('../models/comment');
const Post = require('../models/post');
const router = new express.Router();
const auth = require('../middleware/auth');

router.get('/comments/:id', async (req,res) => {
  try {
    const comments = await Comment.find({ postId: req.params.id });
    if (comments && comments.length) {
      res.send(comments);
    }
    res.status(404).send();
  } catch (e) {
    res.status(500).send();
  }
})

router.post('/comment', auth, async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.body.postId });
    if (!post) {
      return res.status(400).send()
    }
    const comment = new Comment({
      ...req.body,
      creator: req.user._id
    })
    await comment.save();
    res.status(201).send(comment);
  } catch (e) {
    res.status(400).send();
  }
})

router.delete('/comment/:id', auth, async (req, res) => {
  try {
    const comment = await Comment.findOneAndDelete({ _id: req.params.id, creator: req.user._id })
    if (!comment) {
      return res.status(404).send({ error: 'Comment not found' });
    }
    res.send(comment);
  } catch (e) {
    res.status(500).send();
  }
})

router.patch('/comment/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const validUpdates = ['content'];
  const isUpdateValid = updates.every(update => validUpdates.includes(update));
  if (!isUpdateValid) {
    return res.status(400).send({ error: 'Invalid update' });
  }
  try {
    const comment = await Comment.findOne({ _id: req.params.id, creator: req.user._id });
    if (!comment) {
      return res.status(404).send({ error: 'Comment not found' });
    }
    updates.forEach(update => comment[update] = req.body[update]);
    await comment.save();
    res.send(comment);
  } catch (e) {
    res.status(400).send();
  }
})

module.exports = router;