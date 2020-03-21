const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  status: {
    type: String,
    default: 'unread'
  },
  from: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  to: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Message', messageSchema);
