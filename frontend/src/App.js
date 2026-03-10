import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Appointment from "./pages/Appointment";
import Chatbot from "./pages/Chatbot";
import Profile from "./pages/Profile";
import Safety from "./pages/Safety";
import MedicineReminder from "./pages/MedicineReminder";
import HealthChallenge from "./pages/HealthChallenge";

function App() {

  return (

    <Router>

      <Routes>

        {/* Public Routes */}

        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* History */}

        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <Layout>
                <History />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Appointment */}

        <Route
          path="/appointment"
          element={
            <ProtectedRoute>
              <Layout>
                <Appointment />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Chatbot */}

        <Route
          path="/chatbot"
          element={
            <ProtectedRoute>
              <Layout>
                <Chatbot />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Profile */}

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Layout>
                <Profile />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Medicine Reminder */}

        <Route
          path="/reminder"
          element={
            <ProtectedRoute>
              <Layout>
                <MedicineReminder />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Health Challenge */}

        <Route
          path="/challenge"
          element={
            <ProtectedRoute>
              <Layout>
                <HealthChallenge />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Safety Page */}

        <Route
          path="/safety"
          element={
            <ProtectedRoute>
              <Layout>
                <Safety />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Default Redirect */}

        <Route path="*" element={<Navigate to="/" />} />

      </Routes>

    </Router>

  );

}

export default App;