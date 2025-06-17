import { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Analytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/analytics', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setAnalytics(res.data);
      } catch (err) {
        console.error('Failed to fetch analytics');
      }
      setLoading(false);
    };
    fetchAnalytics();
  }, []);

  const followerData = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    datasets: [
      {
        label: 'Followers',
        data: analytics?.followers || [],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        fill: true,
      },
    ],
  };

  const handleExport = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/analytics/export', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      const blob = new Blob([res.data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'analytics.json';
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to export analytics');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between mb-6">
          <h2 className="text-2xl font-bold">Instagram Analytics</h2>
          <div>
            <Link to="/chat" className="mr-4 text-blue-500 hover:underline">New Chat</Link>
            <Link to="/history" className="text-blue-500 hover:underline">View History</Link>
          </div>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Follower Growth (7 Days)</h3>
              <Line data={followerData} />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Engagement Rate</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {analytics?.engagement.map((post) => (
                  <div key={post.post} className="p-4 bg-gray-50 rounded-lg">
                    <p><strong>Post {post.post}</strong></p>
                    <p>Likes: {post.likes}</p>
                    <p>Comments: {post.comments}</p>
                    <p>Engagement Rate: {((post.likes + post.comments) / analytics.followers[6] * 100).toFixed(2)}%</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Best Time to Post</h3>
              <p>{analytics?.bestPostTime}</p>
            </div>
            <button
              onClick={handleExport}
              className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Export Analytics
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Analytics;