# FinacPlus Software Intern – Coding Assignment  
**Date:** 21 Nov 2025
**Candidate:** Vikash Gupta  

This repository contains solutions to the FinacPlus Software Internship Coding Task Challenge.  
It includes four problems: two coding challenges, one database/metadata design question, and one high-level system design problem.

---

# ✔️ **1. Special Cipher (Caesar Cipher + RLE Encoding)**

### **Problem**
Write a function that performs:
1. Caesar Cipher rotation  
2. Run-Length Encoding (RLE)

**Input:**  
specialCipher("AABCCC", 3)
**Output:**  
D2EF3

### **Approach**
- First rotate each alphabet by `rot` positions.  
- Then compress repeating characters using RLE.
---
# ✔️ **2. Optimized 6-Unit Denomination Finder**

This script finds the most optimal set of **6 currency units** (denominations) such that
the **average number of coins** required to form all values from **1 to 99** is minimized.

### 🔍 Approach (Short)
- Always include `1` (to guarantee all values can be formed).
- Use Dynamic Programming to compute the minimum coins needed for values `1–99`.
- Try multiple combinations of 6 denominations.
- Compute average coins required for each set.
- Choose the set with the lowest average.
```bash
Best Denomination Set: (1, 3, 8, 15, 40, 50)
Average Coins: 3.21
```

---
# 🛒 MERN E-Commerce Platform

A fully functional **Amazon-style eCommerce** system built using the MERN Stack with Admin Dashboard, JWT Authentication, Product Management, Orders, Cart, Coupons, Inventory Tracking, and Swagger API documentation.

---

## 🚀 Features

### 👤 User
- Create account & Login (JWT)
- Browse products
- Search & filter (brand, price, rating)
- Add to cart / remove / update quantity
- Place orders & track delivery status
- Apply discount coupons

### 🛠 Admin
- Admin login + Protected Routes
- Create / Update / Delete products
- Manage inventory (stock update)
- Manage orders & update statuses
- Manage categories, brands, and coupons
- Upload images (Cloudinary or AWS S3)

### 💾 Backend System
- REST API using Node.js + Express
- MongoDB indexing strategy for performance
- Swagger API documentation included

---

## 🧰 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, Axios, React Router, Context API |
| Backend | Node.js, Express, JWT |
| Database | MongoDB + Mongoose |
| Storage | Cloudinary or AWS S3 |
| Documentation | Swagger UI |

---

## 📦 Installation

### 1️⃣ Clone the Project

```bash
git clone https://github.com/vik802207/Finacplus-Backend-Assignment.git
cd Scenario

2️⃣ Backend Setup
cd backend
npm install


Create .env file:

PORT=5000
MONGO_URI=YOUR_MONGODB_URL
JWT_SECRET=YOUR_SECRET_KEY
CLOUDINARY_CLOUD_NAME=xxxx
CLOUDINARY_API_KEY=xxxx
CLOUDINARY_API_SECRET=xxxx


Start server:

npm run dev


Swagger UI will be available at:

http://localhost:5000/api-docs

3️⃣ Frontend Setup
cd ../frontend
npm install
npm run dev


Frontend will run at:

http://localhost:5173

📁 Project Structure
mern-ecommerce/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── swagger.js
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── context/
│   │   ├── api.js
│   │   └── App.jsx
│
└── README.md

🔑 API Authentication

Most protected routes require this header:

Authorization: Bearer <your_token_here>

🧪 Testing with Postman

Use these sample Postman requests:

Method	Endpoint	Description
POST	/api/auth/register	Register user/admin
POST	/api/auth/login	Login and get JWT
POST	/api/admin/products	Add product (Admin only)
GET	/api/products	Fetch products
POST	/api/cart	Add to cart
POST	/api/orders	Place an order
```
📸 Screenshots 

