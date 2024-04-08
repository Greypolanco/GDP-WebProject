import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProject } from '../../services/ProjectService';
import { getUserById } from '../../services/UserService';

export const ProjectView = () => {
  const initialState = { id: 0, title: 'Not Found', description: '', status: '', startDate: '', endDate: '', note: '', participants: [], tasks: [] };
  const { id } = useParams();
  const [project, setProject] = useState(initialState);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await getProject(id);
        setProject(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProject();
  }, [id]);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const updatedParticipants = await Promise.all(
          project.participants.map(async (participant) => {
            const response = await getUserById(participant.userId);
            return response;
          })
        );
        setParticipants(updatedParticipants);
      } catch (error) {
        console.error(error);
      }
    };

    if (project.participants.length > 0) {
      fetchParticipants();
    }
  }, [project]);

  return (
    <div className='card'>
      <div className='card-header text-center'>
        <h3>{project.title}</h3>
      </div>
      <div className='card-body'>
        <div className='row'>
          <div className='col'>
            <h3>Description</h3>
            <p>{project.description}</p>
          </div>
          <div className='col'>
            <h5>Status</h5>
            <p>{project.status}</p>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <h5>Start Date</h5>
            <p>{project.startDate}</p>
          </div>
          <div className='col'>
            <h5>End Date</h5>
            <p>{project.endDate}</p>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <h5>Note</h5>
            <p>{project.note === '' ? "-" : project.note}</p>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-5'>
            <h5>Participantes</h5>
            <table className='table table-sm'>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {participants.map(participant => (
                  <tr key={participant.id}>
                    <td>{participant.username}</td>
                    <td>{participant.name}</td>
                    <td>{participant.surname}</td>
                    <td>{participant.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <h5>Tasks</h5>
            <ul>
              {project.tasks.map(task => (
                <li key={task.id}>{task.title}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectView;
