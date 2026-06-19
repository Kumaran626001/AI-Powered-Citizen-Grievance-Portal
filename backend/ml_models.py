import os
import pickle
import random

# Absolute paths to the model files
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODELS_DIR = os.path.join(BASE_DIR, "models")

TFIDF_PATH = os.path.join(MODELS_DIR, "tfidf.pkl")
DEPT_MODEL_PATH = os.path.join(MODELS_DIR, "department_model.pkl")
URGENCY_MODEL_PATH = os.path.join(MODELS_DIR, "urgency_model.pkl")

# Load models globally
try:
    with open(TFIDF_PATH, 'rb') as f:
        tfidf_vectorizer = pickle.load(f)
    with open(DEPT_MODEL_PATH, 'rb') as f:
        department_model = pickle.load(f)
    with open(URGENCY_MODEL_PATH, 'rb') as f:
        urgency_model = pickle.load(f)
    MODELS_LOADED = True
except Exception as e:
    print(f"Warning: Could not load ML models. Using mock predictions. Error: {e}")
    MODELS_LOADED = False

def predict_complaint_attributes(description: str):
    """
    Uses trained ML models (pickle files) to predict category and urgency.
    Falls back to simple keyword matching if models aren't loaded.
    """
    if not MODELS_LOADED:
        return _mock_predict(description)
        
    try:
        # Transform text using the loaded TF-IDF vectorizer
        X = tfidf_vectorizer.transform([description])
        
        # Predict using the loaded models
        category = department_model.predict(X)[0]
        urgency = urgency_model.predict(X)[0]
        
        urgency_str = str(urgency).capitalize()
        category_str = str(category)
        
        # Calculate priority score based on urgency (0-100)
        base_scores = {
            "Low": random.uniform(10, 30),
            "Medium": random.uniform(31, 60),
            "High": random.uniform(61, 85),
            "Critical": random.uniform(86, 100)
        }
        
        if urgency_str in base_scores:
            priority_score = round(base_scores[urgency_str], 2)
        else:
            priority_score = round(random.uniform(50, 80), 2)
            
        return {
            "category": category_str,
            "urgency": urgency_str,
            "priority_score": priority_score
        }
    except Exception as e:
        print(f"Error during prediction: {e}")
        return _mock_predict(description)

def _mock_predict(description: str):
    CATEGORIES = ["Public Works", "Water Supply", "Electricity", "Health", "Sanitation", "Transport"]
    URGENCY_LEVELS = ["Low", "Medium", "High", "Critical"]
    
    desc_lower = description.lower()
    
    category = random.choice(CATEGORIES)
    if "water" in desc_lower or "pipe" in desc_lower:
        category = "Water Supply"
    elif "power" in desc_lower or "electricity" in desc_lower or "light" in desc_lower:
        category = "Electricity"
    elif "road" in desc_lower or "pothole" in desc_lower:
        category = "Public Works"
    elif "garbage" in desc_lower or "clean" in desc_lower or "waste" in desc_lower:
        category = "Sanitation"
        
    urgency = random.choice(URGENCY_LEVELS)
    if "emergency" in desc_lower or "urgent" in desc_lower or "danger" in desc_lower or "fire" in desc_lower:
        urgency = "Critical"
    elif "fast" in desc_lower or "soon" in desc_lower:
        urgency = "High"
        
    base_scores = {
        "Low": random.uniform(10, 30),
        "Medium": random.uniform(31, 60),
        "High": random.uniform(61, 85),
        "Critical": random.uniform(86, 100)
    }
    
    priority_score = round(base_scores.get(urgency, 50.0), 2)
    
    return {
        "category": category,
        "urgency": urgency,
        "priority_score": priority_score
    }

