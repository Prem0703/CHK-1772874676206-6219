import os
os.environ["CUDA_VISIBLE_DEVICES"] = "-1"

from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
from PIL import Image
import numpy as np
from dotenv import load_dotenv
import smtplib
from email.mime.text import MIMEText
from datetime import datetime
import uuid

# ===============================
# APP SETUP
# ===============================

app = Flask(__name__)
CORS(app)

load_dotenv()

EMAIL_USER = os.getenv("EMAIL_USER")
EMAIL_PASS = os.getenv("EMAIL_PASS")

print("EMAIL_USER:", EMAIL_USER)

appointments = []

# ===============================
# LOAD AI MODEL
# ===============================

MODEL_PATH = os.path.join("model", "keras_model.h5")
LABELS_PATH = os.path.join("model", "labels.txt")

model = None
class_names = []

try:

    if os.path.exists(MODEL_PATH):

        model = tf.keras.models.load_model(MODEL_PATH, compile=False)

        print("Model Loaded Successfully")

    else:
        print("Model file not found")

    if os.path.exists(LABELS_PATH):

        with open(LABELS_PATH, "r") as f:

            class_names = [line.strip() for line in f]

        print("Labels Loaded:", class_names)

    else:
        print("Labels file not found")

except Exception as e:

    print("Model load error:", e)

# ===============================
# EMAIL FUNCTION
# ===============================

def send_email(to_email, subject, message):

    if not EMAIL_USER or not EMAIL_PASS:
        print("Email credentials missing")
        return

    try:

        msg = MIMEText(message)

        msg["Subject"] = subject
        msg["From"] = EMAIL_USER
        msg["To"] = EMAIL_USER

        server = smtplib.SMTP_SSL("smtp.gmail.com", 465)

        server.login(EMAIL_USER, EMAIL_PASS)

        server.send_message(msg)

        server.quit()

        print("Email sent")

    except Exception as e:

        print("Email error:", e)

# ===============================
# HOME
# ===============================

@app.route("/")
def home():
    return "AI Health Assistant Backend Running"

# ===============================
# AI PREDICTION
# ===============================

@app.route("/predict", methods=["POST"])
def predict():

    try:

        if "file" not in request.files:
            return jsonify({"error": "No file uploaded"}), 400

        if model is None:
            return jsonify({"error": "Model not loaded"}), 500

        file = request.files["file"]

        image = Image.open(file).convert("RGB")

        image = image.resize((224, 224))

        image_array = np.array(image)

        normalized = (image_array.astype(np.float32) / 127.5) - 1

        data = np.expand_dims(normalized, axis=0)

        prediction = model.predict(data)

        print("Prediction:", prediction)

        index = int(np.argmax(prediction))

        print("Index:", index)

        if index < len(class_names):
            disease = class_names[index]
        else:
            disease = "Unknown"

        confidence = float(np.max(prediction))

        print("Disease:", disease)
        print("Confidence:", confidence)

        return jsonify({
            "disease": disease,
            "confidence": confidence
        })

    except Exception as e:

        print("Prediction error:", e)

        return jsonify({"error": "Prediction failed"}), 500

# ===============================
# CHATBOT By openai
# ===============================

@app.route("/chat", methods=["POST"])
def chat():

    try:

        data = request.get_json()

        message = data.get("message", "").lower()

        if "fever" in message:
            reply = """
Fever Information

Common symptoms:
- Feeling hot or chills
- Sweating
- Headache
- Body aches
- Weakness or tiredness
- Loss of appetite

What you can do at home:
- Rest and avoid heavy activity
- Drink plenty of fluids (water, ORS, coconut water, soups)
- Eat light food like khichdi, fruits, or soup
- Keep the body cool (light clothes, normal room temperature)
- If needed, take Paracetamol (follow proper dosage)

See a doctor urgently if:
- Fever is above 39–40 °C
- Lasts more than 2–3 days
- Severe headache, breathing problems, vomiting, rash, or confusion
- Feeling very weak or dehydrated
"""

        elif "headache" in message:
            reply = "Rest well and stay hydrated..."

        elif "cold" in message:
            reply = "Take steam and warm fluids."

        elif "acne" in message:
            reply = "Maintain skin hygiene and consult dermatologist."

        else:
            reply = "Please describe your symptoms clearly."

        return jsonify({"reply": reply})

    except Exception as e:

        print("Chat error:", e)

        return jsonify({"error": "Chat failed"}), 500

# ===============================
# BOOK APPOINTMENT
# ===============================

@app.route("/book-appointment", methods=["POST"])
def book_appointment():

    try:

        data = request.get_json()

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

        send_email(
            appointment["patient_email"],
            "Appointment Request",
            f"""
Hello {appointment['patient_name']}

Your appointment request with Dr. {appointment['doctor_name']} has been received.

Date: {appointment['date']}

AI Health Assistant
"""
        )

        return jsonify({
            "message": "Appointment booked",
            "appointment": appointment
        })

    except Exception as e:

        print("Appointment error:", e)

        return jsonify({"error": "Booking failed"}), 500

# ===============================
# GET DOCTOR APPOINTMENTS
# ===============================

@app.route("/doctor-appointments/<doctor_email>", methods=["GET"])
def doctor_appointments(doctor_email):

    doctor_list = [

        a for a in appointments

        if a["doctor_email"] == doctor_email

    ]

    return jsonify(doctor_list)

# ===============================
# RUN SERVER sum
# ===============================

if __name__ == "__main__":

    app.run(port=5000, debug=True)