from sqlalchemy.orm import Session
from app.models.audit_log import AuditLog

def log_event(db: Session, username: str, action: str, endpoint: str, details: str = None):
    audit_entry = AuditLog(
        username=username,
        action=action,
        endpoint=endpoint,
        details=details
    )
    db.add(audit_entry)
    db.commit()