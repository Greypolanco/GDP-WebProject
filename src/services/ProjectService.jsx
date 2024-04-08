import { AddParticipant, GetProject, GetProjects, PostProject, RemoveParticipant } from "../remote/WebApi";

export const postProject = async (project, creatorId) => {
  return await PostProject(project, creatorId)

}

export const getProjects = async (userId) => {
  return await GetProjects(userId)
}

export const getProject = async (projectId) => {
  return await GetProject(projectId)
}

export const addParticipant = async (projectId, userId, roleId) => {
  return await AddParticipant(projectId, userId, roleId)
}

export const removeParticipant = async (projectId, userId) => {
  return await RemoveParticipant(projectId, userId)
}