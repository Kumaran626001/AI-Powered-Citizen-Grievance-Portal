from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import mysql.connector

# Original SQLAlchemy setup updated with your credentials so it doesn't break models.py and main.py
SQLALCHEMY_DATABASE_URL = "mysql+pymysql://root:@localhost:3306/grievance_db" 

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# The raw mysql.connector database connection you requested
db = mysql.connector.connect(
    host="localhost",
    port=3306,
    user="root",
    password="",
    database="grievance_db"
)
