import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

function Register() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async () => {

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {

      await createUserWithEmailAndPassword(auth, email, password);

      alert("Account created successfully");

      navigate("/dashboard");

    } catch (error) {

      alert("Registration failed");

    }

    setLoading(false);

  };

  return (

    <div className="auth-container">

      <div className="auth-card">

        <h2>🏥 AI Health Assistant</h2>

        <h3>Register</h3>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Create Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Register"}
        </button>

        <p>
          Already have account? <Link to="/">Login</Link>
        </p>

      </div>

    </div>

  );

}

export default Register;