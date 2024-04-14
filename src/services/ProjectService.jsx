import {
  AddParticipant, GetProject, GetProjects,
  PostProject, RemoveParticipant, UpdateStatus,
  DeleteProject
} from "../remote/WebApi";

export const postProject = async (project, creatorId) => {
  return await PostProject(project, creatorId)
}

export const deleteProject = async (projectId) => {
  return await DeleteProject(projectId)
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

export const updateStatus = async (projectId, status) => {
  return await UpdateStatus(projectId, status)
}