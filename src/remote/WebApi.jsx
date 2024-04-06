// const API_URL = 'http://gdpwebapi.somee.com/api'
const API_URL = 'https://localhost:7032/api'

//Projects
export const GetProjects = async (userId) => {
  const response = await fetch(`${API_URL}/project/userprojects/${userId}`);
  const data = await response.json();
  return data;
}

export const GetProject = async (projectId) =>{
  const response = await fetch(`${API_URL}/Project/${projectId}`);
  const data = await response.json();
  return data;
}

export const AddParticipant = async (projectId, userId, roleId) => {
  const response = await fetch(`${API_URL}/Project/${projectId}/addparticipant/${userId}/${roleId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  });
  const data = await response.json();
  return data;
}

export const RemoveParticipant = async (projectId, userId) => {
  const response = await fetch(`${API_URL}/Project/${projectId}/removeparticipant/${userId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  });
  const data = await response.json();
  return data;
}

//Users
export const GetUsers = async () => {
  const response = await fetch(`${API_URL}/user`);
  const data = await response.json();
  return data;
}

export const GetUserById = async (id) => {
  const response = await fetch(`${API_URL}/user/${id}`);
  const data = await response.json();
  return data;
}

export const RemoveTask = async (userId, taskId) => {
  const response = await fetch(`${API_URL}/User/${userId}/removetask/${taskId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' }
  });
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

export const updateTask = async (task) => {
  const response = await fetch(`${API_URL}/Task/update`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task)
  });
  const data = await response.json();
  return data;
}
