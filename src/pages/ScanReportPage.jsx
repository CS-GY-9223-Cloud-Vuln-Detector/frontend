// src/pages/ScanReportPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getScanReport } from "../services/reportsService";
import ScanSummary from "../components/Report/ScanSummary";
import VulnerabilityList from "../components/Report/VulnerabilityList";
import "../styles/ScanReportPage.css";

const ScanReportPage = () => {
  const { projectId, scanId } = useParams();
  const navigate = useNavigate();
  const [reportData, setReportData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReportData = async () => {
    if (!projectId || !scanId) {
      setIsLoading(false);
      setError("Project ID or Scan ID is missing from the URL.");
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      console.log(`Fetching report for Project: ${projectId}, Scan: ${scanId}`);

      const report = await getScanReport(projectId, scanId);
      setReportData(report);
    } catch (err) {
      console.error("Failed to fetch project or report data:", err);
      setError(err.message || "Could not load report data.");
      setReportData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReportData();
  }, [projectId, scanId]);

  const handleGoBack = () => {
    navigate(`/projects/${projectId}`);
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <p>Loading vulnerability report...</p>
      </div>
    );
  }

  return (
    <div className="scan-report-page">
      <div className="scan-report-header">
        <button onClick={handleGoBack} className="back-button">
          &larr; Back to Project
        </button>
        <h1>Vulnerability Report</h1>
      </div>

      {error && !reportData && (
        <div className="error-message-inline">
          <p>Error: {error}</p>
          <button onClick={handleGoBack} className="back-button">
            Return to Project
          </button>
        </div>
      )}

      {reportData && (
        <div className="scan-report-content">
          <div className="scan-summary-column">
            <ScanSummary summary={reportData} />
          </div>
          <div className="vulnerabilities-column">
            <VulnerabilityList vulnerabilities={reportData.vulnerabilities} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ScanReportPage;
