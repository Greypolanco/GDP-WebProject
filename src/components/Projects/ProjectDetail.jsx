import React, { useState, useEffect } from 'react';
import * as UserService from '../../services/UserService';

const ProjectDetail = ({ project }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await Promise.all(
        project.participants.map(participant =>
          UserService.getUserById(participant.userId)
        )
      );
      setUsers(usersData);
    };

    if (project) {
      fetchUsers();
    }
  }, [project]);

  const getUserById = async (userId) => {
    try {
      const user = await UserService.getUserById(userId);
      return user;
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  };

  return (
    <div className='container'>
      {project && (
        <div>
          <header>
            <h2>{project.title}</h2>
          </header>
          <section>
            <p>{project.description}</p>
            <p>{project.startDate} - {project.endDate}</p>
            <h5 className='mb-3'>Participantes</h5>
            <table className='table table-dark table-responsive'>
              <thead>
                <tr>
                  <th>Usuario</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user =>
                  <tr key={user.id}>
                    <td>{user.username}</td>
                    <td>{user.name}</td>
                    <td>{user.surname}</td>
                    <td>{user.email}</td>
                  </tr>
                )}
              </tbody>
            </table>

            <h5>Tareas</h5>
            <ul>
              {project.tasks.map(task =>
                <li key={task.id}>[{task.id}] {task.title}</li>
              )}
            </ul>
          </section>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
