import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import { getAuth } from "firebase/auth";
import emailjs from "@emailjs/browser";
import {
collection,
addDoc,
serverTimestamp,
query,
where,
getDocs,
} from "firebase/firestore";
import { db } from "../firebase";
import "./Dashboard.css";

function Dashboard() {

const auth = getAuth();
const user = auth.currentUser;

const [file, setFile] = useState(null);
const [preview, setPreview] = useState(null);
const [result, setResult] = useState(null);
const [loading, setLoading] = useState(false);

const [stats, setStats] = useState({
total: 0,
high: 0,
medium: 0,
low: 0,
});

useEffect(() => {
if (user) fetchStats();
}, [user]);

/* ---------- FETCH STATS ---------- */

const fetchStats = async () => {

const q = query(
  collection(db, "predictions"),
  where("uid", "==", user.uid)
);

const snapshot = await getDocs(q);

let total = 0;
let high = 0;
let medium = 0;
let low = 0;

snapshot.forEach((doc) => {

  total++;

  const conf = doc.data().confidence;

  if (conf < 0.5) low++;
  else if (conf < 0.8) medium++;
  else high++;

});

setStats({ total, high, medium, low });

};

/* ---------- FILE SELECT ---------- */

const handleFileChange = (e) => {

const selected = e.target.files[0];
if (!selected) return;

setFile(selected);
setPreview(URL.createObjectURL(selected));

};

/* ---------- GET LOCATION ---------- */

const getLocation = () => {

return new Promise((resolve, reject) => {

  if (!navigator.geolocation) {
    reject("Location not supported");
  }

  navigator.geolocation.getCurrentPosition(

    (position) => {

      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      const link =
        "https://www.google.com/maps?q=" + lat + "," + lon;

      resolve(link);

    },

    () => reject("Location permission denied")

  );

});

};

/* ---------- EMERGENCY ---------- */

const callAmbulance = async () => {

try {

  const location = await getLocation();

  const params = {
    name: user.email,
    age: "Unknown",
    blood: "Unknown",
    date: "Emergency",
    time: "Immediate Ambulance Required",
    location: location
  };

  await emailjs.send(
    "service_d0mycg9",
    "template_sm7261w",
    params,
    "p8SiSpXWnsj8pW_6g"
  );

  alert("🚑 Ambulance Alert Sent With Location");

} catch {

  alert("Location permission required");

}

};

/* ---------- AI PREDICT ---------- */

const handlePredict = async () => {

if (!file) return alert("Please select image");

setLoading(true);

const formData = new FormData();
formData.append("file", file);

try {

  const res = await axios.post(
    "http://127.0.0.1:5000/predict",
    formData
  );

  setResult(res.data);

  await addDoc(collection(db, "predictions"), {
    uid: user.uid,
    email: user.email,
    disease: res.data.disease,
    confidence: res.data.confidence,
    createdAt: serverTimestamp(),
  });

  fetchStats();

  if (res.data.confidence >= 0.8) {

    const location = await getLocation();

    const params = {
      name: user.email,
      age: "Unknown",
      blood: "Unknown",
      date: "High Risk Emergency",
      time: "AI detected high risk",
      location: location
    };

    await emailjs.send(
      "service_d0mycg9",
      "template_sm7261w",
      params,
      "p8SiSpXWnsj8pW_6g"
    );

    alert("🚨 High Risk Detected. Doctor Alert Sent.");

  }

} catch {

  alert("Prediction failed");

}

setLoading(false);

};

/* ---------- PDF ---------- */

const downloadPDF = () => {

if (!result) return;

const doc = new jsPDF();

doc.setFontSize(20);
doc.text("AI Medical Report", 20, 20);

doc.setFontSize(14);
doc.text(`Patient: ${user.email}`, 20, 40);
doc.text(`Disease: ${result.disease}`, 20, 60);
doc.text(
  `Confidence: ${Math.round(result.confidence * 100)}%`,
  20,
  80
);

doc.save("Medical_Report.pdf");

};

/* ---------- RISK ---------- */

const getRisk = () => {

if (!result) return null;

if (result.confidence < 0.5)
  return { label: "Low Risk", color: "#28a745" };

if (result.confidence < 0.8)
  return { label: "Medium Risk", color: "#ff9800" };

return { label: "High Risk", color: "#dc3545" };

};

return (

<div className="dashboard-container">

  {/* ---------- STATS ---------- */}

  <div className="stats-grid">

    <div className="stat-card blue">
      <h3>{stats.total}</h3>
      <p>Total Predictions</p>
    </div>

    <div className="stat-card red">
      <h3>{stats.high}</h3>
      <p>High Risk</p>
    </div>

    <div className="stat-card orange">
      <h3>{stats.medium}</h3>
      <p>Medium Risk</p>
    </div>

    <div className="stat-card green">
      <h3>{stats.low}</h3>
      <p>Low Risk</p>
    </div>

  </div>

  {/* ---------- PREDICTION CARD ---------- */}

  <div className="prediction-card">

    <h2>AI Disease Prediction</h2>

    <div className="upload-section">

      <input type="file" onChange={handleFileChange} />

      <button onClick={handlePredict}>
        {loading ? "Analyzing..." : "Predict"}
      </button>

    </div>

    {preview && (
      <div className="image-preview">
        <img src={preview} alt="preview" />
      </div>
    )}

    {result && (

      <div className="result-card">

        <h3>Disease: {result.disease}</h3>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${Math.round(result.confidence * 100)}%`,
              backgroundColor: getRisk().color
            }}
          />
        </div>

        <p>
          Confidence: {Math.round(result.confidence * 100)}%
        </p>

        <span
          className="risk-badge"
          style={{ backgroundColor: getRisk().color }}
        >
          {getRisk().label}
        </span>

        <button
          className="download-btn"
          onClick={downloadPDF}
        >
          Download Medical Report
        </button>

        {/* ---------- HEALTH TIPS ---------- */}

        <div
          style={{
            marginTop: "20px",
            padding: "18px",
            background: "#f5f7ff",
            borderRadius: "10px",
            border: "1px solid #ddd",
            color: "#333"
          }}
        >

          <h4 style={{marginBottom:"12px", color:"#0b3d91"}}>
          Health Care Tips
          </h4>

          <ul style={{fontSize:"14px", lineHeight:"1.8"}}>

            <li>Maintain proper skin hygiene.</li>
            <li>Drink 2–3 liters of water daily.</li>
            <li>Avoid touching infected skin.</li>
            <li>Use clean towels.</li>
            <li>Wash hands frequently.</li>
            <li>Follow a balanced diet.</li>
            <li>Avoid junk food.</li>
            <li>Get 7–8 hours sleep.</li>
            <li>Reduce stress.</li>
            <li>Protect skin from sunlight.</li>
            <li>Use dermatologist recommended products.</li>
            <li>Keep skin moisturized.</li>
            <li>Avoid harsh chemicals.</li>
            <li>Wear clean clothes.</li>
            <li>Exercise regularly.</li>
            <li>Avoid self medication.</li>
            <li>Consult doctor if symptoms increase.</li>
            <li>Regular health checkups.</li>
            <li>Follow doctor treatment.</li>

          </ul>

        </div>

      </div>

    )}

    {/* ---------- EMERGENCY ---------- */}

    <button
      className="emergency-btn"
      onClick={callAmbulance}
    >
      🚑 Call Ambulance / Emergency Help
    </button>

  </div>

</div>

);

}

export default Dashboard;