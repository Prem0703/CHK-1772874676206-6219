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
          Welcome to <strong>AI Health Assistant</strong>.
          Your health data and privacy are extremely important to us.
          Please review the following information before continuing.
        </p>

        <ul>

          <li>✔ Your personal and medical data is stored securely using encrypted cloud storage.</li>

          <li>✔ We do not share your private information with any third party.</li>

          <li>✔ AI predictions are designed to assist users and are not a replacement for professional medical diagnosis.</li>

          <li>✔ Always consult a certified doctor before making medical decisions.</li>

          <li>✔ Emergency alert system can notify medical assistance during critical situations.</li>

          <li>✔ Your location is accessed only when an emergency alert is triggered.</li>

        </ul>

        <p className="notice-text">
          By clicking continue, you acknowledge and agree to our
          Privacy Policy and Terms of Service.
        </p>

        <button
          className="continue-btn"
          onClick={handleContinue}
        >
          I Understand & Continue
        </button>

      </div>

    </div>

  );

}

export default Safety;