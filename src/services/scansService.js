import api from "./api";

export const getProjectScans = async (projectId) => {
  try {
    // Add request params - project_id
    const params = {
      project_id: projectId,
    };
    const response = await api.get(`/scans/`, { params });
    const data = response.data;
    return data?.data || [];
  } catch (error) {
    console.error(`Error fetching scans for project ${projectId}:`, error);
    throw error;
  }
};

export const triggerScan = async (projectId) => {
  try {
    const response = await api.post(`/scans/`, { project_id: projectId });
    return response.data?.data; // Returning the scan_id
  } catch (error) {
    console.error(`Error triggering scan for project ${projectId}:`, error);
    throw error;
  }
};
