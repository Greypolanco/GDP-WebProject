import React, { useState, useEffect } from 'react';
import * as UserService from '../../services/UserService';
import { getStatusColor, formatDate } from '../../utils/utils';
import '../../utils/utils.css';
import { useAuth } from '../../context/AppContext';

const ProjectDetail = ({ project }) => {
  const [users, setUsers] = useState([]);
  const userLogged = useAuth();
  const [loggedInUser, setLoggedInUser] = useState(null);

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

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
    }
  }, [project]);

  if (!project) {
    return (
      <>
        {loggedInUser && (
          <h1>¡Bienvenido, <strong>@{loggedInUser.username}</strong>!</h1>
        )}
        <h4>Pulsa sobre uno de los proyectos de la izquierda para ver sus detalles.</h4>
      </>
    );
  }

  return (
    <div className='container'>
      {project && (
        <div>
          <header>
            <h2>{project.title}</h2>
          </header>
          <section>
            <p>{project.description}</p>
            <p>{formatDate(project.startDate)} - {formatDate(project.endDate)}</p>
            <h5>Participantes</h5>
            <table className='table table-dark table-responsive text-center'>
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
            <table className='table table-dark table-responsive text-center'>
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Inicio</th>
                  <th>Fin</th>
                  <th>Estado</th>
                  <th>Participante</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {project.tasks.map(task =>
                  <tr key={task.id}>
                    <td>{task.title}</td>
                    <td>{formatDate(task.startDate)}</td>
                    <td>{formatDate(task.endDate)}</td>
                    <td><div className={`status ${getStatusColor(task.status)}`}></div></td>
                    <td>{task.userId}</td>
                    <td>Ver</td>
                  </tr>
                )}
              </tbody>
            </table>
          </section>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