![App Screenshot](img/Screenshot%20(911).png)
![App Screenshot](img/Screenshot%20(912).png)
![App Screenshot](img/Screenshot%20(913).png)
![App Screenshot](img/Screenshot%20(914).png)
![App Screenshot](img/Screenshot%20(915).png)
![App Screenshot](img/Screenshot%20(916).png)
![App Screenshot](img/Screenshot%20(917).png)
![App Screenshot](img/Screenshot%20(918).png)
![App Screenshot](img/Screenshot%20(919).png)
![App Screenshot](img/Screenshot%20(920).png)
![App Screenshot](img/Screenshot%20(921).png)
![App Screenshot](img/Screenshot%20(922).png)
![App Screenshot](img/Screenshot%20(923).png)
![App Screenshot](img/Screenshot%20(924).png)
![App Screenshot](img/Screenshot%20(925).png)
![App Screenshot](img/Screenshot%20(926).png)
![App Screenshot](img/Screenshot%20(927).png)
![App Screenshot](img/Screenshot%20(928).png)
![App Screenshot](img/Screenshot%20(929).png)
![App Screenshot](img/Screenshot%20(930).png)
![App Screenshot](img/Screenshot%20(931).png)
![App Screenshot](img/Screenshot%20(932).png)



# Asset View Product – High Level System Design

## 📌 Problem Statement
Design a reliable, scalable platform for managing **real-time asset portfolios** for 250 users.

### Requirements:
- 250 total users  
- Each user has **one or more accounts**  
- Each account contains **assets** (stocks or mutual funds)  
- Users should see their portfolio **in real time**  
- Price data comes from **multiple external sources**  
- **Immediate** updates whenever a source sends new prices  
- System must **refresh all data every 10 minutes**  
- System must be **scalable**, **fault-tolerant**, and **accurate**

---

## 🎯 Goal
Build a platform that can:
- Ingest asset prices from various sources  
- Recalculate user portfolios instantly  
- Store portfolio snapshots  
- Push real-time updates to users  
- Maintain consistency with a scheduled 10-minute refresh  

---

## 🏗️ High Level Architecture


---

## 🔧 **Key Components Explained**

### **1. Price Ingestion Layer**
- Accepts real-time price updates (REST / WebSocket)
- Supports multiple sources
- Performs authentication and validation

### **2. Price Normalizer**
- Converts all external data formats into a single consistent format  
- Adds timestamps, source ID, and removes duplicates

### **3. Message Queue (Kafka / Redis Streams)**
- Decouples ingestion from processing  
- Ensures reliability even if services go down  
- Allows horizontal scaling  

### **4. Stream Processor**
- Reads price events from the queue  
- Triggers portfolio recalculation for affected users

### **5. Portfolio Calculation Service**
- Business logic:
  - Fetch user accounts holding that asset  
  - Recalculate portfolio values  
  - Store to database  
  - Update Redis cache  
  - Publish update event  

### **6. MongoDB / SQL Database**
Stores:
- Users  
- Accounts  
- Holdings  
- Portfolio snapshots  
- Historical values  

### **7. Redis Cache**
- Keeps latest portfolio snapshot  
- Instant response for UI  
- Supports real-time push notifications

### **8. WebSocket Gateway**
- Pushes updated portfolio values to connected users instantly  

### **9. 10-Minute Reconciliation Job**
- Rebuilds all portfolios  
- Ensures no missed events  
- Keeps system consistent  

---

## 🚀 Why This Design Works

### ✔ Real-time updates  
Streaming + WebSockets give sub-second latency.

### ✔ Scalable  
All services are stateless and can scale horizontally.

### ✔ Reliable  
Queues and caching ensure zero data loss even on failures.

### ✔ Accurate  
Reconciliation job rebuilds portfolios every 10 minutes.

### ✔ Extensible  
New price sources or asset types can be added easily.

---

## 📚 Technologies (Suggested)
- **Backend**: Node.js / Java / Go  
- **Queue**: Kafka / Redis Streams  
- **Database**: MongoDB / PostgreSQL  
- **Cache**: Redis  
- **Real-Time**: Socket.io / WebSocket  
- **Deployment**: Docker + Kubernetes  
- **Monitoring**: Grafana + Prometheus  

---

## 🧩 Summary
This high-level design allows the platform to:
- Process frequent price updates  
- Scale easily with more users or assets  
- Provide accurate and real-time portfolio values  
- Maintain financial correctness  

---

If you want, I can also add:  
✅ A diagram image (PNG/SVG)  
✅ A mermaid diagram  
✅ Database schema  
✅ Detailed component design  
Just tell me!

