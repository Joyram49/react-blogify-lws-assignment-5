export const getImage = (image, type) => {
  return `${import.meta.env.VITE_SERVER_BASE_URL}/uploads/${type}/${image}`;
};
