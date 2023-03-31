export const checkLocalIdExist = (videos, localId) => {
  return videos?.some((item) => item.id === localId);
};
