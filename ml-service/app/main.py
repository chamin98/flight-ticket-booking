from fastapi import FastAPI
from app.schemas import PredictionRequest, PredictionResponse
from app.predict import predict_price

app = FastAPI(title="Flight Price Prediction Service")

@app.get("/")
def health_check():
    return {"status": "ML service is running"}

@app.post("/predict", response_model=PredictionResponse)
def predict(data: PredictionRequest):
    price = predict_price(data)
    return {"predicted_price": price}
