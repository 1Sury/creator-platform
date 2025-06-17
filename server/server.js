require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const Content = require('./models/Content');

const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// Debug environment variables
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Set' : 'Undefined');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Set' : 'Undefined');
console.log('OPENROUTER_API_KEY:', process.env.OPENROUTER_API_KEY ? 'Set (hidden)' : 'Undefined');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token provided' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    const token = jwt.sign({ userId: username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(400).json({ message: 'Invalid credentials' });
  }
});

app.post('/api/content', authMiddleware, async (req, res) => {
  const { topic, niche } = req.body;
  if (!process.env.OPENROUTER_API_KEY) {
    console.error('OPENROUTER_API_KEY is not set in .env');
    return res.status(500).json({ message: 'Server configuration error: Missing OpenRouter API key' });
  }
  if (!topic || !niche) {
    return res.status(400).json({ message: 'Topic and niche are required' });
  }
  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'meta-llama/llama-3.1-8b-instruct:free',
        messages: [
          {
            role: 'user',
            content: `Generate a social media content idea for a ${niche} niche about ${topic}. Respond **only** with a JSON object containing: reelIdea (string), hook (string), caption (string), hashtags (array of strings). Do not include any additional text, explanations, or markdown. Example: {"reelIdea":"Outfit of the Day","hook":"Style on a budget!","caption":"Check out this chic look...","hashtags":["#Fashion","#Style"]}`
          }
        ],
        max_tokens: 500, // Limit response size
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:3000',
          'X-Title': 'Creator Platform'
        }
      }
    );

    console.log('OpenRouter response:', JSON.stringify(response.data, null, 2));
    const content = response.data.choices[0].message.content;
    let parsedContent;
    try {
      parsedContent = JSON.parse(content);
      if (!parsedContent.reelIdea || !parsedContent.hook || !parsedContent.caption || !Array.isArray(parsedContent.hashtags)) {
        throw new Error('Invalid response format: Missing required fields');
      }
    } catch (e) {
      console.error('Failed to parse OpenRouter response:', content, e);
      return res.status(500).json({ message: 'Invalid response from content generation service' });
    }

    const newContent = new Content({
      userId: req.user.userId,
      topic,
      niche,
      content: parsedContent
    });
    await newContent.save();

    res.json(parsedContent);
  } catch (err) {
    console.error('OpenRouter API error:', err.response?.data || err.message);
    if (err.response?.status === 401) {
      res.status(500).json({ message: 'Invalid OpenRouter API key.' });
    } else if (err.response?.status === 402) {
      res.status(500).json({ message: 'OpenRouter credit limit reached.' });
    } else if (err.response?.status === 429) {
      res.status(429).json({ message: 'Rate limit exceeded. Please try again later.' });
    } else if (err.response?.status === 400) {
      res.status(400).json({ message: 'Invalid request to OpenRouter.' });
    } else {
      res.status(500).json({ message: 'Failed to generate content.' });
    }
  }
});

app.get('/api/history', authMiddleware, async (req, res) => {
  try {
    const contents = await Content.find({ userId: req.user.userId });
    res.json(contents);
  } catch (err) {
    console.error('History fetch error:', err);
    res.status(500).json({ message: 'Failed to fetch history' });
  }
});

app.get('/api/analytics', authMiddleware, async (req, res) => {
  const analytics = {
    followers: [100, 120, 150, 180, 200, 220, 250],
    engagement: [
      { post: '1', likes: 50, comments: 10 },
      { post: '2', likes: 70, comments: 15 }
    ],
    bestPostTime: '6 PM'
  };
  res.json(analytics);
});

app.get('/api/analytics/export', authMiddleware, async (req, res) => {
  const analytics = {
    followers: [100, 120, 150, 180, 200, 220, 250],
    engagement: [
      { post: '1', likes: 50, comments: 10 },
      { post: '2', likes: 70, comments: 15 }
    ],
    bestPostTime: '6 PM'
  };
  res.setHeader('Content-Disposition', 'attachment; filename=analytics.json');
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(analytics, null, 2));
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

app.listen(5000, () => console.log('Server running on port 5000'));