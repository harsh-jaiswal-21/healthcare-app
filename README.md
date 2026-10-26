Secure Healthcare Management Application
A modern, containerized healthcare management web application built with a decoupled architecture—featuring a React.js + Vite frontend, a secure Python FastAPI backend, and a PostgreSQL database, orchestrated seamlessly with Docker Compose.

🏛️ Application Architecture
The application strictly separates concerns across independent components communicating exclusively via REST APIs:

Frontend (healthcare-frontend): React.js + Vite (Runs on port 5173)

Backend (healthcare-backend): Python + FastAPI with SQLAlchemy (Runs on port 8000)

Database (db): PostgreSQL 15 (Runs on port 5432, accessible exclusively to the backend)

🚀 Key Features
Role-Based Access Control (RBAC):

Admin: Full access to manage patients, delete records, and inspect security audit logs.

Doctor: Clinical access to view, create, and update synthetic patient records.

Nurse: Read-only clinical access to patient lists and detailed medical history.

Secure Authentication: JWT-based stateless authentication with password hashing via passlib[bcrypt].

Security Audit Logging: Automatically records authentication events and patient data modifications in an immutable database audit log.

Synthetic Data Management: Fully populated with realistic fictional patient records and test users.

🛠️ Quick Start (Docker Deployment)
The fastest and easiest way to run the entire application is using Docker Compose.

1. Clone or Open the Project Root
Open your terminal in the root project directory (healthcare-project/).

2. Build and Start All Containers
Bash
docker-compose up -d --build
3. Initialize and Seed the Database
Once the containers are running and healthy, seed the database with test users and synthetic patient records by running:

Bash
docker exec -it healthcare_backend python seed.py
🌐 Accessing the Services
Frontend Web UI: http://localhost:5173

Backend REST API & Swagger Docs: http://localhost:8000/docs

PostgreSQL Database: localhost:5432
