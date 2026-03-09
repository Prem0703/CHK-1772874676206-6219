import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Appointment from "./pages/Appointment";
import Chatbot from "./pages/Chatbot";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div style={{ display: "flex", minHeight: "100vh" }}>
                <Sidebar />

                <div style={{ flex: 1, padding: "30px", background: "#f4f7fb" }}>
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/history" element={<History />} />
                    <Route path="/appointment" element={<Appointment />} />
                    <Route path="/chatbot" element={<Chatbot />} />
                    <Route path="/profile" element={<Profile />} />

                    {/* Default redirect */}
                    <Route path="*" element={<Navigate to="/dashboard" />} />
                  </Routes>
                </div>
              </div>
            </ProtectedRoute>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;
