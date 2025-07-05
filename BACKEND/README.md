# 🛠️ URL Shortener – Backend

This is the **backend** for the URL Shortener application, built using **Node.js**, **Express**, and **MongoDB**. It provides RESTful API endpoints for user authentication, URL shortening, redirection, and click tracking.

## 🧰 Tech Stack

- **Node.js** – JavaScript runtime
- **Express** – Web framework
- **MongoDB + Mongoose** – Database & ODM
- **JWT (jsonwebtoken)** – Authentication tokens
- **bcryptjs** – Password hashing
- **Cookie-parser** – Secure cookie management
- **Express Router** – Modular route handling
- **CORS** – Cross-origin resource sharing
- **dotenv** – Environment variable management

---

## 🧑‍💻 Features

- 🔐 **User Authentication**
  - Sign up & login using email/password
  - Secure JWT-based sessions via cookies
- ✂️ **URL Shortening**
  - Authenticated users can shorten long URLs
- 📈 **Click Tracking**
  - Each short URL records how many times it’s accessed
- 🌐 **Redirection**
  - Short URLs redirect to their corresponding full URLs
- 📁 **Modular Routing**
  - Routes are organized by responsibility (auth, user, url)

---

## 🌍 Live API

📡 [Deployed Backend](<your-live-backend-link>)

---

## 📁 Repository

📦 [Backend GitHub Repo](<your-backend-repo-link>)  
🧪 [Frontend GitHub Repo](<your-frontend-repo-link>)

---

## 📄 Getting Started

```bash
# Clone the repo
git clone <your-backend-repo-link>
cd backend

# Install dependencies
npm install

# Run the server
npx nodemon  app.js

| Method | Route              | Description                     |
| ------ | ------------------ | ------------------------------- |
| POST   | `/api/auth/signup` | Register a new user             |
| POST   | `/api/auth/login`  | Authenticate user               |
| POST   | `/api/user/urls`   | Get all URLs for logged-in user |
| POST   | `/api/creat`       | Create a short URL              |
| GET    | `/:id`             | Redirect to full URL            |



🧑‍💻 Author
👤 Aditya Kumar Maurya
🔗 https://www.linkedin.com/in/aditya-kumar-maurya-5a6954234/