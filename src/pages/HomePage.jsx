// src/pages/HomePage.jsx
import React, { useState, useEffect } from "react";
import AddProjectForm from "../components/Project/AddProjectForm";
import ProjectList from "../components/Project/ProjectList";
import { getProjects } from "../services/projectsService";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom"; // Import Link
import "../styles/HomePage.css";

const HomePage = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRecentProjects = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getProjects();
      setProjects(data);
    } catch (err) {
      setError(err.message || "Failed to fetch projects");
      console.error("Error fetching projects:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentProjects();
  }, []);

  const handleProjectAdded = (newProjectData) => {
    console.log("Project added (data from form):", newProjectData);
    fetchRecentProjects(); // Re-fetch to update the list
  };

  return (
    <div className="homepage-container">
      <div className="top-content-section">
        {/* New wrapper for top part */}
        <header className="homepage-header">
          <h1>
            Welcome to your Vulnerability Scanner
            {user ? `, ${user.name || user.email}` : "!"}
          </h1>
        </header>
        <section className="add-project-section">
          <AddProjectForm onProjectAdded={handleProjectAdded} />
        </section>
      </div>

      {/* This horizontal line is part of the wireframe */}
      <hr className="section-divider" />

      <section className="recent-projects-section">
        <div className="recent-projects-header">
          <h2>Recent Projects</h2>
          {projects.length > 0 && (
            // Ensure DashboardPage is set up in your routes.jsx
            <Link to="/dashboard" className="view-all-button">
              View All
            </Link>
          )}
        </div>
        <div className="project-list-scrollable-container">
          {" "}
          {/* Wrapper for scrollability */}
          {isLoading && <p className="loading-text">Loading projects...</p>}
          {error && <p className="error-message">Error: {error}</p>}
          {!isLoading && !error && projects.length === 0 && (
            <p className="no-projects-text">
              No projects found. Add one above!
            </p>
          )}
          {!isLoading && !error && projects.length > 0 && (
            <ProjectList projects={projects} />
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
