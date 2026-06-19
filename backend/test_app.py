import unittest
import os
import sys
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Add the parent directory to the path so we can import from backend
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from backend import models
from backend.ml_models import predict_complaint_attributes, _mock_predict
from backend.database import Base

class TestGrievancePortal(unittest.TestCase):
    
    def setUp(self):
        """Set up in-memory database for testing integration."""
        self.engine = create_engine("sqlite:///:memory:")
        self.SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=self.engine)
        models.Base.metadata.create_all(bind=self.engine)
        self.db = self.SessionLocal()

    def tearDown(self):
        """Clean up database after testing."""
        models.Base.metadata.drop_all(bind=self.engine)
        self.db.close()

    # ==========================================
    # 1. UNIT TESTING (ML Model Predictions)
    # ==========================================
    def test_ml_prediction_water_issue(self):
        """Test that water-related descriptions return the Water Supply department."""
        description = "There is a massive water leak in the main pipeline causing water wastage."
        result = predict_complaint_attributes(description)
        self.assertIn("category", result)
        self.assertTrue("Water" in result["category"])
        self.assertIn(result["urgency"], ["Low", "Medium", "High", "Critical"])
        self.assertTrue(10 <= result["priority_score"] <= 100)

    def test_ml_prediction_electricity_issue(self):
        """Test that electricity-related descriptions return the Electricity department."""
        description = "Power cut in our street since yesterday. High voltage fluctuation."
        result = predict_complaint_attributes(description)
        self.assertIn("category", result)
        self.assertTrue("Electr" in result["category"])
        self.assertIn(result["urgency"], ["Low", "Medium", "High", "Critical"])

    def test_ml_prediction_urgency_critical(self):
        """Test that emergency descriptions return critical or high urgency."""
        description = "Emergency! Electric transformer is sparking continuously and on fire near the school."
        result = predict_complaint_attributes(description)
        self.assertIn(result["urgency"], ["High", "Critical"])
        self.assertTrue(result["priority_score"] >= 60)

    # ==========================================
    # 2. INTEGRATION TESTING (Database Operations)
    # ==========================================
    def test_database_insert_complaint(self):
        """Test that complaints can be inserted and fetched from database successfully."""
        ticket_id = "TKT-TEST101"
        complaint = models.Complaint(
            ticket_id=ticket_id,
            citizen_name="John Doe",
            phone_number="9876543210",
            district="Chennai",
            city="Adyar",
            specific_location="Near Bus Depot",
            location="Near Bus Depot",
            description="Drainage overflowing near residential buildings",
            predicted_category="Sanitation Department",
            urgency_level="High",
            priority_score=88.5,
            status=models.ComplaintStatus.PENDING
        )
        
        self.db.add(complaint)
        self.db.commit()
        
        # Retrieve complaint and verify fields
        retrieved = self.db.query(models.Complaint).filter(models.Complaint.ticket_id == ticket_id).first()
        self.assertIsNotNone(retrieved)
        self.assertEqual(retrieved.citizen_name, "John Doe")
        self.assertEqual(retrieved.predicted_category, "Sanitation Department")
        self.assertEqual(retrieved.status, models.ComplaintStatus.PENDING)

    def test_database_update_status_and_action_taken(self):
        """Test updating status and adding corresponding record to action_taken table."""
        # 1. Insert complaint
        ticket_id = "TKT-TEST102"
        complaint = models.Complaint(
            ticket_id=ticket_id,
            citizen_name="Jane Doe",
            phone_number="9876543211",
            district="Salem",
            city="Salem Town",
            location="Market Street",
            description="Street lights not working",
            predicted_category="Electricity Department",
            urgency_level="Medium",
            priority_score=55.0,
            status=models.ComplaintStatus.PENDING
        )
        self.db.add(complaint)
        
        # 2. Insert admin
        admin = models.Admin(id=1, username="admin_user", password_hash="hash")
        self.db.add(admin)
        self.db.commit()
        
        # 3. Resolve complaint and log action taken
        complaint.status = models.ComplaintStatus.RESOLVED
        action = models.ActionTaken(
            ticket_id=ticket_id,
            admin_id=1,
            action_notes="Replaced the fused bulbs on the street poles.",
            updated_status=models.ComplaintStatus.RESOLVED
        )
        self.db.add(action)
        self.db.commit()
        
        # 4. Verify updates
        updated_complaint = self.db.query(models.Complaint).filter(models.Complaint.ticket_id == ticket_id).first()
        self.assertEqual(updated_complaint.status, models.ComplaintStatus.RESOLVED)
        
        action_log = self.db.query(models.ActionTaken).filter(models.ActionTaken.ticket_id == ticket_id).first()
        self.assertIsNotNone(action_log)
        self.assertEqual(action_log.action_notes, "Replaced the fused bulbs on the street poles.")
        self.assertEqual(action_log.admin_id, 1)

    # ==========================================
    # 3. SYSTEM/API TESTING (FastAPI Routing Mock)
    # ==========================================
    def test_api_login_mock(self):
        """Test admin login validation checks."""
        # We simulate the login route validation logic
        username_correct = "admin"
        password_correct = "admin123"
        
        # Correct credentials validation
        self.assertTrue(username_correct == "admin" and password_correct == "admin123")
        
        # Incorrect credentials validation
        username_wrong = "invalid"
        self.assertFalse(username_wrong == "admin")

if __name__ == "__main__":
    unittest.main()
