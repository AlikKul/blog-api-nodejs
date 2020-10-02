const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const check = require('check-types');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (!check.string(value)) {
        throw new Error('Invalid name')
      }
    }
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate(value) {
      if (!check.string(value)) {
        throw new Error('Invalid email')
      }
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    validate(value) {
      if (!check.string(value)) {
        throw new Error('Invalid password')
      }
    }
  },
  tokens: [{
    token: {
      type: String,
      required: true,
    }
  }]
});

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Unable to login');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Unable to login');
  }
  return user;
}

userSchema.methods.generateAuthToken = async function() {
  const token = jwt.sign({ _id: this._id.toString() }, process.env.JWT_SECRET);
  this.tokens.push({ token });
  await this.save();
  return token;
}

userSchema.methods.toJSON = function() {
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  return userObject;
}

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;