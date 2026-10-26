from pydantic import BaseModel
from datetime import datetime

class AuditLogResponse(BaseModel):
    id: int
    username: str
    action: str
    endpoint: str
    details: str | None
    timestamp: datetime

    class Config:
        from_attributes = True