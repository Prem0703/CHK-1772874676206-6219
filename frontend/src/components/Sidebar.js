import React from "react";
import { Link, useLocation } from "react-router-dom";
import { getAuth } from "firebase/auth";
import "./Sidebar.css";

function Sidebar() {
  const auth = getAuth();
  const user = auth.currentUser;
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "History", path: "/history" },
    { name: "Appointment", path: "/appointment" },
    { name: "Chatbot", path: "/chatbot" },
    { name: "Profile", path: "/profile" },
  ];

  return (
    <div className="sidebar">
      <div className="profile-card">
        <h3>Patient Profile</h3>
        <p>{user?.email}</p>
      </div>

      <div className="menu">
        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`menu-item ${
              location.pathname === item.path ? "active" : ""
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
