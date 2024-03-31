import * as api from "../remote/WebApi";

export const getProjects = async () => {
  return api.GetProjects()
}