const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  topic: String,
  niche: String,
  content: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Content', contentSchema);