import React, { useState } from "react";
import { addProject } from "../../services/projectsService";
import "../../styles/AddProjectForm.css"; // Create this file for styling

const AddProjectForm = ({ onProjectAdded }) => {
  const [githubUrl, setGithubUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!githubUrl.trim()) {
      setError("GitHub URL cannot be empty.");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccessMessage("");

    try {
      const newProjecId = await addProject(githubUrl);

      onProjectAdded(newProjecId); // Call the callback

      setSuccessMessage(`Project from ${githubUrl} added successfully!`);
      setGithubUrl(""); // Clear the input field
    } catch (err) {
      console.error("Failed to add project:", err);
      setError(
        err.response?.data?.message ||
          "Failed to add project. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
      // Clear messages after a few seconds
      setTimeout(() => {
        setError(null);
        setSuccessMessage("");
      }, 5000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-project-form">
      <input
        type="text"
        value={githubUrl}
        onChange={(e) => {
          setGithubUrl(e.target.value);
          if (error) setError(null); // Clear error when user types
        }}
        placeholder="Add your GitHub URL here..."
        className="github-url-input"
        disabled={isSubmitting}
      />
      {/* The button is implicitly part of the form submission,
          but you could have an explicit button if you want to style it separately
          or add it outside the input field in the design.
          The wireframe shows just a text field, implying submission on Enter
          or perhaps a button that's not explicitly drawn but assumed.
          For clarity, let's add a button, but it could be hidden or integrated.
      */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="add-project-button"
      >
        {isSubmitting ? "Adding..." : "Add Project"}
      </button>
      {error && <p className="error-message form-error">{error}</p>}
      {successMessage && (
        <p className="success-message form-success">{successMessage}</p>
      )}
    </form>
  );
};

export default AddProjectForm;
