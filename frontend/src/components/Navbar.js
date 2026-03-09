import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>
        🏥 AI Health Assistant
      </div>

      <div style={styles.links}>
        <Link to="/dashboard" style={styles.link}>Dashboard</Link>
        <Link to="/history" style={styles.link}>History</Link>
        <Link to="/appointment" style={styles.link}>Appointment</Link>
        <Link to="/chatbot" style={styles.link}>Chatbot</Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    backgroundColor: "#ffffff",
    padding: "15px 40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
  },
  logo: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#0ea5e9",
  },
  links: {
    display: "flex",
    gap: "25px",
  },
  link: {
    textDecoration: "none",
    color: "#334155",
    fontWeight: "500",
  },
};

export default Navbar;
