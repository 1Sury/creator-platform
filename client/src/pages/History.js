import { useState, useEffect } from 'react';
import axios from 'axios';

function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/content/history', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setHistory(res.data);
      } catch (err) {
        console.error('Failed to fetch history');
      }
      setLoading(false);
    };
    fetchHistory();
  }, []);

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Content History</h2>
      {loading ? (
        <div className="flex justify-center">
          <svg className="animate-spin h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      ) : history.length === 0 ? (
        <p className="text-gray-700 dark:text-gray-200 text-center">No content history available.</p>
      ) : (
        history.map((item) => (
          <div key={item._id} className="chatgpt-card mb-6 fade-in">
            <p className="text-gray-700 dark:text-gray-200 mb-2"><strong>Topic:</strong> {item.topic}</p>
            <p className="text-gray-700 dark:text-gray-200 mb-2"><strong>Niche:</strong> {item.niche}</p>
            <p className="text-gray-700 dark:text-gray-200 mb-2"><strong>Content:</strong> {item.content}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{new Date(item.createdAt).toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default History;