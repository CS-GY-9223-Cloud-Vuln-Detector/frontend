// src/components/Report/ReportHeader.jsx
import React from "react";
import "../../styles/ReportHeader.css"; // Create this CSS file

const ReportHeader = ({
  projectId,
  onProjectIdChange,
  scanId,
  onScanIdChange,
  onFetchReport,
  onDownloadPdf,
  pageTitle,
}) => {
  return (
    <div className="report-header-container">
      <h1 className="report-page-title">{pageTitle}</h1>
      <div className="report-controls">
        <div className="control-group">
          <label htmlFor="projectIdInput">Project ID:</label>
          <input
            type="text"
            id="projectIdInput"
            value={projectId}
            onChange={(e) => onProjectIdChange(e.target.value)}
            placeholder="Enter Project ID"
          />
        </div>
        <div className="control-group">
          <label htmlFor="scanIdInput">Scan ID:</label>
          <input
            type="text"
            id="scanIdInput"
            value={scanId}
            onChange={(e) => onScanIdChange(e.target.value)}
            placeholder="Enter Scan ID"
          />
        </div>
        <button onClick={onFetchReport} className="fetch-button">
          Fetch
        </button>
        <button onClick={onDownloadPdf} className="download-pdf-button">
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default ReportHeader;
