const API_URL = 'http://localhost:5131/api'

export const GetProjects = async (userId) => {
  const response = await fetch(`${API_URL}/project/userprojects/${userId}`);
  const data = await response.json();
  return data;
}

export const GetUserById = async (id) => {
  const response = await fetch(`${API_URL}/user/${id}`);
  const data = await response.json();
  return data;
}

//Login
export const Login = async (credential) => {
  const response = await fetch(`${API_URL}/Auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credential)
  });
  const data = await response.json();
  return data;
}