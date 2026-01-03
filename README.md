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
## 💻 Dashboard Views

- **Login Page:**
  
<img width="1915" height="1011" alt="Screenshot 2026-01-03 130912" src="https://github.com/user-attachments/assets/71d3777d-cbc9-4cd0-8871-ece06d0bc548" />

- **User View:**
  <img width="1899" height="1011" alt="Screenshot 2026-01-03 131157" src="https://github.com/user-attachments/assets/e96f5a84-2aa6-4e1e-827b-8884a81bbdf1" />


---

## ⚙️ Setup Instructions
1. Prerequisites
     Node.js installed on your local machine.
     MongoDB Atlas connection string.

2. Backend Setup
  Navigate to the backend folder:
   ```
    bash
    
    cd backend
   ```
    
  Install dependencies:
```
bash

npm install
```
  Create a .env file in the backend root and add:

  Code snippet
```
PORT=3000
MONGO_URL=your_mongodb_uri_here
JWT_SECRET=your_unique_jwt_secret
```
  Start the server:
```
bash

node index.js
```
3. Frontend Setup
Navigate to the frontend folder:
```
bash

cd frontend
```
Install dependencies:
```
bash

npm install
```
Start the development server:
```
bash

npm run dev
```
---

## 🤝 Contributing

This project was developed as part of the 100xDevs Cohort 3.0 assignments. Feel free to fork, explore, and improve the codebase!
