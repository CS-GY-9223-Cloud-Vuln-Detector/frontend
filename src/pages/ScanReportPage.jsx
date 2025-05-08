// src/pages/ScanReportPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import ReportHeader from "../components/Report/ReportHeader";
import ScanSummary from "../components/Report/ScanSummary";
import VulnerabilityList from "../components/Report/VulnerabilityList";
import "../styles/ScanReportPage.css"; // Create this CSS file

// Mock data structure based on screenshots
const mockReportData = {
  projectId: "288732f8-56b7-473c-ba3f-b7194d3ff4d5",
  scanId: "312f7035-42ff-4ff4-8c89-620562bf7e62",
  projectName: "Monitored GitHub Repo X", // Added for better display
  totalVulnerabilities: 14, // From image_62ef6f.jpg
  filesAffected: 3, // From image_62ef6f.jpg
  // Alternative fields from image_acb195.jpg
  totalFilesScanned: 2,
  vulnerabilityCounts: [
    { type: 'Hardcoded credentials', count: 1 },
    { type: 'SQL Injection prone', count: 1 },
    { type: 'XSS Cross-scripting attack prone', count: 1 },
  ],
  vulnerabilities: [
    {
      id: "vuln1",
      fileName: "attacks.py",
      fileType: "python",
      fileLOC: 293,
      fileUrl: "#", // Link to file view
      lineNumber: "6-8",
      description:
        "Consider possible security implications associated with pickle module.",
      codeSnippet: `5 import base64\n6 import pickle\n7 import sqlite3`,
      suggestion: "LLM couldn't generate a suggestion for this error", // Or "The pickle module is not secure..."
      severity: "High", // Added for potential future use
    },
    {
      id: "vuln2",
      fileName: "attacks.py",
      fileType: "python",
      fileLOC: 293,
      fileUrl: "#",
      lineNumber: "8-9",
      description:
        "Consider possible security implications associated with the subprocess module.",
      codeSnippet: `7 import sqlite3\n8 import subprocess\n9 import urllib.request`,
      suggestion:
        'Securely fix "Escaping and Neutralization of Special Elements": To fix the issue of improper neutralization of special elements used in an OS command, the following generic secure fix can be implemented: 1. "Input Validation and Sanitization": Validate and sanitize all input data that is used to construct the OS command. This includes checking for any special characters or metacharacters that could be used to manipulate the command.',
      severity: "Medium",
    },
    {
      id: "vuln3", // From image_acb195.jpg
      fileName: "auth.py",
      fileType: "python",
      fileLOC: 120,
      fileUrl: "#",
      vulnerabilityName: "Hardcoded credentials", // Specific name from image_acb195
      description: "Plaintext secrets or credentials in source.", // More generic description
      lineNumber: "25-23", // Example
      codeSnippet:
        'SECRET_KEY = "supersecretkey123!"\nDB_PASSWORD = "password123"', // Example
      suggestion:
        "Store secrets in environment variables or a secure vault. Do not hardcode them in the source code. Use libraries like `python-dotenv` to load environment variables.",
      severity: "Critical",
    },
  ],
  createdAt: "2024-05-07T10:30:00Z", // Example
};

const ScanReportPage = () => {
  const { projectId, scanId } = useParams();
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState(null);
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
      // In a real app, fetch real data from API
      // For now, using mock data with delay to simulate API call
      console.log(`Fetching report for Project: ${projectId}, Scan: ${scanId}`);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if project/scan IDs match mock data
      if (projectId === mockReportData.projectId && scanId === mockReportData.scanId) {
        setProjectData({
          id: projectId,
          name: mockReportData.projectName,
        });
        setReportData(mockReportData);
      } else {
        setError(`No report found for Project ID: ${projectId} and Scan ID: ${scanId}.`);
        setProjectData({
          id: projectId,
          name: "Project " + projectId.slice(0, 8),
        });
        setReportData(null);
      }
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