# Mini CRM — Client Lead Management System

A full-stack Customer Relationship Management (CRM) web application built to manage client leads generated from website contact forms. Built as part of the Full Stack Web Development internship (Task 2).

## 🔗 Live Demo

👉 **Frontend:** https://animated-moonbeam-4ee52b.netlify.app/
👉 **Backend API:** https://mini-crm-backend-b8p6.onrender.com

**Demo credentials:**
- Username: `admin`
- Password: `admin123`

> Note: The backend is hosted on Render's free tier, so it may take 30–60 seconds to wake up on the first request.

---

## 📌 About the Project

This Mini CRM allows a business owner or admin to manage incoming client leads from start to finish — storing lead details, tracking their status through the sales pipeline, adding follow-up notes, and viewing simple analytics, all behind a secure admin login.

---

## ✅ Features

- **Secure Admin Login** — protected dashboard access
- **Lead Management (CRUD)** — add, view, update, and delete leads
- **Lead Status Tracking** — New → Contacted → Converted pipeline
- **Notes System** — add and edit follow-up notes for each lead
- **Analytics Dashboard** — view total leads and breakdown by status
- **Persistent Storage** — all data stored in MongoDB Atlas
- **Responsive Dark UI** — clean, modern dashboard interface

---

## 🛠️ Tech Stack

| Layer      | Technology                          |
|------------|--------------------------------------|
| Frontend   | React (Vite), CSS                    |
| Backend    | Node.js, Express.js                  |
| Database   | MongoDB Atlas (Mongoose ODM)         |
| Auth       | Custom admin login                   |
| Deployment | Netlify (frontend), Render (backend) |

---

## 📁 Project Structure

```
mini-crm/
├── backend/
│   ├── models/
│   │   └── Lead.js          # Mongoose schema for leads
│   ├── routes/
│   │   ├── auth.js          # Admin login route
│   │   └── leads.js         # CRUD routes for leads
│   ├── index.js             # Express server entry point
│   ├── .env                 # Environment variables (not committed)
│   └── package.json
├── src/
│   ├── App.jsx               # Main React component (login + dashboard)
│   ├── App.css                # Styling
│   └── main.jsx
├── package.json
└── README.md
```

---

## 🚀 Setup & Installation

### Prerequisites
- Node.js (v18 or higher)
- A free MongoDB Atlas account (https://www.mongodb.com/cloud/atlas/register)

### 1. Clone the repository
```bash
git clone https://github.com/adxthyaks18/FUTURE_FS_02.git
cd FUTURE_FS_02
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:
```
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_secret_key
```

Start the backend:
```bash
node index.js
```
Server runs on `http://localhost:5000`

### 3. Frontend Setup
Open a new terminal in the project root:
```bash
npm install
npm run dev
```
Frontend runs on `http://localhost:5173`

> Update the `API` constant at the top of `src/App.jsx` to point to `http://localhost:5000/api` for local development, or your deployed backend URL for production.

---

## 🌐 Deployment

- **Backend** is deployed on Render as a Node.js Web Service, with environment variables (`MONGO_URI`, `JWT_SECRET`) configured in the Render dashboard.
- **Frontend** is deployed on Netlify, built using `npm run build` with the `dist` folder as the publish directory.

---

## 📊 API Endpoints

| Method | Endpoint              | Description           |
|--------|------------------------|------------------------|
| GET    | `/api/leads`           | Get all leads          |
| POST   | `/api/leads`            | Create a new lead      |
| PUT    | `/api/leads/:id`        | Update a lead          |
| DELETE | `/api/leads/:id`        | Delete a lead           |
| POST   | `/api/auth/login`       | Admin login             |

---

## 👨‍💻 Author

**Adithya K S**
B.Tech Computer Science Engineering
St. Joseph's College of Engineering and Technology

- GitHub: @adxthyaks18 (https://github.com/adxthyaks18)
- LinkedIn: Adithya K S (https://www.linkedin.com/in/adithya-k-s-4396a437a)

---

## 📄 License

This project is open source and available under the MIT License.
