export const findTaskIndexById = (id, arr) =>
  arr.findIndex((el) => el.id === id);

export const generateId = () => String(Math.floor(Math.random() * 1000));

export const checkStr = (str) => {
  return typeof str === "string" && !!str.trim();
};

export const checkIsObj = (obj) =>
  typeof obj === "object" && !Array.isArray(obj) && obj !== null;

export const findTaskById = (id, arr) => arr.find((el) => el.id === id);

export const formDate = (task) => {
  const dateStr = task.createdAt || task._createdAt;
  const date = new Date(dateStr);
  const options = { day: "numeric", month: "long", year: "numeric" };
  const formattedDate = date.toLocaleDateString("ru-RU", options);
  return formattedDate;
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const notifaction = (text, name) => {
  const notificationContainer = document.createElement("div");
  notificationContainer.classList.add("notification");

  const notificationText = document.createElement("div");
  notificationText.classList.add("notification__text");
  notificationText.textContent = `${text} - ${name}`;
  notificationContainer.appendChild(notificationText);

  const notificationCloseButton = document.createElement("button");
  notificationCloseButton.classList.add("notification__close");
  notificationCloseButton.innerHTML = "&times;";
  notificationCloseButton.addEventListener("click", () =>
    notificationContainer.classList.add("notification--close")
  );
  notificationContainer.appendChild(notificationCloseButton);

  document.body.appendChild(notificationContainer);

  setTimeout(() => {
    notificationContainer.classList.add("notification--close");
    notificationContainer.addEventListener("animationend", () => {
      notificationContainer.remove();
    });
  }, 2000);
};
