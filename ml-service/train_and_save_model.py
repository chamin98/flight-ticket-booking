import pandas as pd
import lightgbm as lgb
import pickle
from sklearn.preprocessing import LabelEncoder

# Load dataset
df = pd.read_csv("Clean_Dataset.csv")

# Features
features = [
    "airline",
    "source_city",
    "destination_city",
    "stops",
    "class",
    "duration",
    "days_left"
]

target = "price"

X = df[features].copy()
y = df[target]

# Encode categorical features
encoders = {}
categorical_cols = ["airline", "source_city", "destination_city", "stops", "class"]

for col in categorical_cols:
    le = LabelEncoder()
    X[col] = le.fit_transform(X[col])
    encoders[col] = le

# Train set (time-aware)
train_mask = df["days_left"] > 10
X_train = X[train_mask]
y_train = y[train_mask]

# Train LightGBM
model = lgb.LGBMRegressor(
    objective="regression_l1",
    n_estimators=600,
    learning_rate=0.05,
    num_leaves=31,
    subsample=0.8,
    colsample_bytree=0.8,
    random_state=42
)

model.fit(X_train, y_train)

# Save model
with open("lightgbm_price_model.pkl", "wb") as f:
    pickle.dump(model, f)

# Save encoders
with open("feature_encoders.pkl", "wb") as f:
    pickle.dump(encoders, f)

print("Model and encoders saved successfully.")
