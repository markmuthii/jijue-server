const mongoose = require('mongoose');

const kitSchema = new mongoose.Schema({
  serial: {
    type: String,
    required: true
  },
  kitType: {
    type: String,
    required: true
  },
  disease: {
    type: String,
    required: true
  },
  results: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  user_id: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Kit', kitSchema);
