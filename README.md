# Fashion Creator Platform

## 📌 Overview

The Fashion Creator Platform is a full-stack web application designed to assist content creators in generating Instagram Reels content ideas, tracking generated content, and analyzing performance metrics. It leverages OpenRouter's AI for content generation and provides a modern, responsive dashboard experience.

---

## ✨ Features

- **Content Generation**  
  Generate Instagram Reel ideas, hooks, captions, and hashtags based on niche and topic using OpenRouter AI API.

- **Content History**  
  View and manage previously generated content stored in MongoDB.

- **Analytics Dashboard**  
  Track follower growth and engagement metrics using interactive visualizations (Chart.js).

- **Responsive UI**  
  Mobile-friendly layout with collapsible sidebar, dark/light mode, and Tailwind-powered animations.

- **Secure Authentication**  
  JWT-based authentication for protected user sessions.

---

## ⚙️ Prerequisites

- Node.js v20.x or later  
- npm v10.x or later  
- MongoDB (local or cloud-based via MongoDB Atlas)  
- OpenRouter API Key ([Get API key](https://openrouter.ai/keys))

---

## 📁 Project Structure

fashion-creator-platform/
├── client/ # React frontend
│ ├── src/
│ │ ├── pages/ # Pages: Login, Chat, History, Analytics
│ │ ├── App.js # Main app with routing and layout
│ │ ├── index.js # Entry point
│ │ └── index.css # Tailwind CSS styles
│
├── server/ # Express backend
│ ├── models/ # Mongoose schemas (e.g., Content.js)
│ ├── routes/ # API endpoints
│ ├── server.js # Main server file
│ └── .env # Environment variables
│
├── README.md # Documentation
└── package.json # Project dependencies

## 🚀 Setup Instructions

### 1. Clone the Repository


git clone https://github.com/your-username/fashion-creator-platform.git

cd fashion-creator-platform
### 2. Install Dependencies
Backend:


cd server
npm install
Frontend:


cd ../client
npm install
### 3. Configure Environment Variables
Create a .env file in the server/ directory:


OPENROUTER_API_KEY=your_openrouter_api_key
MONGODB_URI=mongodb://localhost:27017/creator-platform
PORT=5000
JWT_SECRET=your_strong_jwt_secret
Replace your_openrouter_api_key with your actual key.

Update MONGODB_URI if using a cloud-based MongoDB service.

Use a secure, random string for JWT_SECRET.

### 4. Run the Application
Start MongoDB:

Ensure MongoDB is running locally or remotely.

Start Backend:

cd server
npm run dev
Start Frontend:
In a separate terminal:

cd client
npm start
The frontend runs at http://localhost:3000

The backend runs at http://localhost:5000

## 🧪 Usage Guide
### Login
Use the default credentials:

#### Username: test

#### Password: test123

Generate Content
Go to "New Chat"

Enter a topic (e.g., "Summer Trends")

Select a niche (e.g., Fashion)

Click "Generate Content"

### View History
Navigate to "Content History" to view and manage previous generations.

### Analytics
View follower growth and engagement trends.

Export analytics data as JSON.

### Interface Options
Switch between dark/light modes.

Pin/unpin sidebar navigation.

## 🚧 Deployment (Coming Soon)
Deployment is not finalized. Here's a placeholder plan:

Backend: Host on Heroku, Render, or Vercel

Frontend: Deploy via Vercel, Netlify, or GitHub Pages

Database: Use MongoDB Atlas

Environment Variables: Set in hosting platform

## 📹 Demo
Watch the demo video here: https://drive.google.com/file/d/1Kp1U1NJsCTWHToMjZuouRXx3kxyWOMYL/view?usp=sharing
View on Google Drive

## 🛠️ Technologies Used
### Frontend
- React

- React Router

- Tailwind CSS

- Chart.js

- Axios

### Backend
- Node.js

- Express

- MongoDB + Mongoose

- JWT (Authentication)

- Axios

### Tools
- Vite (Frontend build tool)

- Nodemon (Backend)

- MongoDB Community Server

### AI Integration
OpenRouter AI for content generation

### 🤝 Contributing
We welcome contributions!

Fork the repo

Create a feature branch:

git checkout -b feature/your-feature
Commit changes:

git commit -m "Add your feature"
Push to the branch:


git push origin feature/your-feature
Open a Pull Request

### 📄 License
This project is licensed under the MIT License.
