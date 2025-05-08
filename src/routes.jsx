import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import ScanReportPage from "./pages/ScanReportPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import { useAuth } from "./hooks/useAuth";

// ProtectedRoute component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" replace />;
  }
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/verify-email" element={<EmailVerificationPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/projects/:projectId"
        element={
          <ProtectedRoute>
            <ProjectDetailPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/projects/:projectId/scans/:scanId" // Route for the specific scan report page
        element={
          <ProtectedRoute>
            <ScanReportPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" />} /> {/* Fallback route */}
    </Routes>
  );
};

export default AppRoutes;
