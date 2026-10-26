# healthcare-backend/seed.py
from app.core.database import SessionLocal, engine
from app.core.database import Base
from app.models.user import User
from app.models.patient import Patient
from app.models.audit_log import AuditLog
from app.core.security import get_password_hash
from datetime import date

def seed_data():
    # Automatically create all tables if they don't exist yet
    print("Creating database tables...")
    Base.metadata.create_all(bind=engine)
    print("Tables created successfully.")

    db = SessionLocal()
    try:
        # Create test users if they don't exist
        if not db.query(User).filter(User.username == "admin_user").first():
            admin = User(username="admin_user", email="admin@hospital.com", hashed_password=get_password_hash("AdminPassword123!"), role="admin")
            doctor = User(username="dr_smith", email="smith@hospital.com", hashed_password=get_password_hash("DoctorPassword123!"), role="doctor")
            nurse = User(username="nurse_joy", email="joy@hospital.com", hashed_password=get_password_hash("NursePassword123!"), role="nurse")
            db.add_all([admin, doctor, nurse])
            db.commit()
            print("Users seeded successfully.")
        else:
            print("Users already exist.")

        # Create synthetic patients if none exist
        if db.query(Patient).count() == 0:
            p1 = Patient(first_name="John", last_name="Doe", date_of_birth=date(1985, 4, 12), gender="Male", medical_history="Hypertension, seasonal allergies", contact_number="555-0192")
            p2 = Patient(first_name="Jane", last_name="Smith", date_of_birth=date(1990, 9, 23), gender="Female", medical_history="Asthma controlled with inhaler", contact_number="555-8392")
            db.add_all([p1, p2])
            db.commit()
            print("Synthetic patients seeded successfully.")
        else:
            print("Patients already exist.")
    finally:
        db.close()

if __name__ == "__main__":
    seed_data()