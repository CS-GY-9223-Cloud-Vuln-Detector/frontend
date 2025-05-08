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
