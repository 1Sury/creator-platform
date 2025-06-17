import { useState } from 'react';
import axios from 'axios';

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
    <div className="max-w-3xl mx-auto">
      <div className="chatgpt-card fade-in">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Content Idea Assistant</h2>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Enter a topic (e.g., Summer Trends)"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="chatgpt-input"
          />
        </div>
        <div className="mb-8">
          <select
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            className="chatgpt-input"
          >
            {niches.map((n) => (
              <option key={n} value={n}>{n.charAt(0).toUpperCase() + n.slice(1)}</option>
            ))}
          </select>
        </div>
        <button
          onClick={handleSubmit}
          disabled={loading || !topic}
          className="chatgpt-button w-full"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </span>
          ) : (
            'Generate Content'
          )}
        </button>
        {error && <p className="text-red-400 mt-6 text-center animate-pulse">{error}</p>}
        {response && (
          <div className="mt-8 p-6 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 rounded-xl fade-in">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Generated Content</h3>
            <p className="text-gray-700 dark:text-gray-200 mb-2"><strong>Reel Idea:</strong> {response.reelIdea}</p>
            <p className="text-gray-700 dark:text-gray-200 mb-2"><strong>Hook:</strong> {response.hook}</p>
            <p className="text-gray-700 dark:text-gray-200 mb-2"><strong>Caption:</strong> {response.caption}</p>
            <p className="text-gray-700 dark:text-gray-200"><strong>Hashtags:</strong> {response.hashtags?.join(', ')}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chat;