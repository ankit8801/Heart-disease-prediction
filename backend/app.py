from pathlib import Path

import joblib
import numpy as np
import pandas as pd
from flask import Flask, jsonify, request
from flask_cors import CORS


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]}})

MODEL_PATH = Path(__file__).resolve().parent / "heart_model.joblib"
if not MODEL_PATH.exists():
    raise FileNotFoundError(f"Model file not found: {MODEL_PATH}")

artifact = joblib.load(MODEL_PATH)
model = artifact["model"]
feature_columns = artifact["feature_columns"]
target_mapping = artifact["target_mapping"]

print("Heart Disease Prediction Model Loaded!")
print("Expected features:", feature_columns)


@app.get("/")
def home():
    return jsonify({
        "message": "Heart Disease Prediction API is running",
        "status": "success",
    })


@app.get("/health")
def health_check():
    return jsonify({"status": "healthy", "model_loaded": model is not None})


@app.post("/predict")
def predict():
    if not request.is_json:
        return jsonify({"error": "Request must contain JSON data"}), 400

    payload = request.get_json(silent=True)
    if not isinstance(payload, dict):
        return jsonify({"error": "Invalid JSON data"}), 400

    features = payload.get("features", payload)
    if not isinstance(features, dict):
        return jsonify({"error": "Features must be a JSON object"}), 400

    missing = [
        column for column in feature_columns
        if features.get(column) in (None, "")
    ]
    if missing:
        return jsonify({
            "error": "Some required features are missing",
            "missing_features": missing,
        }), 400

    try:
        values = {column: float(features[column]) for column in feature_columns}
        if not all(np.isfinite(value) for value in values.values()):
            raise ValueError

        input_data = pd.DataFrame([values], columns=feature_columns)
        prediction = int(model.predict(input_data)[0])
        probability = None

        if hasattr(model, "predict_proba"):
            probabilities = model.predict_proba(input_data)[0]
            classes = list(model.named_steps["classifier"].classes_)
            if 1 in classes:
                probability = round(float(probabilities[classes.index(1)]) * 100, 2)

        return jsonify({
            "success": True,
            "prediction": prediction,
            "prediction_label": target_mapping.get(prediction, str(prediction)),
            "class_1_probability_percent": probability,
            "disclaimer": "Educational prediction only. This result is not a medical diagnosis.",
        })
    except (TypeError, ValueError, OverflowError):
        return jsonify({"error": "Feature values must be valid numbers"}), 400
    except Exception:
        app.logger.exception("Prediction failed")
        return jsonify({"error": "The model could not process this prediction"}), 500


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=False)
