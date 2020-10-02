const mongoose = require('mongoose');
const check = require('check-types');
const ErrorHandler = require('../helpers/error');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    validate(value) {
      if (!check.nonEmptyString(value)) {
        throw new ErrorHandler(400, 'Invalid title');
      }
    }
  },
  content: {
    type: String,
    required: true,
    minlength: 10,
    validate(value) {
      if (!check.nonEmptyString(value)) {
        throw new ErrorHandler(400, 'Invalid content');
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