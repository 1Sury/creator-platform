import { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
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
        borderColor: '#3b82f6', // Matches blue gradient
        backgroundColor: 'rgba(59, 130, 246, 0.4)', // Gradient fill
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#ffffff',
        pointBorderColor: '#3b82f6',
        pointHoverBackgroundColor: '#3b82f6',
        pointHoverBorderColor: '#ffffff',
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: { size: 14, family: 'Inter' },
          color: document.documentElement.classList.contains('dark') ? '#ffffff' : '#1f2937',
        },
      },
      title: {
        display: true,
        text: 'Follower Growth Over 7 Days',
        font: { size: 16, family: 'Inter', weight: 'bold' },
        color: document.documentElement.classList.contains('dark') ? '#ffffff' : '#1f2937',
      },
      tooltip: {
        backgroundColor: 'rgba(31, 41, 55, 0.8)',
        titleFont: { family: 'Inter' },
        bodyFont: { family: 'Inter' },
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
      },
    },
    scales: {
      x: {
        ticks: {
          font: { family: 'Inter' },
          color: document.documentElement.classList.contains('dark') ? '#ffffff' : '#1f2937',
        },
        grid: {
          color: document.documentElement.classList.contains('dark') ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
      },
      y: {
        ticks: {
          font: { family: 'Inter' },
          color: document.documentElement.classList.contains('dark') ? '#ffffff' : '#1f2937',
        },
        grid: {
          color: document.documentElement.classList.contains('dark') ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        beginAtZero: false,
      },
    },
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
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white fade-in">Instagram Analytics</h2>
      {loading ? (
        <div className="flex justify-center">
          <svg className="animate-spin h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="chatgpt-card fade-in">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Follower Growth</h3>
            <div className="chart-container">
              <Line data={followerData} options={chartOptions} />
            </div>
          </div>
          <div className="chatgpt-card fade-in">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Engagement Rate</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {analytics?.engagement.map((post) => (
                <div key={post.post} className="p-4 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 rounded-xl fade-in">
                  <p className="text-gray-900 dark:text-white font-semibold">Post {post.post}</p>
                  <p className="text-gray-700 dark:text-gray-200">Likes: {post.likes}</p>
                  <p className="text-gray-700 dark:text-gray-200">Comments: {post.comments}</p>
                  <p className="text-gray-700 dark:text-gray-200">
                    Engagement Rate: {((post.likes + post.comments) / analytics.followers[6] * 100).toFixed(2)}%
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="chatgpt-card fade-in">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Best Time to Post</h3>
            <p className="text-gray-700 dark:text-gray-200">{analytics?.bestPostTime}</p>
          </div>
          <button
            onClick={handleExport}
            className="chatgpt-button fade-in"
          >
            Export Analytics
          </button>
        </div>
      )}
    </div>
  );
}

export default Analytics;