# 🔍 Flow-Lens — CI Bottleneck Analyzer

![CI Pipeline](https://github.com/jay-talera/flow-lens/actions/workflows/ci.yml/badge.svg)

A full-stack application that fetches and analyses GitHub Actions pipelines.
Displays bottlenecks, run counts, average durations and trends in a clean dashboard.

---

## 🌐 Live Demo

| Service  | URL                                          |
|----------|----------------------------------------------|
| Frontend | https://flow-lens-jay-jain.vercel.app        |
| Backend  | https://flow-lens.onrender.com               |

---

## 🖥️ Tech Stack

| Layer     | Technology              | Platform       |
|-----------|-------------------------|----------------|
| Frontend  | Vite + React + Tailwind | Vercel         |
| Backend   | Java Spring Boot        | Render         |
| Database  | PostgreSQL              | Supabase       |
| Container | Docker                  | Local          |
| CI/CD     | GitHub Actions          | GitHub         |

---

## ✨ Features

```
✅ Fetch last 100 GitHub Actions pipelines
✅ Identify top bottlenecks per step
✅ View average durations & run counts
✅ Success & failure trend charts
✅ Branch activity analysis
✅ Workflow distribution breakdown
✅ Recent runs dashboard
```

---

## 📁 Project Structure

```
flow-lens/
├── backend/                        # Java Spring Boot API
│   ├── src/
│   │   └── main/
│   │       ├── java/com/jayjain/cibottleneckanalyzer/
│   │       │   ├── config/         # CORS, GitHub config
│   │       │   ├── controller/     # REST controllers
│   │       │   ├── dto/            # Data transfer objects
│   │       │   ├── entity/         # Database entities
│   │       │   ├── exception/      # Exception handling
│   │       │   ├── mapper/         # Entity mappers
│   │       │   ├── repository/     # JPA repositories
│   │       │   ├── service/        # Business logic
│   │       │   └── util/           # Utility classes
│   │       └── resources/
│   │           └── db/migration/   # Flyway migrations
│   └── Dockerfile
│
├── frontend/                       # Vite + React + Tailwind
│   ├── src/
│   │   ├── api/                    # Axios API calls
│   │   └── ...
│   ├── Dockerfile
│   ├── nginx.conf
│   └── vercel.json
│
├── docker-compose.yml              # Local development
├── .github/
│   └── workflows/
│       └── ci.yml                  # CI/CD pipeline
├── .env.example
└── README.md
```

---
## 🚀 Getting Started

### Prerequisites
```
- Java 17+
- Node.js 22+
- Docker & Docker Compose
- GitHub Personal Access Token
```

### 1. Clone the Repository
```bash
git clone https://github.com/Jay-talera/flow-lens.git
cd flow-lens
```

### 2. Setup Environment Variables
```bash
cp .env.example .env
# Edit .env and fill in your values
```

### 3. Generate GitHub Token
```
GitHub → Settings
  → Developer Settings
    → Personal Access Tokens
      → Tokens (classic)
        → Generate new token
        
Scopes needed:
  ✅ repo
  ✅ workflow
  ✅ read:org
```

### 4. Run with Docker
```bash
docker-compose up --build
```

### 5. Access the App
```
Frontend  → http://localhost:5173
Backend   → http://localhost:8080
Database  → localhost:5432
```

---

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

---

## 🐳 Docker Services

| Service    | Port  | Description        |
|------------|-------|--------------------|
| Frontend   | 5173  | Vite + React UI    |
| Backend    | 8080  | Spring Boot API    |
| PostgreSQL | 5432  | Database           |

---
---

## 🔄 CI/CD Pipeline

```
Push to main
     │
     ├── 🔧 Backend Build
     │     └── Java 17 + Maven
     │
     ├── 🎨 Frontend Build
     │     └── Node 22 + Vite
     │
     └── 🐳 Docker Build Check
           └── All services start
```

---

## 🤝 Contributing

```bash
# Create feature branch
git checkout -b feature/your-feature

# Make changes and commit
git commit -m "feat: your feature description"

# Push and create PR
git push origin feature/your-feature
```

---

## 📄 License

MIT License — feel free to use this project!

---

## 👨‍💻 Author

**Jay Jain**
- GitHub: [@Jay-talera](https://github.com/Jay-talera)
- Live App: [flow-lens-jay-jain.vercel.app](https://flow-lens-jay-jain.vercel.app)
