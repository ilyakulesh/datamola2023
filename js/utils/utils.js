export const findTaskIndexById = (id, arr) =>
  arr.findIndex((el) => el.id === id);

export const generateId = () => String(Math.floor(Math.random() * 1000));

export const checkStr = (str) => {
  return typeof str === "string" && !!str.trim();
};

export const checkIsObj = (obj) =>
  typeof obj === "object" && !Array.isArray(obj) && obj !== null;

export const findTaskById = (id, arr) => arr.find((el) => el.id === id);
