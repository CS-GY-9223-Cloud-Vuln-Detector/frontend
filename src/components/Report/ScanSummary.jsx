// src/components/Report/ScanSummary.jsx
import React from "react";
import "../../styles/ScanSummary.css"; // Create this CSS file

const ScanSummary = ({ summary }) => {
  if (!summary) return null;

  return (
    <div className="scan-summary-card">
      <h2 className="summary-title">Scan Overview</h2>
      <div className="summary-grid">
        <div className="summary-item">
          <span className="summary-label">Project ID:</span>
          <span className="summary-value">{summary.projectId}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Scan ID:</span>
          <span className="summary-value">{summary.scanId}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Project Name:</span>
          <span className="summary-value">{summary.projectName || "N/A"}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Total Vulnerabilities:</span>
          <span className="summary-value">{summary.totalVulnerabilities}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Files Affected:</span>
          <span className="summary-value">{summary.filesAffected}</span>
        </div>
        {/* <div className="summary-item">
          <span className="summary-label">Total Files Scanned:</span>
          <span className="summary-value">{summary.totalFilesScanned || 'N/A'}</span>
        </div> */}
        {summary.createdAt && (
          <div className="summary-item">
            <span className="summary-label">Scan Date:</span>
            <span className="summary-value">
              {new Date(summary.createdAt).toLocaleString()}
            </span>
          </div>
        )}
      </div>
      {/* Optional: Display vulnerability counts by type from image_acb195.jpg */}
      {/* {summary.vulnerabilityCounts && summary.vulnerabilityCounts.length > 0 && (
        <div className="vulnerability-counts">
          <h3>Vulnerability Counts:</h3>
          <ul>
            {summary.vulnerabilityCounts.map(vc => (
              <li key={vc.type}>{vc.type}: {vc.count}</li>
            ))}
          </ul>
        </div>
      )} */}
    </div>
  );
};

export default ScanSummary;
