# 🎓 Student Management System (MERN Stack)

A complete, production-ready **Student Management System** built with the MERN stack (MongoDB, Express.js, React, Node.js). It provides secure admin authentication and full CRUD functionality for managing student records, with a professional, responsive dashboard.

---
## 🚀 Live Demo

- **Frontend:** https://student-management-system-11.netlify.app
- **Backend API:** https://student-management-system-zo8m.onrender.com

> Note: The backend is hosted on Render's free tier and spins down after inactivity — the first request may take 30-50 seconds to respond while it wakes up.

**Try it yourself:**
- **Email:** admin@example.com
- **Password:** Admin@123

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Features](#-features)
- [Technologies Used](#-technologies-used)
- [Project Structure](#-project-structure)
- [Installation & Setup](#-installation--setup)
- [Environment Variables](#-environment-variables)
- [Seeding Sample Data](#-seeding-sample-data)
- [API Endpoints](#-api-endpoints)
- [Default Login Credentials](#-default-login-credentials)
- [Screenshots](#-screenshots)
- [Future Enhancements](#-future-enhancements)
- [License](#-license)

---

## 📖 Project Overview

This application allows a school/college administrator to log in securely and manage student records — adding, viewing, editing, deleting, searching, sorting, and filtering students by department — through a clean, responsive dashboard interface.

The backend exposes a REST API secured with JWT authentication, and the frontend is a single-page application built with React (Vite) that consumes this API.

---

## ✨ Features

### 🔐 Authentication
- Admin login with email & password
- JWT-based authentication with token expiry
- Passwords hashed using bcrypt
- Protected API routes and frontend routes

### 👨‍🎓 Student Management (CRUD)
- Add new students
- View all students in a paginated table
- Edit existing student records
- Delete students (with confirmation dialog)
- Search students by name, email, or roll number
- Sort by any column (name, roll number, department, etc.)
- Filter by department and year

### 📊 Dashboard
- Total student count
- Students grouped by department (with progress bars)
- Recently added students list
- Summary statistic cards

### 🎨 UI/UX
- Fully responsive design (mobile, tablet, desktop)
- Collapsible sidebar navigation
- Sticky top navbar
- Toast notifications for all actions (success/error)
- Loading spinners during async operations
- Confirmation dialogs before destructive actions
- Client-side and server-side form validation with inline error messages

---

## 🛠 Technologies Used

### Frontend
| Technology | Purpose |
|---|---|
| React (Vite) | UI library & fast build tooling |
| React Router DOM | Client-side routing |
| Axios | HTTP client for API requests |
| Bootstrap 5 | Responsive styling & components |
| React Toastify | Toast notifications |
| Bootstrap Icons | Iconography |

### Backend
| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | Web framework / REST API |
| MongoDB | NoSQL database |
| Mongoose | ODM for MongoDB |
| jsonwebtoken | JWT authentication |
| bcryptjs | Password hashing |
| dotenv | Environment variable management |
| cors | Cross-origin resource sharing |
| morgan | HTTP request logging |
| nodemon | Auto-restart during development |

---

## 📁 Project Structure

```
student-management-system/
├── backend/
│   ├── config/
│   │   └── db.js                  # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js      # Login logic
│   │   └── studentController.js   # Student CRUD + dashboard stats
│   ├── middleware/
│   │   ├── authMiddleware.js      # JWT verification
│   │   └── errorMiddleware.js     # Centralized error handling
│   ├── models/
│   │   ├── Admin.js                # Admin schema (with password hashing)
│   │   └── Student.js              # Student schema
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── studentRoutes.js
│   ├── seed/
│   │   └── seedData.js            # Seeds admin + sample students
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   │   └── favicon.svg
│   ├── src/
│   │   ├── components/
│   │   │   ├── ConfirmDialog.jsx
│   │   │   ├── Layout.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── SearchFilterBar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Spinner.jsx
│   │   │   ├── StatCard.jsx
│   │   │   ├── StudentForm.jsx
│   │   │   └── StudentTable.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── AddStudent.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── EditStudent.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── NotFound.jsx
│   │   │   ├── StudentDetails.jsx
│   │   │   └── StudentList.jsx
│   │   ├── services/
│   │   │   ├── api.js               # Axios instance + interceptors
│   │   │   ├── authService.js
│   │   │   └── studentService.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env.example
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## 🚀 Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher
- [MongoDB](https://www.mongodb.com/try/download/community) running locally, **or** a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster
- npm (comes with Node.js)

### 1. Clone / Extract the Project
Extract the ZIP file, then open a terminal in the `student-management-system` folder.

### 2. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `backend/.env` and set your MongoDB URI and JWT secret (see [Environment Variables](#-environment-variables)).

Seed the database with a default admin account and sample students:

```bash
npm run seed
```

Start the backend server:

```bash
npm run dev
```

The API will run at **http://localhost:5000**.

### 3. Frontend Setup

Open a **new terminal window**:

```bash
cd frontend
npm install
cp .env.example .env
```

Start the frontend dev server:

```bash
npm run dev
```

The app will run at **http://localhost:5173**.

### 4. Log In

Open **http://localhost:5173** in your browser and log in using the credentials printed by the seed script (defaults below).

---

## 🔑 Environment Variables

### Backend (`backend/.env`)

```env
PORT=5000
NODE_ENV=development

# MongoDB Connection String
MONGO_URI=your_mongodb_connection_string

# JWT
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d

# Default Admin (used by seed script)
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=Admin@123

# Frontend URL (for CORS)
CLIENT_URL=http://localhost:5173
```

### Frontend (`frontend/.env`)

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

> ⚠️ Never commit your real `.env` files. Only `.env.example` files are included in this repository.

---

## 🌱 Seeding Sample Data

Running `npm run seed` inside `backend/` will:
1. Create a default admin account (using `ADMIN_EMAIL` / `ADMIN_PASSWORD` from `.env`, or the defaults `admin@example.com` / `Admin@123`).
2. Insert 8 sample student records across various departments (only if the students collection is empty).

You can re-run this safely — it will skip creating duplicates if data already exists.

---

## 📡 API Endpoints

### Auth Routes (`/api/auth`)

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/auth/login` | Public | Log in with email & password, returns JWT |
| GET | `/api/auth/me` | Private | Get logged-in admin profile |

### Student Routes (`/api/students`)

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/students` | Private | Get all students (supports `search`, `department`, `year`, `sortBy`, `order`, `page`, `limit` query params) |
| GET | `/api/students/:id` | Private | Get a single student by ID |
| POST | `/api/students` | Private | Create a new student |
| PUT | `/api/students/:id` | Private | Update an existing student |
| DELETE | `/api/students/:id` | Private | Delete a student |
| GET | `/api/students/stats/dashboard` | Private | Get dashboard statistics |

All **Private** routes require a valid JWT sent as:
```
Authorization: Bearer <token>
```

### Example: Login Request

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"Admin@123"}'
```

### Example: Get Students (with search & filter)

```bash
curl "http://localhost:5000/api/students?search=aarav&department=Computer%20Science&sortBy=name&order=asc" \
  -H "Authorization: Bearer <your_token>"
```

---

## 👤 Default Login Credentials

After running the seed script:

| Field | Value |
|---|---|
| Email | `admin@example.com` |
| Password | `Admin@123` |

*(These can be customized via `ADMIN_EMAIL` / `ADMIN_PASSWORD` in `backend/.env` before seeding.)*

---

## 📸 Screenshots

> Add your own screenshots here after running the application locally.

| Page | Screenshot |
|---|---|
| Login Page | `screenshots/login.png` |
| Dashboard | `screenshots/dashboard.png` |
| Student List | `screenshots/student-list.png` |
| Add/Edit Student | `screenshots/student-form.png` |
| Student Details | `screenshots/student-details.png` |

---

## 🔮 Future Enhancements

- Role-based access control (Super Admin, Teacher, Staff)
- Bulk import/export of students via CSV/Excel
- Student profile photo uploads
- Email notifications (welcome emails, password reset)
- Attendance and grade management modules
- Advanced analytics with charts (Recharts/Chart.js)
- Dark mode support
- Refresh token rotation for enhanced security
- Unit & integration tests (Jest, React Testing Library, Supertest)
- Dockerized deployment (docker-compose for frontend, backend, MongoDB)

---

## 📄 License

This project is provided as-is for educational and demonstration purposes. Feel free to use and modify it for your own learning or portfolio projects.
