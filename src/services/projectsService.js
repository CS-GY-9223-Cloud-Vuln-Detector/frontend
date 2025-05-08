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

export const addProject = async (githubUrl) => {
  try {
    const response = await api.post("/projects/", { repo_url: githubUrl });
    const data = response.data;

    return data?.data;
  } catch (error) {
    console.error("Error adding project:", error);
    throw error;
  }
};

export const getProjectById = async (projectId) => {
  try {
    const response = await api.get(`/projects/${projectId}`);
    const data = response.data;

    return data?.data;
  } catch (error) {
    console.error("Error fetching project by ID:", error);
    throw error;
  }
};
