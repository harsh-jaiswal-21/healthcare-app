# Secure Healthcare Management Application

A modern, containerized healthcare management web application built with a decoupled architecture—featuring a React.js + Vite frontend, a secure Python FastAPI backend, and a PostgreSQL database, orchestrated seamlessly with Docker Compose.

---

## 🏛️ Application Architecture

The application strictly separates concerns across independent components communicating exclusively via REST APIs:

* **Frontend (`healthcare-frontend`):** React.js + Vite (Runs on port `5173`)
* **Backend (`healthcare-backend`):** Python + FastAPI with SQLAlchemy (Runs on port `8000`)
* **Database (`db`):** PostgreSQL 15 (Runs on port `5432`, accessible exclusively to the backend)

---

## 📁 Project Directory Structure

```text
healthcare-project/
├── healthcare-backend/               # Python FastAPI Backend
│   ├── app/
│   │   ├── api/v1/endpoints/         # REST API routes (Auth, Patients, Audit Logs)
│   │   ├── core/                     # Configurations, DB session, & Security (JWT/Bcrypt)
│   │   ├── models/                   # SQLAlchemy Database Models (User, Patient, AuditLog)
│   │   ├── schemas/                  # Pydantic validation schemas
│   │   ├── services/                 # Business logic & audit services
│   │   └── main.py                   # FastAPI application entry point
│   ├── migrations/                   # Alembic database migrations
│   ├── tests/                        # Backend test suite
│   ├── Dockerfile                    # Backend container build instructions
│   ├── requirements.txt              # Python dependencies
│   └── alembic.ini                   # Alembic configuration
│
├── healthcare-frontend/              # React + Vite Frontend
│   ├── public/                       # Static assets
│   ├── src/
│   │   ├── components/               # Reusable UI elements (Navbar, Protected Routes)
│   │   ├── pages/                    # Views (Login, Dashboard, Patient List/Detail, Audit Logs)
│   │   ├── services/                 # Axios API integration layer
│   │   ├── App.jsx                   # Main application router and state
│   │   └── main.jsx                  # React DOM mount point
│   ├── Dockerfile                    # Frontend container build instructions
│   ├── package.json                  # Node.js dependencies & scripts
│   └── vite.config.js                # Vite bundler configuration
│
└── docker-compose.yml                # Multi-container orchestration config
