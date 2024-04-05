import * as api from "../remote/WebApi";

export const getProjects = async (userId) => {
  return await api.GetProjects(userId)
}

export const getProject = async (projectId) => {
  return await api.GetProject(projectId)
}