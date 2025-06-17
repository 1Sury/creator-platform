import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between mb-6">
          <h2 className="text-2xl font-bold">Content History</h2>
          <div>
            <Link to="/chat" className="mr-4 text-blue-500 hover:underline">New Chat</Link>
            <Link to="/analytics" className="text-blue-500 hover:underline">View Analytics</Link>
          </div>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : history.length === 0 ? (
          <p>No content history available.</p>
        ) : (
          history.map((item) => (
            <div key={item._id} className="bg-white p-6 mb-4 rounded-lg shadow-lg">
              <p><strong>Topic:</strong> {item.topic}</p>
              <p><strong>Niche:</strong> {item.niche}</p>
              <p><strong>Content:</strong> {item.content}</p>
              <p className="text-sm text-gray-500">{new Date(item.createdAt).toLocaleString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default History;