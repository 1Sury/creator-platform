const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    topic: { type: String, required: true },
    niche: { type: String, required: true },
    content: {
        reelIdea: { type: String, required: true },
        hook: { type: String, required: true },
        caption: { type: String, required: true },
        hashtags: [{ type: String }],
    },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Content', contentSchema);