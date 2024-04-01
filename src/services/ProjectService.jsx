import * as api from "../remote/WebApi";

export const getProjects = async (userId) => {
  return await api.GetProjects(userId)
}