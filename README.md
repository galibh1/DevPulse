# DevPulse 🚀

DevPulse is a lightweight and scalable issue tracking and project management backend system built for developers to manage projects, tasks, and bugs efficiently using clean REST APIs and secure authentication.

---

## 🌐 Live URL

- Repository: https://github.com/galibh1/DevPulse  
- Live Demo: *(Add deployed URL here if available)*

---

## ✨ Features

- User registration and login system
- JWT-based authentication and authorization
- Create, update, delete issues
- Assign issues to users
- Track issue status (Open, In Progress, Closed)
- Priority levels (Low, Medium, High)
- Project-based issue management
- Centralized error handling middleware
- RESTful API design
- PostgreSQL database integration
- Scalable and modular backend architecture

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- JWT (Authentication)
- Prisma / TypeORM (depending on implementation)
- dotenv

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/galibh1/DevPulse.git
cd DevPulse
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Create a `.env` file in the root directory and add:

```env
PORT=8000
DATABASE_URL=your_postgres_connection_url
JWT_SECRET=your_secret_key
```

---



---

### 4. Start the development server

```bash
npm run dev
```

Server will run at:

```
http://localhost:8000
```

---

## 📡 API Endpoints

### 🔐 Auth Routes

| Method | Endpoint       | Description   |
| ------ | -------------- | ------------- |
| POST   | /auth/register | Register user |
| POST   | /auth/login    | Login user    |

---

### 👤 User Routes

| Method | Endpoint  | Description      |
| ------ | --------- | ---------------- |
| GET    | /users/me | Get current user |

---

### 📁 Project Routes

| Method | Endpoint      | Description       |
| ------ | ------------- | ----------------- |
| GET    | /projects     | Get all projects  |
| POST   | /projects     | Create project    |
| GET    | /projects/:id | Get project by ID |
| PUT    | /projects/:id | Update project    |
| DELETE | /projects/:id | Delete project    |

---

### 📌 Issue Routes

| Method | Endpoint    | Description     |
| ------ | ----------- | --------------- |
| GET    | /issues     | Get all issues  |
| POST   | /issues     | Create issue    |
| GET    | /issues/:id | Get issue by ID |
| PUT    | /issues/:id | Update issue    |
| DELETE | /issues/:id | Delete issue    |

---

## 🗄️ Database Schema Summary

### User
- id (UUID)
- name
- email (unique)
- password (hashed)
- createdAt
- updatedAt

### Project
- id
- title
- description
- userId (owner)
- createdAt
- updatedAt

### Issue
- id
- title
- description
- status (OPEN | IN_PROGRESS | CLOSED)
- priority (LOW | MEDIUM | HIGH)
- projectId
- assignedTo
- createdAt
- updatedAt

---

## 🚀 Future Improvements

- Frontend dashboard using React / Next.js
- Role-based access control (Admin / Developer / Viewer)
- Issue comments system
- File attachments
- Real-time updates with WebSockets
- Advanced filtering and search

---

## 👨‍💻 Author

**Galib Hasan**

- GitHub: https://github.com/galibh1
