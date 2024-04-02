import React, { useState, useEffect } from 'react';
import * as UserService from '../../services/UserService';
import { getStatusColor, formatDate } from '../../utils/utils';
import '../../utils/utils.css';

const ProjectDetail = ({ project }) => {
  const [users, setUsers] = useState([]);
  const userLogged = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

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
  });

  if (!project) {
    return (
      <>
        {userLogged ?
          <h2>Bienvenido, {userLogged.username}!</h2> : 
          <h2>Hola, debes iniciar sesión para ver tus proyectos</h2>}
        {userLogged && <h5>Seleccione un proyecto para ver los detalles</h5>}
      </>
    );
  }

  return (
    <div className='container'>
      {project &&(
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
