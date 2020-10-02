const mongoose = require('mongoose');
const check = require('check-types');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (!check.string(value)) {
        throw new Error('Invalid title')
      }
    }
  },
  content: {
    type: String,
    required: true,
    minlength: 10,
    validate(value) {
      if (!check.string(value)) {
        throw new Error('Invalid content')
      }
    }
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
}, {
  timestamps: true
})

const Post = mongoose.model('Post', postSchema);

module.exports = Post;