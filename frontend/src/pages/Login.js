import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    setLoading(true);

    try {

      await signInWithEmailAndPassword(auth, email, password);

      // go to safety page first
      navigate("/safety");

    } catch (error) {

      alert("Invalid email or password");

    }

    setLoading(false);

  };

  return (

    <div className="auth-container">

      <div className="auth-card">

        <h2>🏥 AI Health Assistant</h2>

        <h3>Login</h3>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p>
          Don’t have account?{" "}
          <Link to="/register">Register</Link>
        </p>

      </div>

    </div>

  );

}

export default Login;