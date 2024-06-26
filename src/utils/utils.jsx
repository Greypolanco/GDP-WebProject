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
  const option = Math.floor(Math.random() * 8) + 1;

  switch (option) {
    case 1:
      return 'https://wallpaperset.com/w/full/3/4/f/7718.jpg';
    case 2:
      return 'https://www.solidbackgrounds.com/images/1920x1080/1920x1080-light-pastel-purple-solid-color-background.jpg';
    case 3:
      return 'https://www.solidbackgrounds.com/images/1920x1080/1920x1080-pastel-blue-solid-color-background.jpg';
    case 4:
      return 'https://www.solidbackgrounds.com/images/1920x1080/1920x1080-pastel-yellow-solid-color-background.jpg';
    case 5:
      return 'https://www.solidbackgrounds.com/images/1920x1080/1920x1080-pastel-pink-solid-color-background.jpg';
    case 6:
      return 'https://www.solidbackgrounds.com/images/1920x1080/1920x1080-pastel-green-solid-color-background.jpg';
    case 7:
      return 'https://www.solidbackgrounds.com/images/1920x1080/1920x1080-pastel-orange-solid-color-background.jpg';
    case 8:
      return 'https://www.solidbackgrounds.com/images/1920x1080/1920x1080-mint-green-solid-color-background.jpg';
    case 9:
      return 'https://www.solidbackgrounds.com/images/1920x1080/1920x1080-lavender-web-solid-color-background.jpg'
    default:
      return 'https://cdn.wallpapersafari.com/22/76/fyo3kG.jpg';
  }
  
  
}