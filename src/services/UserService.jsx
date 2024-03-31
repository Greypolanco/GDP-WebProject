import * as api from "../remote/WebApi";

export const getUserById = async (id) => {
  return await api.GetUserById(id);
}