const express = require('express');
const router = express.Router();

const mockAnalytics = {
  followers: [1200, 1250, 1280, 1295, 1330, 1360, 1400],
  engagement: [
    { post: 1, likes: 320, comments: 25 },
    { post: 2, likes: 400, comments: 40 },
    { post: 3, likes: 290, comments: 10 },
    { post: 4, likes: 350, comments: 30 },
    { post: 5, likes: 380, comments: 35 }
  ],
  bestPostTime: "Wednesday 7 PM"
};

router.get('/', (req, res) => {
  res.json(mockAnalytics);
});

router.post('/upload', (req, res) => {
  res.json({ message: 'Analytics data uploaded successfully', data: mockAnalytics });
});

router.get('/export', (req, res) => {
  res.setHeader('Content-disposition', 'attachment; filename=analytics.json');
  res.setHeader('Content-type', 'application/json');
  res.write(JSON.stringify(mockAnalytics, null, 2));
});

module.exports = router;