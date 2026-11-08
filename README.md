# 🛒 MERN E-Commerce Application

A production-ready **Full Stack E-Commerce Web Application** built using the **MERN Stack (MongoDB, Express, React, Node.js)** with secure **Authentication & Authorization**, product management, cart system, and order processing.

---

## 🚀 Tech Stack

### Frontend
- React.js
- Redux Toolkit
- React Router DOM
- Axios
- Tailwind

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- bcrypt.js
- Cookie-parser

### Cloud Services
- Cloudinary (Image Upload)

---

# 🔐 Authentication & Authorization

This project implements secure authentication and role-based authorization.

### ✅ Authentication Features
- User Registration
- User Login
- Password Hashing using **bcrypt**
- JWT Token Generation
- Access Token stored securely
- Protected Routes (Frontend + Backend)
- Logout functionality

### 🔒 Authorization Features
- Role-Based Access Control (RBAC)
- Admin-only routes for:
  - Create Product
  - Update Product
  - Delete Product
  - View All Orders
- Middleware-based route protection

---

# 🛍️ Features

### 👤 User Features
- Register / Login
- Browse Products
- View Product Details
- Add to Cart
- Remove from Cart
- Place Orders
- View Order History

### 👑 Admin Features
- Create Product
- Edit Product
- Delete Product
- Manage Orders
- Upload Product Images (Cloudinary)

---

# 📂 Project Structure

```
mern-ecommerce/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── features/
│   │   ├── pages/
│   │   ├── components/
│   │   └── services/
│   └── main.jsx
│
└── README.md
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

---

## 2️⃣ Backend Setup

```bash
cd backend
npm install
```

### Create `.env` file inside backend:

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Start backend:

```bash
npm run dev
```

---

## 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# 🔐 Authentication Flow

1. User registers
2. Password is hashed using bcrypt
3. JWT token is generated on login
4. Token is sent in Authorization header
5. Backend middleware verifies token
6. Role-based middleware checks admin access
7. Protected routes are granted or denied

---

# 🛡️ Security Practices

- Password hashing
- JWT token verification
- Protected API routes
- Admin role middleware
- Environment variables for sensitive data
- CORS configuration
- Secure HTTP-only cookies (if implemented)

---

# 📦 API Endpoints (Sample)

### Auth Routes
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/profile

### Product Routes
- GET /api/products
- GET /api/products/:id
- POST /api/products (Admin)
- PUT /api/products/:id (Admin)
- DELETE /api/products/:id (Admin)

### Order Routes
- POST /api/orders
- GET /api/orders/my-orders
- GET /api/orders (Admin)

---

# 🌍 Deployment

You can deploy using:
- Render
- Railway
- Vercel (Frontend)
- MongoDB Atlas

Make sure:
- Environment variables are added in hosting dashboard
- Do NOT expose `.env` file
- Use production build for frontend

---

# 📸 Screenshots (Optional Section)

Add screenshots here:

```
![Home Page](screenshot1.png)
![Product Page](screenshot2.png)
```

---

# 📌 Future Improvements

- Payment Gateway Integration (Stripe/Razorpay)
- Wishlist Feature
- Product Reviews & Ratings
- Pagination & Filtering
- Refresh Token Implementation
- Docker Support

---
