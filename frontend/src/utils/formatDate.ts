export const formatDate = (date: Date): string => {
  const [, month, day, year, time] = date.toString().split(" ");
  return `${month} ${day} ${year} - ${time}`;
};
