const API_URL = 'http://gdpwebapi.somee.com/api'
//const API_URL = 'https://localhost:7032/api'

//Projects
export const GetProjects = async (userId) => {
  const response = await fetch(`${API_URL}/project/userprojects/${userId}`);
  const data = await response.json();
  return data;
}

export const GetProject = async (projectId) =>{
  const response = await fetch(`${API_URL}/project/${projectId}`);
  const data = await response.json();
  return data;
}

//Users
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

//Tasks
export const GetUserTasks = async (userId) => {
  const response = await fetch(`${API_URL}/Task/usertasks/${userId}`);
  const data = await response.json();
  return data;
}

export const GetTask = async (taskid) =>{
  const response = await fetch(`${API_URL}/Task/${taskid}`);
  const data = await response.json();
  return data;
}