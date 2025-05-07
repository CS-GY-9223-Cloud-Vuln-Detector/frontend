import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "../../styles/Navbar.css"; // Create this file for styling

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Based on Homepage.png, top right corner has "Name" with a toggle/avatar
  // Based on image_acae89.jpg and image_acb195.jpg, the theme is light with a shield icon.
  // Let's aim for a simple navbar.

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="brand-link">
          {/* You can use an SVG or an image for the shield icon */}
          <span role="img" aria-label="Shield Icon" className="shield-icon">
            🛡️
          </span>
          Vulnerability Scanner
        </Link>
      </div>
      <div className="navbar-menu">
        {user ? (
          <>
            {/* <Link to="/dashboard" className="navbar-item">Dashboard</Link> */}
            {/* Displaying user's name/email - as per "Name" in wireframe */}
            <div className="navbar-item user-display">
              {/* Simple text, could be a dropdown later */}
              <span>{user.name || user.email}</span>
            </div>
            <button
              onClick={handleLogout}
              className="navbar-item logout-button"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar-item">
              Login
            </Link>
            <Link to="/register" className="navbar-item">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
