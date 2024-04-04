import { getUserById }  from '../services/UserService';

export const getUserByIdAsync = async (id) => {
  try{
    const res = await getUserById(id);
    const data = res.json();
    return data;
  }catch(e){
    console.log(e);
  }
}

export function getStatusColor(status) {
  switch (status) {
    case 1:
      return 'status circle-progress';
    case 2:
      return 'status circle-pending';
    case 3:
      return 'status circle-completed';
    case 4:
      return 'status circle-stopped';
    default:
      return 'status circle-default';
  }
}

export function getStatusText(status) {
  switch (status) {
    case 1:
      return 'En progreso';
    case 2:
      return 'Pendiente';
    case 3:
      return 'Completado';
    case 4:
      return 'Detenido';
    default:
      return 'Desconocido';
  }
}

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  return `${formattedDay}/${formattedMonth}/${year}`;
};

export const getThumbnail = () => {
  const option = Math.floor(Math.random() * 4) + 1;

  switch (option) {
    case 1:
      return 'https://i.ibb.co/QCx668B/turquese-hand.jpg';
    case 2:
      return 'https://i.ibb.co/Rh9mN4v/green-hand.jpg';
    case 3:
      return 'https://i.ibb.co/12sdKXJ/red-hand.jpg';
    case 4:
      return 'https://i.ibb.co/0rdk28K/purple.jpg';
    default:
      return 'https://i.ibb.co/QCx668B/turquese-hand.jpg';
  }
}