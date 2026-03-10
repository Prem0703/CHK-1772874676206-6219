import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import "./Sidebar.css";

function Sidebar() {

  const auth = getAuth();
  const user = auth.currentUser;
  const location = useLocation();
  const navigate = useNavigate();

  const menu = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "History", path: "/history" },
    { name: "Appointment", path: "/appointment" },
    { name: "Chatbot", path: "/chatbot" },
    { name: "Profile", path: "/profile" }
  ];

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (

    <div className="sidebar">

      {/* Profile Card */}

      <div className="profile-card">
        <h3>Patient Profile</h3>
        <p>{user?.email || "User"}</p>
      </div>

      {/* Menu */}

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

      {/* Logout */}

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>

    </div>

  );

}

export default Sidebar;