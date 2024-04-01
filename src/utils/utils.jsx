export function getStatusColor(status) {
  switch (status) {
    case 1:
      return 'circle-progress';
    case 2:
      return 'circle-pending';
    case 3:
      return 'circle-completed';
    case 4:
      return 'circle-stopped';
    default:
      return 'circle-default';
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