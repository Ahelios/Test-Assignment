export const formatDate = (dateString) => {
  if (!dateString || isNaN(new Date(dateString).getTime())) {
    return "N/A"; 
  }
  
  const date = new Date(dateString);

  return date.toLocaleString(undefined, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
  });
};

export const has24HoursPassed = (dateString) => {
  return new Date() - new Date(dateString) > 86400000; // 24 hours in milliseconds
};
