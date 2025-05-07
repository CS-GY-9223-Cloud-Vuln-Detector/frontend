import React from "react";
import { Link } from "react-router-dom";
import "../../styles/ProjectCard.css"; // Create this file for styling

const ProjectCard = ({ project }) => {
  // Fallback for missing data
  const {
    id,
    name = "Unnamed Project",
    linesOfCode = "N/A",
    language = "N/A",
    currentErrors = "N/A", // Or use 'vulnerabilities'
    // lastScanned // This data is in image_acae89.jpg but not explicitly in Homepage.png's project card
  } = project;

  // Based on Homepage.png, the card shows: Project Name, Info (lines of code, language, current errors)
  // Based on image_acae89.jpg, we see: Project ID, Requested By, Scanned Files, Total Vulnerabilities, Status, Created At, Last Modified

  // Let's try to blend relevant info from Homepage.png for the card on the homepage
  // and acknowledge other details might be on a detail page.

  return (
    <Link to={`/project/${id}`} className="project-card-link">
      <div className="project-card">
        <h3 className="project-name">{name}</h3>
        <div className="project-info">
          <p>
            Language: <span className="info-value">{language}</span>
          </p>
          <p>
            Lines of Code: <span className="info-value">{linesOfCode}</span>
          </p>
          <p>
            Current Vulnerabilities:{" "}
            <span className="info-value">{currentErrors}</span>
          </p>
          {/*
            From image_acae89.jpg, we could also show:
            <p>Status: <span className="info-value">{project.status || "N/A"}</span></p>
            <p>Last Modified: <span className="info-value">{project.lastModified ? new Date(project.lastModified).toLocaleString() : "N/A"}</span></p>
          */}
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
