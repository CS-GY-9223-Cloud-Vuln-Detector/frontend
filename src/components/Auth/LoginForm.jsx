// src/components/Auth/LoginForm.jsx
import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/AuthForm.css"; // We'll create this CSS file

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    if (!email || !password) {
      setError("Please enter both email and password.");
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await login({ email, password });
      if (result.success) {
        navigate("/"); // Redirect to homepage or dashboard on successful login
      } else {
        setError(
          result.message || "Login failed. Please check your credentials.",
        );
      }
    } catch (err) {
      // This catch block might be redundant if AuthContext's login handles all errors
      // and returns them in the result object.
      setError("An unexpected error occurred. Please try again.");
      console.error("Login submit error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          disabled={isSubmitting}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          disabled={isSubmitting}
        />
      </div>
      {error && <p className="error-message">{error}</p>}
      <button type="submit" className="submit-button" disabled={isSubmitting}>
        {isSubmitting ? "Logging In..." : "Login"}
      </button>
      <p className="auth-switch-link">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </form>
  );
};

export default LoginForm;
