// src/pages/LoginPage.jsx
import React from "react";
import LoginForm from "../components/Auth/LoginForm";
import "../styles/AuthPage.css"; // We'll create this CSS file

const LoginPage = () => {
  return (
    <div className="auth-page-container">
      <div className="auth-form-container">
        <h1 className="auth-title">Login to Your Account</h1>
        <p className="auth-subtitle">
          Access your vulnerability scanning dashboard.
        </p>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
