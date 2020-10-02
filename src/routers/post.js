const express = require('express');
const Post = require('../models/post');
const router = new express.Router();
const auth = require('../middleware/auth');

router.post('/post', auth, async (req, res) => {
  try {
    const post = new Post({
      ...req.body,
      creator: req.user._id
    })
    await post.save();
    res.status(201).send(post);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    if (posts && posts.length) {
      return res.send(posts);
    }
    res.status(404).send();
  } catch (e) {
    res.status(500).send();
  }
})

router.get('/post/:id', async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id })
    if (!post) {
      return res.status(404).send({ error: 'Post not found' });
    }
    res.send(post);
  } catch (e) {
    res.status(400).send();
  }
})

router.patch('/post/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const validUpdates = ['title', 'content'];
  const isUpdateValid = updates.every(update => validUpdates.includes(update));
  if (!isUpdateValid) {
    return res.status(400).send({ error: 'Invalid update' });
  }
  try {
    const post = await Post.findOne({ _id: req.params.id, creator: req.user._id });
    if (!post) {
      return res.status(404).send({ error: 'Post not found' });
    }
    updates.forEach(update => post[update] = req.body[update]);
    await post.save();
    res.send(post);
  } catch (e) {
    res.status(400).send();
  }
})

router.delete('/post/:id', auth, async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({ _id: req.params.id, creator: req.user._id });
    if (!post) {
      return res.status(404).send({ error: 'Post not found' });
    }
    res.send(post);
  } catch (e) {
    res.status(500).send();
  }
})

router.get('/postsByAuthor/:id', async(req, res) => {
  try {
    const posts = await Post.find({ creator: req.params.id });
    if (posts && posts.length) {
      return req.send(posts)
    }
    res.status(404).send({ error: 'No posts found' });
  } catch (e) {
    res.status(500).send();
  }
})

module.exports = router;