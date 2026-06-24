# 🔍 Pipeline Analyser

Full-stack GitHub Actions pipeline fetcher and analyser.
Fetches last 100 pipelines and generates a dashboard showing
bottlenecks, run counts, average durations and trends.

## 🖥️ Tech Stack

| Layer     | Technology                      |
|-----------|---------------------------------|
| Backend   | Java 17 + Spring Boot 3         |
| Database  | PostgreSQL 15                   |
| Frontend  | Vite + JavaScript + Tailwind CSS|
| Container | Docker + Docker Compose         |

## 📁 Project Structure
```
pipeline-analyser/
├── backend/          # Java Spring Boot API
├── frontend/         # Vite + Tailwind Dashboard
├── docker-compose.yml
├── .env.example
└── README.md
```

## 🚀 Quick Start

### 1. Clone
```bash
git clone https://github.com/YOUR_USERNAME/pipeline-analyser.git
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
