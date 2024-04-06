import * as api from "../remote/WebApi";

export const getUsers = async () => {
  return await api.GetUsers();
}
export const getUserById = async (id) => {
  return await api.GetUserById(id);
}
export const removeTask = async (userId, taskId) => {
  return await api.RemoveTask(userId, taskId);
}