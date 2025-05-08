import React from "react";
import { useLocation, Link } from "react-router-dom";
import "../styles/AuthPage.css";

const EmailVerificationPage = () => {
  const location = useLocation();
  const { email } = location.state || { email: "your email" };

  return (
    <div className="auth-page-container">
      <div className="auth-form-container">
        <h1 className="auth-title">Verify Your Email</h1>
        <div className="verification-content">
          <p className="verification-message">
            We've sent a verification link to <strong>{email}</strong>
          </p>
          <p className="verification-instructions">
            Please check your inbox and click on the verification link to
            activate your account.
          </p>
          <div className="verification-icon">✉️</div>
          <p className="verification-note">
            If you don't see the email, check your spam folder or{" "}
            <Link to="/register" className="resend-link">
              try registering again
            </Link>
            .
          </p>
          <Link to="/login" className="back-to-login">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationPage;
