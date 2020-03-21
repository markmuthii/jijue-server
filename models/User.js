const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is a required field']
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    max: 1024
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  role: {
    type: mongoose.Schema.ObjectId,
    ref: 'Role',
    required: true
  }
});

module.exports = mongoose.model('User', userSchema);
