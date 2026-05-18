# 🚀 Smart Leads Dashboard

A full-stack Lead Management Dashboard built with the MERN stack — designed for sales teams to track, filter, and manage leads efficiently with role-based access control.

![Tech Stack](https://img.shields.io/badge/React-TypeScript-blue?style=flat-square&logo=react)
![Backend](https://img.shields.io/badge/Node.js-Express-green?style=flat-square&logo=node.js)
![Database](https://img.shields.io/badge/MongoDB-Mongoose-brightgreen?style=flat-square&logo=mongodb)
![Docker](https://img.shields.io/badge/Docker-Compose-blue?style=flat-square&logo=docker)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Local Setup (Without Docker)](#local-setup-without-docker)
  - [Docker Setup](#docker-setup)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Role-Based Access Control](#role-based-access-control)
- [Scripts](#scripts)

---

## Overview

Smart Leads Dashboard is a production-ready CRM-style application that allows teams to manage sales leads from end to end. It features JWT-based authentication, advanced filtering with debounced search, server-side pagination, CSV export, and a clean role system separating admins from sales users.

---

## Features

### Core
- 🔐 **JWT Authentication** — Register, login, protected routes, bcrypt password hashing
- 📋 **Lead Management** — Full CRUD: create, view, update, delete leads
- 🔍 **Advanced Filtering** — Filter by status, source, sort by date, search by name or email
- ⚡ **Debounced Search** — 400ms debounce to avoid hammering the API on every keystroke
- 📄 **Server-Side Pagination** — 10 records per page with full metadata
- 📤 **CSV Export** — Export filtered leads as a downloadable CSV file
- 👥 **Role-Based Access Control** — Admin and Sales User roles with different permissions
- 🐳 **Docker Support** — Full Docker Compose setup for one-command startup

### UI/UX
- 📱 Responsive design — works on mobile, tablet, and desktop
- ⏳ Loading skeletons during data fetch
- 🚫 Empty states when no leads match filters
- ❌ Inline form validation with meaningful error messages
- 🌙 Dark mode support

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, TypeScript, TailwindCSS, Vite |
| Backend | Node.js, Express.js, TypeScript |
| Database | MongoDB, Mongoose |
| Auth | JSON Web Tokens (JWT), bcryptjs |
| Validation | Zod (client), express-validator (server) |
| Forms | react-hook-form |
| HTTP Client | Axios |
| Containerization | Docker, Docker Compose |

---

## Project Structure

```
smart-leads-dashboard/
├── docker-compose.yml
├── README.md
├── server/                  # Express + TypeScript API
│   ├── src/
│   │   ├── controllers/     # Route handler logic
│   │   ├── middlewares/     # Auth, role, error handlers
│   │   ├── models/          # Mongoose schemas
│   │   ├── routes/          # API route definitions
│   │   ├── types/           # TypeScript interfaces & enums
│   │   ├── validators/      # Request validation schemas
│   │   ├── utils/           # Helpers (JWT, response, CSV)
│   │   ├── config/          # DB connection
│   │   ├── app.ts
│   │   └── server.ts
│   ├── .env.example
│   └── Dockerfile
└── client/                  # React + TypeScript frontend
    ├── src/
    │   ├── components/      # UI + feature components
    │   ├── pages/           # Route-level page components
    │   ├── hooks/           # Custom React hooks
    │   ├── context/         # Auth context
    │   ├── services/        # API call functions
    │   ├── types/           # TypeScript interfaces
    │   ├── lib/             # Axios instance
    │   └── constants/       # Shared enums/options
    ├── .env.example
    └── Dockerfile
```

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) v18 or higher
- [MongoDB](https://www.mongodb.com/) (local) or a [MongoDB Atlas](https://www.mongodb.com/atlas) connection string
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) *(only for Docker setup)*

---

### Local Setup (Without Docker)

#### 1. Clone the repository

```bash
git clone https://github.com/your-username/smart-leads-dashboard.git
cd smart-leads-dashboard
```

#### 2. Set up the Backend

```bash
cd server
cp .env.example .env
# Edit .env with your values (see Environment Variables section)
npm install
npm run dev
```

The API will start at `http://localhost:5000`

#### 3. Set up the Frontend

Open a new terminal tab:

```bash
cd client
cp .env.example .env
# Set VITE_API_URL=http://localhost:5000/api
npm install
npm run dev
```

The app will start at `http://localhost:5173`

---

### Docker Setup

> One command to run everything — API, frontend, and MongoDB.

#### 1. Clone the repository

```bash
git clone https://github.com/your-username/smart-leads-dashboard.git
cd smart-leads-dashboard
```

#### 2. Configure environment files

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

Edit `server/.env` with your preferred values. For Docker, `MONGO_URI` should point to the Compose service:

```
MONGO_URI=mongodb://mongo:27017/smart-leads
```

#### 3. Start all services

```bash
docker-compose up --build
```

| Service | URL |
|---|---|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:5000 |
| MongoDB | mongodb://localhost:27017 |

#### 4. Stop all services

```bash
docker-compose down
```

To also remove the MongoDB volume:

```bash
docker-compose down -v
```

---

## Environment Variables

### Server (`server/.env`)

| Variable | Description | Example |
|---|---|---|
| `PORT` | Port for the Express server | `5000` |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/smart-leads` |
| `JWT_SECRET` | Secret key for signing JWTs | `your_super_secret_key` |
| `JWT_EXPIRES_IN` | JWT token expiry duration | `7d` |
| `NODE_ENV` | Environment mode | `development` |

### Client (`client/.env`)

| Variable | Description | Example |
|---|---|---|
| `VITE_API_URL` | Backend API base URL | `http://localhost:5000/api` |

---

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication

All protected routes require the following header:
```
Authorization: Bearer <token>
```

---

### Auth Endpoints

#### Register
```
POST /auth/register
```
**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "sales"
}
```
**Response:**
```json
{
  "success": true,
  "token": "eyJhbGci...",
  "user": { "id": "...", "name": "John Doe", "email": "...", "role": "sales" }
}
```

---

#### Login
```
POST /auth/login
```
**Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
**Response:**
```json
{
  "success": true,
  "token": "eyJhbGci...",
  "user": { "id": "...", "name": "John Doe", "role": "sales" }
}
```

---

#### Get Current User
```
GET /auth/me
```
🔒 Protected

---

### Leads Endpoints

#### Get All Leads
```
GET /leads
```
🔒 Protected

**Query Parameters:**

| Param | Type | Description |
|---|---|---|
| `page` | number | Page number (default: 1) |
| `limit` | number | Records per page (default: 10) |
| `status` | string | Filter by: `New`, `Contacted`, `Qualified`, `Lost` |
| `source` | string | Filter by: `Website`, `Instagram`, `Referral` |
| `search` | string | Search by name or email |
| `sort` | string | `latest` (default) or `oldest` |

**Example:**
```
GET /leads?status=Qualified&source=Instagram&search=rahul&sort=latest&page=1
```

**Response:**
```json
{
  "success": true,
  "data": [ /* lead objects */ ],
  "pagination": {
    "total": 45,
    "page": 1,
    "limit": 10,
    "totalPages": 5
  }
}
```

---

#### Get Single Lead
```
GET /leads/:id
```
🔒 Protected

---

#### Create Lead
```
POST /leads
```
🔒 Protected

**Body:**
```json
{
  "name": "Rahul Sharma",
  "email": "rahul@example.com",
  "status": "New",
  "source": "Instagram"
}
```

---

#### Update Lead
```
PUT /leads/:id
```
🔒 Protected

**Body:** Any subset of lead fields

---

#### Delete Lead
```
DELETE /leads/:id
```
🔒 Protected · 🛡️ Admin only

---

#### Export Leads as CSV
```
GET /leads/export
```
🔒 Protected

Accepts the same query parameters as **Get All Leads** (except `page` and `limit`). Returns a downloadable `.csv` file.

---

### Standard Error Response

```json
{
  "success": false,
  "message": "Unauthorized",
  "errors": []
}
```

---

## Role-Based Access Control

| Action | Admin | Sales User |
|---|---|---|
| View all leads | ✅ | ❌ (own leads only) |
| Create lead | ✅ | ✅ |
| Edit lead | ✅ | ✅ (own leads only) |
| Delete lead | ✅ | ❌ |
| Export CSV | ✅ | ✅ |

---

## Scripts

### Server

| Command | Description |
|---|---|
| `npm run dev` | Start dev server with hot reload (ts-node-dev) |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm start` | Run compiled production build |

### Client

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |

---

## Live Demo

🔗 **Frontend:** [https://smart-leads.vercel.app](https://smart-leads.vercel.app) *(add your URL)*  
🔗 **API:** [https://smart-leads-api.onrender.com](https://smart-leads-api.onrender.com) *(add your URL)*

**Demo credentials:**
| Role | Email | Password |
|---|---|---|
| Admin | admin@demo.com | demo1234 |
| Sales | sales@demo.com | demo1234 |

---

## License

This project was built as part of the ServiceHive Full Stack Internship Assignment.