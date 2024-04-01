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