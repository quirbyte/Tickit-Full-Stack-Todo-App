# 📝 Tickit - Full Stack Todo App

**Tickit** is a minimalist, high-performance task management application built using the MERN stack. It features a custom-built authentication system, persistent database storage, and a responsive UI.



---

## 🚀 Features

* **Secure Authentication:** User signup and sign-in using **JWT (JSON Web Tokens)** and **Bcrypt** for password hashing.
* **Full CRUD Functionality:** Create, Read, Update (Toggle), and Delete tasks.
* **Global State Management:** Managed using **Recoil** for seamless user sessions.
* **Schema Validation:** Backend data integrity enforced by **Zod**.
* **Persistent Storage:** Data stored in **MongoDB** via Mongoose models.
* **Modern UI:** Styled with **Tailwind CSS** for a clean, professional look.

---

## 🛠️ Tech Stack

- **Frontend:** React.js, Recoil, Tailwind CSS, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Security:** JWT, Bcrypt
- **Validation:** Zod

---

⚙️ Setup Instructions
1. Prerequisites
Node.js installed on your local machine.

A MongoDB Atlas connection string.

2. Backend Setup
Navigate to the backend folder:

Bash

cd backend
Install dependencies:

Bash

npm install
Create a .env file in the backend root and add:

Code snippet

PORT=3000
MONGO_URL=your_mongodb_uri_here
JWT_SECRET=your_unique_jwt_secret
Start the server:

Bash

node index.js
3. Frontend Setup
Navigate to the frontend folder:

Bash

cd frontend
Install dependencies:

Bash

npm install
Start the development server:

Bash

npm run dev
🛡️ API Endpoints
User Routes (/user)
POST /user/signup - Register a new user (Validated by Zod).

POST /user/signin - Authenticate user and return JWT.

Todo Routes (/todo)
GET /todo - Fetch all todos belonging to the authenticated user.

POST /todo - Create a new todo item.

PUT /todo/:id - Toggle the completion status of a todo.

DELETE /todo/:id - Remove a specific todo.

---

## 🤝 Contributing

This project was developed as part of the 100xDevs Cohort 3.0 assignments. Feel free to fork, explore, and improve the codebase!
