const API_URL = 'https://localhost:7032/api'

export const GetProjects = async () => {
  const response = await fetch(`${API_URL}/project`);
  const data = await response.json();
  return data;
}

export const GetUserById = async (id) => {
  const response = await fetch(`${API_URL}/user/${id}`);
  const data = await response.json();
  return data;
}