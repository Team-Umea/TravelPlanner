export function generateID(array) {
  if (array.length === 0) {
    return "1";
  } else {
    return String(Math.max(...array.map((item) => parseInt(item.id))) + 1);
  }
}

export const formatDate = (date) => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

export const getTomorrowDate = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return formatDate(tomorrow);
};

export const getEndDate = (dateToUse) => {
  const startDate = new Date(dateToUse);
  startDate.setDate(startDate.getDate() + 1);
  return formatDate(startDate);
};
