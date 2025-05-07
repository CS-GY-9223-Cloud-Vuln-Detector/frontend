import React from "react";
import ProjectCard from "./ProjectCard";
import "../../styles/ProjectList.css"; // Create this file for styling

const ProjectList = ({ projects }) => {
  if (!projects || projects.length === 0) {
    return <p>No projects to display.</p>;
  }

  return (
    <div className="project-list">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};

export default ProjectList;
