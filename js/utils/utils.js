const findTaskIndexById = (id, arr) => arr.findIndex((el) => el.id === id);

const generateId = () => String(Math.floor(Math.random() * 1000));

const checkStr = (str) => {
  return typeof str === "string" && !!str.trim();
};

const checkIsObj = (obj) =>
  typeof obj === "object" && !Array.isArray(obj) && obj !== null;

const findTaskById = (id, arr) => arr.find((el) => el.id === id);
