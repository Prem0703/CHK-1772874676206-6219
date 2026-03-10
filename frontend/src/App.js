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

function App() {

  return (

    <Router>

      <Routes>

        {/* Public Routes */}

        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}

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

        {/* Default redirect */}

        <Route path="*" element={<Navigate to="/" />} />

      </Routes>

    </Router>

  );

}

export default App;