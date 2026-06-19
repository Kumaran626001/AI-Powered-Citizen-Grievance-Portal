from fastapi import FastAPI, Depends, HTTPException, UploadFile, File, Form, Request
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import engine, Base, get_db
import models
from ml_models import predict_complaint_attributes
import uuid
import os
import shutil
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

# Create DB tables
models.Base.metadata.create_all(bind=engine)

# Dynamic DB migration to support 'city' and 'specific_location' columns
try:
    with engine.connect() as conn:
        from sqlalchemy import text
        result_city = conn.execute(text("SHOW COLUMNS FROM complaints LIKE 'city'"))
        if not result_city.fetchone():
            conn.execute(text("ALTER TABLE complaints ADD COLUMN city VARCHAR(100) AFTER district"))
            conn.commit()
            
        result_loc = conn.execute(text("SHOW COLUMNS FROM complaints LIKE 'specific_location'"))
        if not result_loc.fetchone():
            conn.execute(text("ALTER TABLE complaints ADD COLUMN specific_location VARCHAR(255) AFTER city"))
            conn.commit()
except Exception as e:
    print("Database migration failed or already executed:", e)

app = FastAPI(title="AI Citizen Grievance Management System")

# Configure CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "../uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

@app.post("/api/admin/login")
def admin_login(username: str = Form(...), password: str = Form(...), db: Session = Depends(get_db)):
    admin = db.query(models.Admin).filter(models.Admin.username == username).first()
    if not admin:
        if username == "admin" and password == "admin123":
            new_admin = models.Admin(username=username, password_hash="admin123")
            db.add(new_admin)
            db.commit()
            return {"status": "success", "admin_id": new_admin.id}
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    if admin.password_hash != password:
        raise HTTPException(status_code=401, detail="Invalid credentials")
        
    return {"status": "success", "admin_id": admin.id}

@app.post("/api/complaints/submit")
async def submit_complaint(
    citizen_name: str = Form(...),
    phone_number: str = Form(...),
    district: str = Form(...),
    city: str = Form(...),
    specific_location: str = Form(...),
    description: str = Form(...),
    evidence: UploadFile = File(None),
    db: Session = Depends(get_db)
):
    ticket_id = f"TKT-{str(uuid.uuid4())[:8].upper()}"
    
    evidence_path = None
    if evidence and evidence.filename:
        file_extension = evidence.filename.split(".")[-1]
        file_name = f"{ticket_id}.{file_extension}"
        file_path = os.path.join(UPLOAD_DIR, file_name)
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(evidence.file, buffer)
        evidence_path = f"/uploads/{file_name}"
        
    ml_results = predict_complaint_attributes(description)
    
    new_complaint = models.Complaint(
        ticket_id=ticket_id,
        citizen_name=citizen_name,
        phone_number=phone_number,
        district=district,
        city=city,
        specific_location=specific_location,
        location=specific_location,
        description=description,
        evidence_path=evidence_path,
        predicted_category=ml_results["category"],
        urgency_level=ml_results["urgency"],
        priority_score=ml_results["priority_score"]
    )
    
    db.add(new_complaint)
    db.commit()
    db.refresh(new_complaint)
    
    return {"status": "success", "ticket_id": ticket_id, "prediction": ml_results, "evidence_path": evidence_path}

@app.get("/api/complaints")
def get_complaints(db: Session = Depends(get_db)):
    complaints = db.query(models.Complaint).order_by(models.Complaint.priority_score.desc()).all()
    return complaints

@app.get("/api/complaints/grouped")
def get_grouped_complaints(db: Session = Depends(get_db)):
    from collections import defaultdict
    complaints = db.query(models.Complaint).all()
    
    groups = defaultdict(list)
    for c in complaints:
        dist = (c.district or "").strip()
        city = (c.city or "").strip()
        loc = (c.specific_location or c.location or "").strip()
        dept = (c.predicted_category or "").strip()
        
        # Key is case-insensitive normalized tuple for grouping
        key = (dist.lower(), city.lower(), loc.lower(), dept.lower())
        groups[key].append(c)
        
    grouped_list = []
    for key, item_list in groups.items():
        first = item_list[0]
        avg_score = round(sum(c.priority_score for c in item_list) / len(item_list), 2)
        
        # Aggregate status:
        # If all resolved -> Resolved
        # If any in progress -> In Progress
        # Else -> Pending
        statuses = [c.status.value if hasattr(c.status, 'value') else str(c.status) for c in item_list]
        if all(s == "Resolved" for s in statuses):
            agg_status = "Resolved"
        elif any(s == "In Progress" for s in statuses):
            agg_status = "In Progress"
        else:
            agg_status = "Pending"
            
        grouped_list.append({
            "district": first.district,
            "city": first.city,
            "location": first.specific_location or first.location,
            "predicted_category": first.predicted_category,
            "average_priority_score": avg_score,
            "status": agg_status,
            "total_complaints": len(item_list),
            "complaints": [
                {
                    "ticket_id": c.ticket_id,
                    "citizen_name": c.citizen_name,
                    "phone_number": c.phone_number,
                    "description": c.description,
                    "urgency_level": c.urgency_level,
                    "priority_score": c.priority_score,
                    "status": c.status.value if hasattr(c.status, 'value') else str(c.status),
                    "created_at": c.created_at.isoformat() if c.created_at else None,
                    "evidence_path": c.evidence_path
                } for c in item_list
            ]
        })
        
    # Sort groups by average_priority_score descending
    grouped_list.sort(key=lambda x: x["average_priority_score"], reverse=True)
    return grouped_list


