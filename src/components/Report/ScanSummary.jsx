// src/components/Report/ScanSummary.jsx
import React, { useState } from "react";
import "../../styles/ScanSummary.css"; // Create this CSS file
import { downloadReportPDF } from "../../services/reportsService";

const ScanSummary = ({ summary }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  if (!summary) return null;

  const handleDownloadPDF = async () => {
    // Destructure project_id and scan_id from summary
    const { project_id, scan_id } = summary;

    if (!project_id || !scan_id) {
      console.error("Missing project_id or scan_id for PDF download");
      alert("Cannot download PDF: Missing project or scan information");
      return;
    }

    setIsDownloading(true);

    try {
      // Use the service to download the PDF
      const pdfBlob = await downloadReportPDF(project_id, scan_id);

      // Create a URL for the blob
      const url = window.URL.createObjectURL(pdfBlob);

      // Create a temporary link element to trigger the download
      const link = document.createElement("a");
      link.href = url;
      link.download = `vulnerability-report_${scan_id}.pdf`;

      // Append to body, click and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Cleanup the blob URL
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      alert("Failed to download PDF report. Please try again later.");
    } finally {
      setIsDownloading(false);
    }
  };

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
      <div className="summary-actions">
        <button
          id="download-pdf-button"
          className="download-pdf-button"
          onClick={handleDownloadPDF}
        >
          Download PDF Report
        </button>
      </div>
    </div>
  );
};

export default ScanSummary;
