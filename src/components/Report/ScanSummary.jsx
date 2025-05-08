// src/components/Report/ScanSummary.jsx
import React from "react";
import "../../styles/ScanSummary.css"; // Create this CSS file

const ScanSummary = ({ summary }) => {
  if (!summary) return null;

  return (
    <div className="scan-summary-card">
      <h2 className="summary-title">Scan Overview</h2>
      <div className="summary-grid">
        {/* <div className="summary-item">
          <span className="summary-label">Project ID:</span>
          <span className="summary-value">{summary.project_id}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Scan ID:</span>
          <span className="summary-value">{summary.scan_id}</span>
        </div> */}
        <div className="summary-item">
          <span className="summary-label">Project Name:</span>
          <span className="summary-value">{summary.project_name || "N/A"}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Total Vulnerabilities:</span>
          <span className="summary-value">{summary.total_vuln_count}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Scanned Files:</span>
          <span className="summary-value">{summary.scanned_files_count}</span>
        </div>
        {summary.scan_requested_at && (
          <div className="summary-item">
            <span className="summary-label">Scan Date:</span>
            <span className="summary-value">
              {new Date(summary.scan_requested_at).toLocaleString()}
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
