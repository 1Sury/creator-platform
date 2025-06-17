import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Chat() {
  const [topic, setTopic] = useState('');
  const [niche, setNiche] = useState('fashion');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const niches = ['fashion', 'fitness', 'finance', 'food', 'travel'];

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/content', {
        topic,
        niche,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setResponse(res.data);
    } catch (err) {
      setError('Failed to generate content. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between mb-6">
          <h2 className="text-2xl font-bold">Content Idea Assistant</h2>
          <div>
            <Link to="/history" className="mr-4 text-blue-500 hover:underline">View History</Link>
            <Link to="/analytics" className="text-blue-500 hover:underline">View Analytics</Link>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter a topic..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <select
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {niches.map((n) => (
                <option key={n} value={n}>{n.charAt(0).toUpperCase() + n.slice(1)}</option>
              ))}
            </select>
          </div>
          <button
            onClick={handleSubmit}
            disabled={loading || !topic}
            className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
          >
            {loading ? 'Generating...' : 'Generate Content'}
          </button>
          {error && <p className="text-red-500 mt-4">{error}</p>}
          {response && (
            <div className="mt-6 p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Generated Content</h3>
              <p><strong>Reel Idea:</strong> {response.reelIdea}</p>
              <p><strong>Hook:</strong> {response.hook}</p>
              <p><strong>Caption:</strong> {response.caption}</p>
              <p><strong>Hashtags:</strong> {response.hashtags?.join(', ')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Chat;