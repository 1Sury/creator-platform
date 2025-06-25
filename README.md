# Fashion Creator Platform

## Overview
The Fashion Creator Platform is a full-stack application designed to assist content creators in generating Instagram Reels ideas, tracking content history, and analyzing engagement metrics. It integrates with OpenRouter's AI to generate tailored content based on user-specified topics and provides a modern, responsive dashboard with dark mode, a sidebar navigation, and analytics visualizations.

### Features
- **Content Generation**: Generate Instagram Reel ideas, hooks, captions, and hashtags for niches like fashion, fitness, finance, travel, and food using OpenRouter's AI) using OpenRouter AI API.
- **Content History**: View and manage previously generated content stored in a MongoDB database.
- **Analytics Dashboard**: Visualize follower growth and engagement metrics with interactive charts powered by Chart.js.
- **Responsive Design**: A mobile-friendly interface with a collapsible sidebar, dark/light mode toggle, and smooth animations using Tailwind CSS.
- **Secure Authentication**: JWT-based login system for secure user access.

## Prerequisites
- **Node.js**: Version 20.x or later for Node.js.
- **npm**: Version 10.x or later for npm.
- **MongoDB**: Local or cloud-hosted MongoDB instance (e.g., MongoDB Atlas).
- **OpenRouter API Key**: Obtain from [OpenRouter](https://openrouter.ai/keys) for content generation.

## Project Structure

├── client/                    # React frontend│   ├── src/│   │   ├── pages/            # React components for pages (Login, Chat, History, Analytics)│   │   ├── App.js            # Main app component with routing and sidebar│   │   ├── index.js          # Entry point for React│   │   └── index.css         # Global styles with Tailwind CSS├── server/                    # Express backend│   ├── models/               # Mongoose schemas (Content.js)│   ├── routes/               # API routes (e.g., analytics.js)│   ├── server.js             # Main server file│   └── .env                  # Environment variables├── README.md                 # Project documentation└── package.json              # Project dependencies and scripts

## Setup Instructions

### 1. Clone the Repository
git clone https://github.com/your-username/fashion-creator-platform.git
cd fashion-creator-platform

2. Install Dependencies
Backend
cd server
npm install

Frontend
cd client
npm install

3. Configure Environment Variables
Create a .env file in the server/ directory with the following:
OPENROUTER_API_KEY=your_openrouter_api_key
MONGODB_URI=mongodb://localhost:27017/creator-platform
PORT=5000
JWT_SECRET=your_strong_jwt_secret


Replace your_openrouter_api_key with your OpenRouter API key.
Update MONGODB_URI if using a cloud-hosted MongoDB.
Use a secure JWT_SECRET (e.g., a 32-character random string).

4. Run the Application
Start MongoDB
Ensure MongoDB is running locally or accessible via your MONGODB_URI.
Start Backend
cd server
npm run dev

The backend runs on http://localhost:5000.
Start Frontend
In a new terminal:
cd client
npm start

The frontend runs on http://localhost:3000.
5. Access the Application

Open http://localhost:3000 in your browser.
Login with the default credentials:
Username: test
Password: test123



Usage

Login: Use the default credentials to access the dashboard.
Generate Content: Navigate to the "New Chat" section, enter a topic (e.g., "Summer Trends"), select a niche (e.g., "Fashion"), and click "Generate Content".
View History: Check past content in the "Content History" section.
Analyze Metrics: View follower growth and engagement in the "Analytics" section, with an option to export data as JSON.
Toggle Features: Use the sidebar to switch between dark/light mode or pin/unpin the sidebar.

Troubleshooting

401 OpenRouter Error: If content generation fails with a 401 error:
Verify your OPENROUTER_API_KEY in .env.
Ensure the key is active on OpenRouter.
Check model availability (e.g., meta-llama/llama-3.1-8b-instruct:free).
Test the API key with:curl -X POST https://openrouter.ai/api/v1/chat/completions \
  -H "Authorization: Bearer your_openrouter_api_key" \
  -H "Content-Type: application/json" \
  -d '{"model":"meta-llama/llama-3.1-8b-instruct:free","messages":[{"role":"user","content":"Test"}],"max_tokens":50}'




MongoDB Connection Error: Ensure MongoDB is running and MONGODB_URI is correct.
CORS Issues: Confirm the backend CORS is set to allow http://localhost:3000.

Deployment

Note: Deployment instructions are pending as the app has not been successfully deployed yet. Below is a placeholder for future updates.

Placeholder

Backend: Deploy to a platform like Heroku, Render, or Vercel.
Frontend: Deploy to Vercel, Netlify, or GitHub Pages.
Environment Variables: Set .env variables in your hosting platform.
Database: Use a cloud-hosted MongoDB (e.g., MongoDB Atlas).
Update this section with specific steps once deployment is successful.

Demo
A video demonstrating the application running locally is available here.
https://drive.google.com/file/d/1Kp1U1NJsCTWHToMjZuouRXx3kxyWOMYL/view?usp=sharing
Technologies Used

Frontend: React, React Router, Tailwind CSS, Chart.js, Axios
Backend: Node.js, Express, MongoDB, Mongoose, JWT, Axios
API: OpenRouter AI for content generation
Tools: Vite (frontend), Nodemon (backend), MongoDB Community Server

Contributing
Contributions are welcome! Please:

Fork the repository.
Create a feature branch (git checkout -b feature/your-feature).
Commit changes (git commit -m 'Add your feature').
Push to the branch (git push origin feature/your-feature).
Open a Pull Request.

License
This project is licensed under the MIT License.
