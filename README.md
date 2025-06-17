# Fashion Creator Platform

A web application for generating social media content ideas tailored to specific niches (e.g., fashion, finance) using AI. The platform features a **React frontend** with a **glassmorphism UI** and a **Node.js/Express backend** integrated with **MongoDB** and **OpenRouter's API**.
---

## 📚 Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Usage](#usage)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

- 🎥 **Content Generation:** Create social media content ideas like **reel ideas, hooks, captions, hashtags** using **OpenRouter's AI**.
- 🔐 **User Authentication:** Simple **JWT-based** login system.
- 📊 **Analytics Dashboard:** View mock analytics data for followers, engagement, and posting times.
- 🖼️ **Responsive UI:** Modern **glassmorphism** and **gradient-themed** design using **Tailwind CSS**.
- 🗂️ **Privacy First:** Generated content is not stored in the database or any persistent storage.
- 🔜 **Planned Feature:** History tracking (currently not implemented).

---

## ⚙️ Technologies Used

| Layer      | Stack                                      |
|------------|--------------------------------------------|
| **Frontend** | React, Tailwind CSS, Axios                 |
| **Backend**  | Node.js, Express, Mongoose, JWT, Axios     |
| **Database** | MongoDB                                    |
| **AI API**   | OpenRouter (e.g., Llama 3.1 8B Instruct)   |
| **Config**   | dotenv for environment variables           |

---

## 📋 Prerequisites

- **Node.js**: v16 or higher
- **MongoDB**: Local instance (v4.4+) or [MongoDB Atlas](https://www.mongodb.com/atlas/database)
- **OpenRouter API Key**: [Get it here](https://openrouter.ai/)
- **Git**: For cloning the repository
- **NPM**: Comes with Node.js

---

## 💻 Installation

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/fashion-creator-platform.git
cd fashion-creator-platform
