const mongoose = require('mongoose');
const check = require('check-types');

const commentSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  content: {
    type: String,
    required: true,
    minlength: 3,
    validate(value) {
      if (!check.string(value)) {
        throw new Error('Invalid content')
      }
    }
  },
  postId: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;