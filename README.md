<div align="center">

# 👕 **Clothica — Backend**

### _REST API for the Clothica clothing marketplace_

<img src="https://img.shields.io/badge/license-Apache_2.0-green" />
<img src="https://img.shields.io/badge/language-JavaScript-yellow" />
<img src="https://img.shields.io/badge/framework-Node.js-339933" />
<img src="https://img.shields.io/badge/database-MongoDB-47A248" />
<img src="https://img.shields.io/badge/ORM-Mongoose-824fff" />
<img src="https://img.shields.io/badge/auth-Sessions-blue" />
<img src="https://img.shields.io/badge/docs-Swagger-red" />

---

### 🔗 **Frontend Repository:**

👉 https://github.com/HannaAssaf/clothica-team-project-frontend

</div>

---

## 📍 **About the Project**

**Clothica Backend** is the server-side REST API for the Clothica clothing marketplace.
It handles the business logic, database interactions, authentication, and API endpoints for products, users, orders, reviews, and categories.

The backend is built using **Node.js + Express**, **MongoDB**, and **Mongoose**.
Sessions are stored in MongoDB for authentication. Swagger documentation is available at `/docs`.

---

## ✨ **Features**

| Feature                        | Description                                                |
| ------------------------------ | ---------------------------------------------------------- |
| 🔑 Authentication              | User registration and login via sessions stored in MongoDB |
| 🧍 Users                       | CRUD operations for user profiles                          |
| 👕 Products                    | Create, read, update, delete products                      |
| 📦 Orders                      | Create and view orders                                     |
| ❤️ Reviews                     | Add and read product reviews                               |
| 🏷 Categories                   | Organize products by categories                            |
| 📊 Validation & Error Handling | Request validation and consistent error responses          |

---

## 🏗 **Tech Stack**

| Category       | Technology                 |
| -------------- | -------------------------- |
| Framework      | **Node.js + Express**      |
| Language       | **TypeScript**             |
| Database       | **MongoDB**                |
| ORM / ODM      | **Mongoose**               |
| Authentication | Sessions stored in MongoDB |
| Documentation  | **Swagger** (`/docs`)      |
| Code Quality   | ESLint, Prettier           |

---

## 📂 **Project Structure**

```text
📦 src
├── constants/       # Project-wide constants
├── controllers/     # Route handlers
├── db/              # Database connection
├── middleware/      # Middleware for auth, error handling
├── models/          # Mongoose models
├── routes/          # API route definitions
├── services/        # Business logic
├── templates/       # Email / message templates
├── utils/           # Helper functions
├── validations/     # Request validations
└── server.js        # Entry point
.env.example         # Example environment variables
```

### **.env.example**

```
PORT=
MONGO_URL=
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=
SMTP_FROM=
JWT_SECRET=
FRONTEND_DOMAIN=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

---

## 🔗 **API Documentation**

Swagger documentation is available at:

```
http://localhost:<PORT>/docs
```

It contains all endpoints for users, goods, orders, reviews, and categories.

---

## 🚀 **Getting Started**

### **1️⃣ Install dependencies**

```bash
npm install
```

---

### **2️⃣ Set up environment variables**

- Rename `.env.example` to `.env`
- Configure variables such as `PORT`, `MONGO_URL`, `JWT_SECRET`, etc.

---

### **3️⃣ Run in development**

```bash
npm run dev
```

---

### **4️⃣ Build and run for production**

```bash
npm run build
npm run start
```

---

## 🧪 **Testing**

There are currently no automated tests in the backend.

---

## 🧩 **Contribution**

Contributions are welcome!

1. Fork the repository
2. Create a new branch (`feature/your-feature` or `bugfix/issue`)
3. Make changes
4. Submit a pull request with a description of your changes

Please follow the existing code structure and style.

---

## 📜 **License**

This project is licensed under the **Apache 2.0 License**.

---

<div align="center">

💼 _Built with ❤️ by FlowDevs_

</div>
