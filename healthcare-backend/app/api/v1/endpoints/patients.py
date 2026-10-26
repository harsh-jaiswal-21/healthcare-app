from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.core.security import get_current_user, require_role
from app.models.user import User
from app.models.patient import Patient
from app.schemas.patient import PatientCreate, PatientUpdate, PatientResponse
from app.services.audit_service import log_event

router = APIRouter(prefix="/patients", tags=["Patients"])

@router.get("/", response_model=List[PatientResponse])
def get_patients(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    log_event(db, current_user.username, "READ_PATIENTS", "/api/v1/patients", f"Fetched patients list (skip={skip})")
    return db.query(Patient).offset(skip).limit(limit).all()

@router.post("/", response_model=PatientResponse, status_code=status.HTTP_201_CREATED)
def create_patient(patient_in: PatientCreate, db: Session = Depends(get_db), current_user: User = Depends(require_role("doctor"))):
    patient = Patient(**patient_in.dict())
    db.add(patient)
    db.commit()
    db.refresh(patient)
    log_event(db, current_user.username, "CREATE_PATIENT", "/api/v1/patients", f"Created patient ID {patient.id}")
    return patient

@router.get("/{patient_id}", response_model=PatientResponse)
def get_patient(patient_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    patient = db.query(Patient).filter(Patient.id == patient_id).first()
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    log_event(db, current_user.username, "READ_PATIENT", f"/api/v1/patients/{patient_id}", f"Viewed patient ID {patient_id}")
    return patient

@router.patch("/{patient_id}", response_model=PatientResponse)
def update_patient(patient_id: int, patient_in: PatientUpdate, db: Session = Depends(get_db), current_user: User = Depends(require_role("doctor"))):
    patient = db.query(Patient).filter(Patient.id == patient_id).first()
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    
    update_data = patient_in.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(patient, field, value)
    
    db.commit()
    db.refresh(patient)
    log_event(db, current_user.username, "UPDATE_PATIENT", f"/api/v1/patients/{patient_id}", f"Updated patient ID {patient_id}")
    return patient

@router.delete("/{patient_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_patient(patient_id: int, db: Session = Depends(get_db), current_user: User = Depends(require_role("admin"))):
    patient = db.query(Patient).filter(Patient.id == patient_id).first()
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    db.delete(patient)
    db.commit()
    log_event(db, current_user.username, "DELETE_PATIENT", f"/api/v1/patients/{patient_id}", f"Deleted patient ID {patient_id}")
    return None