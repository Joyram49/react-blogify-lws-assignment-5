export const getFormatedLike = (likes) => {
  if (likes > 1) {
    return `${likes} likes`;
  }
  return `${likes} like`;
};
