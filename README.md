# 🔍 Flow-Lens

![CI Pipeline](https://github.com/jay-talera/flow-lens/actions/workflows/ci.yml/badge.svg)


Full-stack GitHub Actions pipeline fetcher and analyser.
Fetches last 100 pipelines and generates a dashboard showing
bottlenecks, run counts, average durations and trends.

## 🖥️ Tech Stack

Layer          Technology              Platform
──────────────────────────────────────────────
Frontend       Vite + React + Tailwind  Vercel
Backend        Java Spring Boot         Render
Database       PostgreSQL               Supabase
Container      Docker                   Local
CI/CD          GitHub Actions           GitHub

## 📁 Project Structure
```
flow-lens/
├── backend/          # Java Spring Boot API
├── frontend/         # Vite + Tailwind Dashboard
├── docker-compose.yml
├── .env.example
└── README.md
```

## 🚀 Quick Start

### 1. Clone
```bash
git clone https://github.com/YOUR_USERNAME/flow-lens.git
cd pipeline-analyser
```

### 2. Setup Environment
```bash
cp .env.example .env
# Edit .env with your values
```

### 3. Run Everything
```bash
docker-compose up --build
```

### 4. Open App
```
Frontend  → http://localhost:5173
Backend   → http://localhost:8080
Database  → localhost:5432
```

## 🔧 Running Without Docker

### Backend
```bash
cd backend
./mvnw spring-boot:run
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```
