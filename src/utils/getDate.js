export const getDate = (createAt) => {
  const originalDate = new Date(createAt);

  // Options for formatting the date
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

  // Convert the date to a formatted string
  const formattedDateString = originalDate.toLocaleString(undefined, options);
  return formattedDateString;
};
