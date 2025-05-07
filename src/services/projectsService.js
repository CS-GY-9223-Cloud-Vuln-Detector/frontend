import api from "./api";

export const getProjects = async () => {
  try {
    const response = await api.get("/projects/");
    const data = response.data;

    const projects = data?.data || [];
    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};
