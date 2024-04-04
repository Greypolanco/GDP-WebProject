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

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  return `${formattedDay}/${formattedMonth}/${year}`;
};