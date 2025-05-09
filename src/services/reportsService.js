import api from "./api";

export const getScanReport = async (projectId, scanId) => {
  try {
    // Add request params - project_id
    const params = {
      project_id: projectId,
      scan_id: scanId,
    };
    const response = await api.get(`/reports/`, { params });
    const data = response.data;
    return data?.data || [];
  } catch (error) {
    console.error(`Error fetching scans for project ${projectId}:`, error);
    throw error;
  }
};

const handleDownloadPDF = async () => {
  try {
    // Destructure project_id and scan_id from summary
    const { project_id, scan_id } = summary;

    if (!project_id || !scan_id) {
      console.error("Missing project_id or scan_id for PDF download");
      alert("Cannot download PDF: Missing project or scan information");
      return;
    }

    // Show loading state to user
    const button = document.getElementById("download-pdf-button");
    const originalText = button.innerText;
    button.innerText = "Downloading...";
    button.disabled = true;

    // Make the fetch request to the PDF endpoint
    const response = await fetch(
      `http://100.26.184.89/report/${project_id}/${scan_id}/pdf`,
    );

    // Check if response is OK
    if (!response.ok) {
      throw new Error(`Failed to download PDF: ${response.statusText}`);
    }

    // Get the PDF blob from the response
    const blob = await response.blob();

    // Create a URL for the blob
    const url = window.URL.createObjectURL(blob);

    // Create a temporary link element to trigger the download
    const link = document.createElement("a");
    link.href = url;
    link.download = `vulnerability-report-${project_id}-${scan_id}.pdf`;

    // Append to body, click and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Cleanup the blob URL
    window.URL.revokeObjectURL(url);

    // Reset button state
    button.innerText = originalText;
    button.disabled = false;
  } catch (error) {
    console.error("Error downloading PDF:", error);
    alert("Failed to download PDF report. Please try again later.");

    // Reset button state if there was an error
    const button = document.getElementById("download-pdf-button");
    if (button) {
      button.innerText = "Download PDF Report";
      button.disabled = false;
    }
  }
};

export const downloadReportPDF = async (projectId, scanId) => {
  try {
    // Create a customized axios request for blob data
    const response = await api.get(`http://100.26.184.89/report/${projectId}/${scanId}/pdf`, {
      responseType: "blob", // Important: We need a blob response
      headers: {
        Accept: "application/pdf",
      },
    });

    return response.data; // This will be the PDF blob
  } catch (error) {
    console.error(
      `Error downloading PDF report for project ${projectId}, scan ${scanId}:`,
      error,
    );
    throw error;
  }
};
