from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
from PIL import Image, ImageOps
import numpy as np
import os
from dotenv import load_dotenv
import smtplib
from email.mime.text import MIMEText
from datetime import datetime
import uuid

# =====================================
# INITIAL SETUP prem
# =====================================

app = Flask(__name__)
CORS(app)

load_dotenv()

EMAIL_USER = os.getenv("EMAIL_USER")
EMAIL_PASS = os.getenv("EMAIL_PASS")

print("EMAIL_USER:", EMAIL_USER)

appointments = []

# =====================================
# LOAD MODEL prem
# =====================================

MODEL_PATH = os.path.join("model", "keras_model.h5")
LABELS_PATH = os.path.join("model", "labels.txt")

model = None
class_names = []

try:
    if os.path.exists(MODEL_PATH):
        model = tf.keras.models.load_model(MODEL_PATH, compile=False)

    if os.path.exists(LABELS_PATH):
        with open(LABELS_PATH, "r") as f:
            class_names = [line.strip() for line in f]

except Exception as e:
    print("Model load error:", e)

# =====================================
# EMAIL FUNCTION prem
# =====================================

def send_email(to_email, subject, message):

    if not EMAIL_USER or not EMAIL_PASS:
        print("Email credentials missing")
        return

    try:

        msg = MIMEText(message)

        msg["Subject"] = subject
        msg["From"] = EMAIL_USER
        msg["To"] = EMAIL_USER  # send to yourself for demo

        server = smtplib.SMTP_SSL("smtp.gmail.com", 465)
        
        server.ehlo()

        server.login(EMAIL_USER, EMAIL_PASS)

        server.send_message(msg)

        server.quit()

        print("Email sent successfully")

    except Exception as e:
        print("Email error:", e)

# =====================================
# HOME prem
# =====================================

@app.route("/")
def home():
    return "AI Health Assistant Backend Running"

# =====================================
# IMAGE PREDICTION prem ..
# =====================================

@app.route("/predict", methods=["POST"])
def predict():

    try:

        if "file" not in request.files:
            return jsonify({"error": "No file uploaded"}), 400

        if model is None:
            return jsonify({"error": "Model not loaded"}), 503

        file = request.files["file"]

        image = Image.open(file).convert("RGB")
        image = ImageOps.fit(image, (224, 224), Image.Resampling.LANCZOS)

        image_array = np.asarray(image)

        normalized = (image_array.astype(np.float32) / 127.5) - 1

        data = np.expand_dims(normalized, axis=0)

        prediction = model.predict(data)

        index = int(np.argmax(prediction[0]))

        disease = class_names[index] if index < len(class_names) else "Unknown"

        confidence = float(np.max(prediction[0]))

        return jsonify({
            "disease": disease,
            "confidence": confidence
        })

    except Exception as e:

        print("Prediction error:", e)

        return jsonify({"error": "Prediction failed"}), 500

# =====================================
# SIMPLE CHATBOT prem
# =====================================

@app.route("/chat", methods=["POST"])
def chat():

    try:

        data = request.get_json()

        message = data.get("message", "").lower()

        if "fever" in message:
            reply = "Take rest, drink fluids and consult doctor if fever above 102°F."

        elif "headache" in message:
            reply = "Rest well and drink water. If severe pain consult doctor."

        elif "cold" in message:
            reply = "Take steam and stay hydrated."

        elif "acne" in message:
            reply = "Maintain hygiene and avoid touching your face. If severe book appointment."

        else:
            reply = "Please describe your symptoms clearly."

        return jsonify({"reply": reply})

    except Exception as e:

        print("Chat error:", e)

        return jsonify({"error": "Chat failed"}), 500

# ====================================
# BOOK APPOINTMENT rohit prem both
# ====================================

@app.route("/book-appointment", methods=["POST"])
def book_appointment():

    try:

        data = request.get_json()

        print("Appointment API called")
        print("Data received:", data)

        appointment = {
            "id": str(uuid.uuid4()),
            "patient_name": data.get("patient_name"),
            "patient_email": data.get("patient_email"),
            "doctor_name": data.get("doctor_name"),
            "doctor_email": data.get("doctor_email"),
            "date": data.get("date"),
            "status": "Pending",
            "created_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }

        appointments.append(appointment)

        # send email notification
        send_email(
            appointment["patient_email"],
            "Appointment Request",
            f"""
Hello {appointment['patient_name']},

Your appointment request with Dr. {appointment['doctor_name']} has been received.

Date: {appointment['date']}

AI Health Assistant
"""
        )

        return jsonify({
            "message": "Appointment booked successfully",
            "appointment": appointment
        })

    except Exception as e:

        print("Appointment error:", e)

        return jsonify({"error": "Booking failed"}), 500

# =====================================
# GET DOCTOR APPOINTMENTS rohit
# =====================================

@app.route("/doctor-appointments/<doctor_email>", methods=["GET"])
def doctor_appointments(doctor_email):

    doctor_list = [
        a for a in appointments
        if a["doctor_email"] == doctor_email
    ]

    return jsonify(doctor_list)

# =====================================
# RUN SERVER rohit
# =====================================

if __name__ == "__main__":
    app.run(port=5000, debug=True)