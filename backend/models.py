from sqlalchemy import Column, Integer, String, Text, DateTime, Float, ForeignKey, Enum
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from database import Base
import enum

class ComplaintStatus(str, enum.Enum):
    PENDING = "Pending"
    IN_PROGRESS = "In Progress"
    RESOLVED = "Resolved"

class Admin(Base):
    __tablename__ = "admins"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True)
    password_hash = Column(String(255))

class Complaint(Base):
    __tablename__ = "complaints"
    ticket_id = Column(String(50), primary_key=True, index=True)
    citizen_name = Column(String(100))
    phone_number = Column(String(20))
    district = Column(String(100))
    city = Column(String(100), nullable=True)
    specific_location = Column(String(255), nullable=True)
    location = Column(String(255))
    description = Column(Text)
    evidence_path = Column(String(255), nullable=True)
    
    # ML predicted fields
    predicted_category = Column(String(100))
    urgency_level = Column(String(50)) # Low, Medium, High, Critical
    priority_score = Column(Float)
    
    status = Column(Enum(ComplaintStatus), default=ComplaintStatus.PENDING)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class ActionTaken(Base):
    __tablename__ = "action_taken"
    id = Column(Integer, primary_key=True, index=True)
    ticket_id = Column(String(50), ForeignKey("complaints.ticket_id"))
    admin_id = Column(Integer, ForeignKey("admins.id"))
    action_notes = Column(Text)
    updated_status = Column(Enum(ComplaintStatus))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    complaint = relationship("Complaint")
    admin = relationship("Admin")
