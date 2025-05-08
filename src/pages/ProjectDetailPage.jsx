import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getProjectById } from "../services/projectsService";
import { getProjectScans, triggerScan } from "../services/scansService";
import "../styles/ProjectDetailPage.css";

// Helper functions
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleString();
};

const getVulnerabilityClass = (errorCount) => {
  if (errorCount === 0 || errorCount === "N/A") return "severity-none";
  if (errorCount < 3) return "severity-low";
  if (errorCount < 6) return "severity-medium";
  return "severity-high";
};

const getScanStatusClass = (status) => {
  switch (status) {
    case 3:
      return "status-success";
    case 2:
      return "status-pending";
    case 1:
      return "status-pending";
    case 0:
      return "status-pending";
    case -1:
      return "status-error";
    default:
      return "status-unknown";
  }
};

const ProjectDetailPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isScanLoading, setIsScanLoading] = useState(false);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        setLoading(true);

        // Fetch project details
        const projectData = await getProjectById(projectId);
        setProject(projectData);

        if (projectData) {
          try {
            // Fetch scans for the project
            const scansData = await getProjectScans(projectId);
            setScans(scansData || []);
          } catch (scanError) {
            console.error("Error fetching scans:", scanError);
            setError("Failed to load scan data. Please try again later.");
            setScans([]);
          }
        }
      } catch (error) {
        console.error("Error fetching project data:", error);
        setError("Failed to load project data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjectData();
  }, [projectId]);

  const handleViewScanDetails = (scanId) => {
    navigate(`/projects/${projectId}/scans/${scanId}`);
  };

  if (loading) {
    return <div className="loading-container">Loading project details...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <Link to="/" className="back-button">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  const handleScanNow = async () => {
    try {
      setIsScanLoading(true);
      const scanResult = await triggerScan(projectId);

      // Add the new scan to the scans list if successful
      if (scanResult) {
        // Refresh the scans list to show the new scan
        const scansData = await getProjectScans(projectId);
        setScans(scansData || []);
      }
    } catch (error) {
      console.error("Error triggering scan:", error);
      // Show error message to user
      alert("Failed to start scan. Please try again.");
    } finally {
      setIsScanLoading(false);
    }
  };

  return (
    <div className="project-detail-page">
      <div className="page-header">
        <Link to="/" className="back-link">
          &larr; Back to Projects
        </Link>
        <h1>{project?.name || "Project Details"}</h1>
      </div>

      <div className="project-overview">
        <div className="project-info">
          <h2>Project Information</h2>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Repository:</span>
              <a
                href={project?.repo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="repo-url"
              >
                {project?.repo_url}
              </a>
            </div>
            <div className="info-item">
              <span className="info-label">Created:</span>
              <span>{formatDate(project?.created_at)}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Last Modified:</span>
              <span>{formatDate(project?.modified_at)}</span>
            </div>
            <div className="info-item">
              <span className="info-label">File Count:</span>
              <span>{project?.file_count || 0}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Current Vulnerabilities:</span>
              <span
                className={getVulnerabilityClass(scans[0]?.total_vuln_count)}
              >
                {scans[0]?.total_vuln_count || 0}
              </span>
            </div>
          </div>
        </div>

        <div className="project-actions">
          <button
            className="scan-now-btn"
            onClick={handleScanNow}
            disabled={isScanLoading}
          >
            Scan Now
          </button>
        </div>
      </div>

      <div className="scans-section">
        <h2>Scan History</h2>
        {scans.length === 0 ? (
          <p className="no-scans-message">No scans found for this project.</p>
        ) : (
          <div className="scans-table-wrapper">
            <table className="scans-table">
              <thead>
                <tr>
                  <th>Scan ID</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Vulnerabilities</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {scans.map((scan) => (
                  <tr key={scan.id}>
                    <td>{scan.id}</td>
                    <td>{formatDate(scan.created_at)}</td>
                    <td>
                      <span
                        className={`status-badge ${getScanStatusClass(scan.status_code)}`}
                      >
                        {scan.status}
                      </span>
                    </td>
                    <td>{scan.total_vuln_count || 0}</td>
                    <td>
                      <button
                        className="view-details-btn"
                        onClick={() => handleViewScanDetails(scan.id)}
                        disabled={
                          scan.status_code !== 2 && scan.status_code !== 3
                        }
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
export default ProjectDetailPage;
