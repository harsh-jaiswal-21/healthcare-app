from pydantic import BaseModel
from datetime import date, datetime

class PatientBase(BaseModel):
    first_name: str
    last_name: str
    date_of_birth: date
    gender: str
    medical_history: str | None = None
    contact_number: str | None = None

class PatientCreate(PatientBase):
    pass

class PatientUpdate(BaseModel):
    first_name: str | None = None
    last_name: str | None = None
    date_of_birth: date | None = None
    gender: str | None = None
    medical_history: str | None = None
    contact_number: str | None = None

class PatientResponse(PatientBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True