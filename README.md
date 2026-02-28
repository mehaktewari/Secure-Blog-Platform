# 🛡 Secure Blog Platform

A production-ready full-stack blog platform built with **Next.js, NestJS, PostgreSQL (Neon), Redis, and BullMQ**, featuring authentication, background jobs, rate limiting, and modern deployment architecture.

---

## 🚀 Live Demo

* **Frontend (Vercel):** [https://secure-blog-platform-rho.vercel.app/](https://secure-blog-platform-rho.vercel.app/)
* **Backend (Render):** [https://secure-blog-platform-0rpi.onrender.com/](https://secure-blog-platform-0rpi.onrender.com/)

---

# 🏗 Architecture Overview

## Frontend

* **Framework:** Next.js (App Router)
* **Styling:** Tailwind CSS
* **Authentication:** JWT stored in localStorage
* **API Communication:** Axios with request interceptors
* **Deployment:** Vercel

## Backend

* **Framework:** NestJS (modular architecture)
* **Database:** PostgreSQL (Neon)
* **ORM:** Prisma
* **Authentication:** JWT + Passport
* **Rate Limiting:** Throttler module
* **Background Jobs:** BullMQ + Redis
* **Deployment:** Render

## Infrastructure

```
Client (Next.js)
       ↓
API (NestJS on Render)
       ↓
PostgreSQL (Neon)
       ↓
Redis (Render Key-Value)
```

---

# ✨ Features

* 🔐 JWT Authentication (Register/Login/Protected Routes)
* 📝 Create, Update, Delete Blogs
* ❤️ Like / Unlike System
* 💬 Comment System
* 🚀 Background Job for Blog Summary (BullMQ)
* ⛔ Rate Limiting
* 🌙 Dark Mode
* 📦 Production Deployment (Vercel + Render)
* 🛢 PostgreSQL (Neon Cloud)
* 🔁 Redis for Queues

---

# 📂 Project Structure

```
secure-blog-platform/
│
├── frontend/        # Next.js App
│   ├── app/
│   ├── components/
│   ├── lib/
│
├── backend/         # NestJS API
│   ├── src/
│   │   ├── auth/
│   │   ├── blog/
│   │   ├── jobs/
│   │   ├── prisma/
│   │   ├── config/
```

---

# 🧠 Key Architecture Decisions

## 1️⃣ Separate Frontend & Backend

**Why?**

* Clear separation of concerns
* Independent scaling
* Easier CI/CD

Tradeoff:

* Slightly more deployment complexity
* Need to manage CORS & environment variables

---

## 2️⃣ NestJS Instead of Express

**Why?**

* Modular architecture
* Dependency injection
* Built-in guards & interceptors
* Enterprise-ready

Tradeoff:

* Slightly steeper learning curve

---

## 3️⃣ Prisma ORM

**Why?**

* Type-safe queries
* Excellent DX
* Migration system

Tradeoff:

* Adds abstraction layer

---

## 4️⃣ Redis + BullMQ for Background Jobs

Used for:

* Auto-generating blog summaries
* Scalable async processing

Why background jobs?

* Prevents blocking request-response cycle
* Improves performance
* Prepares system for heavy tasks

Tradeoff:

* Adds infrastructure dependency (Redis)

---

## 5️⃣ JWT Authentication (Stateless)

Why?

* Scalable (no server session storage)
* Works well with microservices

Tradeoff:

* Token revocation is harder
* Requires careful expiration handling

---

# ⚖ Tradeoffs Considered

| Decision      | Benefit               | Tradeoff                     |
| ------------- | --------------------- | ---------------------------- |
| Monorepo      | Easier dev management | Deployment config complexity |
| JWT           | Stateless scaling     | Revocation complexity        |
| Redis queues  | Async processing      | Extra service required       |
| Neon cloud DB | Managed DB            | External dependency          |

---

# 📈 How I Would Scale This System

## Horizontal Scaling

* Deploy multiple backend instances
* Use load balancer
* Redis shared across instances
* Database connection pooling

---

## Database Scaling

* Read replicas for heavy read traffic
* Index optimization
* Caching layer (Redis)

---

## Caching Strategy

* Cache blog feeds in Redis
* Cache popular blogs
* TTL-based invalidation

---

## Job Processing Scaling

* Separate worker service for BullMQ
* Increase worker concurrency
* Dedicated queue cluster

---

## Security Improvements

* Refresh tokens
* HTTP-only cookies instead of localStorage
* Role-based access control
* CSRF protection

---

# 🛠 Local Development Setup

## 1️⃣ Clone Repo

```bash
git clone https://github.com/mehaktewari/Secure-Blog-Platform
```

---

## 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create `.env`:

```
DATABASE_URL=
JWT_SECRET=
REDIS_URL=
```

Run:

```bash
npx prisma migrate dev
npm run start:dev
```

---

## 3️⃣ Frontend Setup

```bash
cd frontend
npm install
```

Create `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Run:

```bash
npm run dev
```

---

# 🧪 API Endpoints

### Public

```
GET /public/feed
GET /public/blogs/:slug
```

### Auth

```
POST /auth/register
POST /auth/login
GET /auth/me
```

### Protected

```
POST /blogs
PATCH /blogs/:id
DELETE /blogs/:id
POST /blogs/:id/like
```

---

# 🔮 Future Improvements

* Image uploads (Cloudinary / S3)
* Markdown editor
* Notifications
* Search & filtering
* Admin panel
* Docker containerization
* CI/CD pipeline
* Microservices separation

---

# 🏁 Conclusion

This project demonstrates:

* Production-ready backend architecture
* Full-stack integration
* Cloud database usage
* Background processing
* Redis integration
* Secure authentication
* Real-world deployment strategy

---