@app.get("/api/dashboard/stats")
def get_dashboard_stats(db: Session = Depends(get_db)):
    total = db.query(models.Complaint).count()
    high_priority = db.query(models.Complaint).filter(models.Complaint.urgency_level.in_(["High", "Critical"])).count()
    resolved = db.query(models.Complaint).filter(models.Complaint.status == models.ComplaintStatus.RESOLVED).count()
    pending = db.query(models.Complaint).filter(models.Complaint.status == models.ComplaintStatus.PENDING).count()
    
    return {
        "total_complaints": total,
        "high_priority": high_priority,
        "resolved": resolved,
        "pending": pending
    }

@app.get("/api/analytics/district")
def get_district_analytics(db: Session = Depends(get_db)):
    from sqlalchemy import func
    results = db.query(models.Complaint.district, func.count(models.Complaint.ticket_id)).group_by(models.Complaint.district).all()
    return [{"district": r[0], "count": r[1]} for r in results]

@app.get("/api/analytics/city")
def get_city_analytics(db: Session = Depends(get_db)):
    from sqlalchemy import func
    results = db.query(models.Complaint.city, func.count(models.Complaint.ticket_id)).filter(models.Complaint.city != None).group_by(models.Complaint.city).all()
    return [{"city": r[0], "count": r[1]} for r in results]

@app.get("/api/analytics/high-regions")
def get_high_regions(db: Session = Depends(get_db)):
    from sqlalchemy import func
    results = db.query(models.Complaint.district, models.Complaint.city, func.count(models.Complaint.ticket_id))\
        .filter(models.Complaint.district != None, models.Complaint.city != None)\
        .group_by(models.Complaint.district, models.Complaint.city)\
        .order_by(func.count(models.Complaint.ticket_id).desc())\
        .limit(5).all()
    return [{"district": r[0], "city": r[1], "count": r[2]} for r in results]

@app.get("/api/analytics/category")
def get_category_analytics(db: Session = Depends(get_db)):
    from sqlalchemy import func
    results = db.query(models.Complaint.predicted_category, func.count(models.Complaint.ticket_id)).group_by(models.Complaint.predicted_category).all()
    return [{"category": r[0], "count": r[1]} for r in results]

@app.get("/api/analytics/trend")
def get_trend_analytics(db: Session = Depends(get_db)):
    # Mocking monthly trend for demonstration
    import random
    months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"]
    return [{"month": m, "count": random.randint(10, 100)} for m in months]

@app.post("/api/complaints/grouped/action")
def take_grouped_action(
    ticket_ids: str = Form(...),  # Comma-separated string of ticket IDs
    action_notes: str = Form(...),
    status: str = Form(...),
    admin_id: int = Form(...),
    db: Session = Depends(get_db)
):
    ids = [tid.strip() for tid in ticket_ids.split(",") if tid.strip()]
    if not ids:
        raise HTTPException(status_code=400, detail="No ticket IDs provided")
        
    complaints = db.query(models.Complaint).filter(models.Complaint.ticket_id.in_(ids)).all()
    if not complaints:
        raise HTTPException(status_code=404, detail="No complaints found for the provided IDs")
        
    for complaint in complaints:
        complaint.status = models.ComplaintStatus(status)
        action = models.ActionTaken(
            ticket_id=complaint.ticket_id,
            admin_id=admin_id,
            action_notes=action_notes,
            updated_status=models.ComplaintStatus(status)
        )
        db.add(action)
        
    db.commit()
    return {"status": "success", "updated_count": len(complaints)}

@app.post("/api/complaints/{ticket_id}/action")
def take_action(
    ticket_id: str,
    action_notes: str = Form(...),
    status: str = Form(...),
    admin_id: int = Form(...),
    db: Session = Depends(get_db)
):
    complaint = db.query(models.Complaint).filter(models.Complaint.ticket_id == ticket_id).first()
    if not complaint:
        raise HTTPException(status_code=404, detail="Complaint not found")
        
    complaint.status = models.ComplaintStatus(status)
    
    action = models.ActionTaken(
        ticket_id=ticket_id,
        admin_id=admin_id,
        action_notes=action_notes,
        updated_status=models.ComplaintStatus(status)
    )
    
    db.add(action)
    db.commit()
    
    return {"status": "success"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
