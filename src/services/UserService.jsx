import {GetUsers, GetUserById, RemoveTask} from "../remote/WebApi";

export const getUsers = async () => {
  return await GetUsers();
}
export const getUserById = async (id) => {
  return await GetUserById(id);
}
export const removeTask = async (userId, taskId) => {
  return await RemoveTask(userId, taskId);
}