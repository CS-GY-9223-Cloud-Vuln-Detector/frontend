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
