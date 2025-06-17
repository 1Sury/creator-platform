const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const Content = require('./models/Content');
const analyticsRoutes = require('./routes/analytics');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    const token = jwt.sign({ username }, 'secret-key', { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.post('/api/content', async (req, res) => {
  try {
    const { topic, niche } = req.body;
    const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are a content strategist. Suggest one trending Instagram reel idea for a creator in the ${niche} niche. Include a caption, 5 relevant hashtags, and a strong opening hook.`
        },
        { role: 'user', content: topic }
      ]
    }, {
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const content = response.data.choices[0].message.content;
    const newContent = new Content({ topic, niche, content });
    await newContent.save();
    
    res.json(JSON.parse(content));
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate content' });
  }
});

app.get('/api/content/history', async (req, res) => {
  const history = await Content.find().sort({ createdAt: -1 });
  res.json(history);
});

app.use('/api/analytics', analyticsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));