// src/pages/RegisterPage.jsx
import React from "react";
import RegisterForm from "../components/Auth/RegisterForm";
import "../styles/AuthPage.css"; // Reusing the same CSS as LoginPage

const RegisterPage = () => {
  return (
    <div className="auth-page-container">
      <div className="auth-form-container">
        <h1 className="auth-title">Create Your Account</h1>
        <p className="auth-subtitle">
          Join to start scanning your GitHub projects for vulnerabilities.
        </p>
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
