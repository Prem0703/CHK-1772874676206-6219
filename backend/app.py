import os

os.environ["CUDA_VISIBLE_DEVICES"] = "-1"

from datetime import datetime, timezone
from email.mime.text import MIMEText
import smtplib
import uuid

import numpy as np
import tensorflow as tf
from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS
from PIL import Image, UnidentifiedImageError

load_dotenv()

app = Flask(__name__)
app.config["MAX_CONTENT_LENGTH"] = 8 * 1024 * 1024

allowed_origins = [origin.strip() for origin in os.getenv("CORS_ORIGINS", "").split(",") if origin.strip()]
CORS(app, resources={r"/*": {"origins": allowed_origins or "*"}})

EMAIL_USER = os.getenv("EMAIL_USER")
EMAIL_PASS = os.getenv("EMAIL_PASS")

appointments = []

MODEL_PATH = os.path.join("model", "keras_model.h5")
LABELS_PATH = os.path.join("model", "labels.txt")
PREDICTION_THRESHOLD = float(os.getenv("PREDICTION_THRESHOLD", "0.70"))

model = None
class_names = []

try:
    if os.path.exists(MODEL_PATH):
        model = tf.keras.models.load_model(MODEL_PATH, compile=False)
        print("Model loaded successfully")

    if os.path.exists(LABELS_PATH):
        with open(LABELS_PATH, "r", encoding="utf-8") as f:
            class_names = [line.strip() for line in f if line.strip()]
        print("Labels loaded:", class_names)
except Exception as exc:
    print("Model load error:", exc)


def send_email(to_email, subject, message):
    if not EMAIL_USER or not EMAIL_PASS:
        print("Email credentials missing")
        return False

    if not to_email:
        return False

    msg = MIMEText(message)
    msg["Subject"] = subject
    msg["From"] = EMAIL_USER
    msg["To"] = to_email

    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465, timeout=15) as server:
            server.login(EMAIL_USER, EMAIL_PASS)
            server.send_message(msg)
        return True
    except (OSError, smtplib.SMTPException) as exc:
        print("Email error:", exc)
        return False


@app.route("/")
def home():
    return jsonify({"status": "ok", "service": "AI Health Assistant Backend"})


@app.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    if model is None:
        return jsonify({"error": "AI model is unavailable"}), 503

    file = request.files["file"]
    if not file.filename:
        return jsonify({"error": "No image selected"}), 400

    try:
        image = Image.open(file).convert("RGB").resize((224, 224))
        image_array = np.asarray(image, dtype=np.float32)
        data = np.expand_dims((image_array / 127.5) - 1.0, axis=0)

        prediction = model.predict(data, verbose=0)
        probabilities = np.asarray(prediction).reshape(-1)
        index = int(np.argmax(probabilities))
        confidence = float(probabilities[index])

        disease = class_names[index] if index < len(class_names) else "Unknown"

        if confidence < PREDICTION_THRESHOLD or disease == "Unknown":
            return jsonify({
                "disease": "Uncertain",
                "confidence": confidence,
                "message": "The image could not be classified confidently. Please consult a qualified healthcare professional."
            })

        return jsonify({"disease": disease, "confidence": confidence})

    except (UnidentifiedImageError, OSError, ValueError) as exc:
        print("Image processing error:", exc)
        return jsonify({"error": "Invalid or unsupported image"}), 400
    except Exception as exc:
        print("Prediction error:", exc)
        return jsonify({"error": "Prediction failed"}), 500


@app.route("/chat", methods=["POST"])
def chat():
    try:
        data = request.get_json(silent=True) or {}
        message = str(data.get("message", "")).strip().lower()

        if not message:
            return jsonify({"error": "Message is required"}), 400

        if "fever" in message:
            reply = "For fever, rest and stay hydrated. Seek medical care urgently for severe breathing difficulty, confusion, severe dehydration, or a persistent/high fever. This assistant does not replace a doctor."
        elif "headache" in message:
            reply = "For a mild headache, rest, hydrate, and avoid triggers when possible. Seek medical care for a sudden severe headache or headache with neurological symptoms, confusion, or serious illness."
        elif "cold" in message:
            reply = "For common cold symptoms, rest, drink fluids, and monitor your symptoms. Seek medical advice if symptoms are severe, worsening, or persistent."
        elif "acne" in message:
            reply = "For acne, use gentle skin care and avoid picking lesions. A dermatologist can recommend treatment based on severity and skin type."
        else:
            reply = "Please describe your symptoms clearly. For urgent or severe symptoms, contact a qualified healthcare professional rather than relying on this assistant."

        return jsonify({"reply": reply})
    except Exception as exc:
        print("Chat error:", exc)
        return jsonify({"error": "Chat failed"}), 500


@app.route("/book-appointment", methods=["POST"])
def book_appointment():
    try:
        data = request.get_json(silent=True) or {}
        required = ["patient_name", "patient_email", "doctor_name", "doctor_email", "date"]
        missing = [field for field in required if not str(data.get(field, "")).strip()]
        if missing:
            return jsonify({"error": "Missing required fields", "fields": missing}), 400

        appointment = {
            "id": str(uuid.uuid4()),
            "patient_name": str(data["patient_name"]).strip(),
            "patient_email": str(data["patient_email"]).strip(),
            "doctor_name": str(data["doctor_name"]).strip(),
            "doctor_email": str(data["doctor_email"]).strip(),
            "date": str(data["date"]).strip(),
            "status": "Pending",
            "created_at": datetime.now(timezone.utc).isoformat()
        }

        appointments.append(appointment)

        email_sent = send_email(
            appointment["patient_email"],
            "Appointment Request",
            f"Hello {appointment['patient_name']},\n\nYour appointment request with Dr. {appointment['doctor_name']} has been received.\n\nDate: {appointment['date']}\n\nAI Health Assistant"
        )

        return jsonify({
            "message": "Appointment booked",
            "appointment": appointment,
            "email_sent": email_sent
        }), 201
    except Exception as exc:
        print("Appointment error:", exc)
        return jsonify({"error": "Booking failed"}), 500


@app.route("/doctor-appointments/<doctor_email>", methods=["GET"])
def doctor_appointments(doctor_email):
    doctor_list = [a for a in appointments if a["doctor_email"].lower() == doctor_email.lower()]
    return jsonify(doctor_list)


if __name__ == "__main__":
    app.run(port=int(os.getenv("PORT", "5000")), debug=os.getenv("FLASK_DEBUG", "false").lower() == "true")
