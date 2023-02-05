const formatLessTen = (data: number) => (data > 9 ? data : `0${data}`);

const formatDateAndHour = (date: Date) => {
  const dateObj = new Date(date);

  return `${formatLessTen(dateObj.getDay())}/${formatLessTen(
    dateObj.getMonth()
  )}/${dateObj.getFullYear()} - ${formatLessTen(
    dateObj.getHours()
  )}:${formatLessTen(dateObj.getMinutes())}`;
};

export default formatDateAndHour;
