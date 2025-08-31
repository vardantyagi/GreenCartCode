# 🌱 GreenCart

![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)

GreenCart is a **MERN stack e-commerce application** built with **MongoDB, Express, React, and Node.js**.  
It allows users to browse products, manage their cart, and place orders securely.  
The app includes **JWT authentication**, **Cloudinary integration** for product images, and a clean user interface.

---

## ✨ Features

- 🔐 **Authentication & Authorization**
  - Secure login/signup using **JWT**
  - Role-based access for users/admin

- 🛒 **E-commerce Functionality**
  - Add, remove, and update items in cart
  - Browse products with images hosted on **Cloudinary**
  - Order management

- 📦 **Admin Features**
  - Add/edit/delete products
  - View user orders

- 🌐 **Responsive UI**
  - Built with **React + Tailwind CSS**

---

## 🛠️ Tech Stack

**Frontend:** React, Redux Toolkit, Tailwind CSS  
**Backend:** Node.js, Express.js  
**Database:** MongoDB Atlas  
**Authentication:** JWT (JSON Web Token)  
**Image Storage:** Cloudinary  
**Other Tools:** Postman, Git, GitHub  

---

## 🚀 Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/vardantyagi/greencart.git
cd greencart

2️⃣ Install dependencies

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

3️⃣ Setup environment variables

Create a .env file inside backend folder with:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

4️⃣ Run the app
# Run backend (default: http://localhost:3000)
cd backend
npm start

# Run frontend (default: http://localhost:5173)
cd ../frontend
npm start