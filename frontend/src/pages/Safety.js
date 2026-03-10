import React from "react";
import { useNavigate } from "react-router-dom";
import "./Safety.css";

function Safety() {

  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/dashboard");
  };

  return (

    <div className="safety-container">

      <div className="safety-card">

        <h2>🔒 Privacy & Safety Notice</h2>

        <p>
        Welcome to AI Health Assistant.
        Your health and privacy are our top priorities.
        </p>

        <ul>

          <li>✔ Your personal and medical data is securely stored.</li>

          <li>✔ We never share your private information with third parties.</li>

          <li>✔ AI predictions are for assistance purposes only.</li>

          <li>✔ Always consult a certified doctor for medical advice.</li>

          <li>✔ Emergency alert system is available for critical situations.</li>

          <li>✔ Your location is only used during emergency requests.</li>

        </ul>

        <p>
        By continuing, you agree to our Privacy Policy and Terms of Service.
        </p>

        <button onClick={handleContinue}>
          I Understand & Continue
        </button>

      </div>

    </div

  );

}

export default Safety;