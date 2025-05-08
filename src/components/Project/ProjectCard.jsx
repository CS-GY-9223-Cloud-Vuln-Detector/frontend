import React from "react";
import { Link } from "react-router-dom";
import "../../styles/ProjectCard.css";

const ProjectCard = ({ project }) => {
  // Destructure with fallbacks for missing data
  const {
    id,
    name = "Unnamed Project",
    currentErrors = "N/A",
    created_at,
    modified_at,
    repo_url,
    file_count = 0,
    project_last_scanned_at,
  } = project;

  // Format dates
  const formatDate = (dateString) => {
    if (!dateString) return "Never";
    return new Date(dateString).toLocaleDateString();
  };

  // Determine vulnerability severity class
  const getVulnerabilityClass = () => {
    if (currentErrors === "N/A" || currentErrors === 0) return "severity-none";
    if (currentErrors < 3) return "severity-low";
    if (currentErrors < 6) return "severity-medium";
    return "severity-high";
  };

  // Get repository name from URL
  const getRepoName = () => {
    if (!repo_url) return "N/A";
    try {
      return new URL(repo_url).pathname.split("/").pop();
    } catch (e) {
      return repo_url;
    }
  };

  return (
    <Link to={`/projects/${id}`} className="project-card-link">
      <div className="project-card">
        <div className="card-header">
          <h3 className="project-name">{name}</h3>
          <div className={`vulnerability-badge ${getVulnerabilityClass()}`}>
            {currentErrors}
          </div>
        </div>

        <div className="repo-section">
          <b className="icon repo-icon">📁</b>
          <a
            href={repo_url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="repo-link"
          >
            {getRepoName()}
          </a>
        </div>

        <div className="project-details">
          <div className="detail-item">
            <b className="icon">📄</b>
            <span className="detail-label">Files</span>
            <span className="detail-value">{file_count}</span>
          </div>

          <div className="detail-item">
            <b className="icon">🕒</b>
            <span className="detail-label">Created</span>
            <span className="detail-value">{formatDate(created_at)}</span>
          </div>

          <div className="detail-item">
            <b className="icon">✏️</b>
            <span className="detail-label">Modified</span>
            <span className="detail-value">{formatDate(modified_at)}</span>
          </div>

          <div className="detail-item">
            <b className="icon">🔍</b>
            <span className="detail-label">Scanned</span>
            <span className="detail-value">
              {formatDate(project_last_scanned_at)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
