const API_URL = 'http://gdp-web-api.somee.com/api'
// const API_URL = 'https://localhost:7032/api'

//Projects
export const PostProject = async (project, creatorId) => {
  try {
    const response = await fetch(`${API_URL}/Project?creatorId=${creatorId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(project)
    });

    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
}

export const DeleteProject = async (projectId) => {
  const response = await fetch(`${API_URL}/Project/${projectId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  });
  const data = await response.json();
  return data;

}

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

export const UpdateStatus = async (projectId, status) => {
  const response = await fetch(`${API_URL}/Project/${projectId}/updatestatus`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(status)
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

//Register
export const Register = async (user) => {
  const response = await fetch(`${API_URL}/Auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
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

export const UpdateTask = async (task) => {
  const response = await fetch(`${API_URL}/Task/update`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task)
  });
  const data = await response.json();
  return data;
}

export const PostTask = async (task) => {
  const response = await fetch(`${API_URL}/Task`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task)
  });
  const data = await response.json();
  return data;
}

export const DeleteTask = async (taskId) => {
  const response = await fetch(`${API_URL}/Task/${taskId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  });
  const data = await response.json();
  return data;
} 