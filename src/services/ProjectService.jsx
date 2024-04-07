import * as api from "../remote/WebApi";

export const postProject = async (project, creatorId) => {
  return await api.PostProject(project, creatorId)

}

export const getProjects = async (userId) => {
  return await api.GetProjects(userId)
}

export const getProject = async (projectId) => {
  return await api.GetProject(projectId)
}

export const addParticipant = async (projectId, userId, roleId) => {
  return await api.AddParticipant(projectId, userId, roleId)
}

export const removeParticipant = async (projectId, userId) => {
  return await api.RemoveParticipant(projectId, userId)
}