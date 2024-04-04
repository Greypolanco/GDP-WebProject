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