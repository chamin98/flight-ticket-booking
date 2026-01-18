from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pandas as pd
import pickle

# --------------------------------------------------
# Load model & encoders at startup
# --------------------------------------------------
with open("lightgbm_price_model.pkl", "rb") as f:
    model = pickle.load(f)

with open("feature_encoders.pkl", "rb") as f:
    encoders = pickle.load(f)

FEATURES = [
    "airline",
    "source_city",
    "destination_city",
    "stops",
    "class",
    "duration",
    "days_left"
]

app = FastAPI(
    title="Flight Price Prediction API",
    description="Predict flight price and Buy/Wait recommendation",
    version="1.0.0"
)

# --------------------------------------------------
# Request / Response Models
# --------------------------------------------------
class PredictRequest(BaseModel):
    airline: str
    source_city: str
    destination_city: str
    stops: str
    class_type: str
    duration: float
    days_left: int

class PredictResponse(BaseModel):
    current_price: float
    future_price_7d: float
    recommendation: str
    threshold: str
    model_version: str

# --------------------------------------------------
# Utility functions
# --------------------------------------------------
def encode_features(data: dict):
    encoded = {}
    for col, value in data.items():
        if col in encoders:
            try:
                encoded[col] = encoders[col].transform([value])[0]
            except ValueError:
                raise HTTPException(
                    status_code=400,
                    detail=f"Unknown category '{value}' for field '{col}'"
                )
        else:
            encoded[col] = value
    return encoded

def buy_wait_decision(current, future, threshold=0.05):
    if future < current * (1 - threshold):
        return "WAIT"
    elif future > current * (1 + threshold):
        return "BUY"
    else:
        return "STABLE"

# --------------------------------------------------
# Prediction Endpoint
# --------------------------------------------------
@app.post("/predict", response_model=PredictResponse)
def predict(request: PredictRequest):
    # Prepare input
    input_data = {
        "airline": request.airline,
        "source_city": request.source_city,
        "destination_city": request.destination_city,
        "stops": request.stops,
        "class": request.class_type,
        "duration": request.duration,
        "days_left": request.days_left
    }

    encoded_now = encode_features(input_data)
    df_now = pd.DataFrame([encoded_now])[FEATURES]

    # Predict current price
    current_price = model.predict(df_now)[0]

    # Predict future price (7 days later)
    future_input = encoded_now.copy()
    future_input["days_left"] = max(request.days_left - 7, 1)
    df_future = pd.DataFrame([future_input])[FEATURES]

    future_price = model.predict(df_future)[0]

    # Buy / Wait logic
    decision = buy_wait_decision(current_price, future_price)

    return PredictResponse(
        current_price=round(current_price, 2),
        future_price_7d=round(future_price, 2),
        recommendation=decision,
        threshold="5%",
        model_version="lightgbm_v1"
    )
