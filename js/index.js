const taskModule = (() => {
  let user = "Ilya Kulesh";

  // метод для получения задачи по id
  const getTask = (id) => {
    return tasks.find((task) => task.id === id);
  };

  console.log("getTask", getTask("19"));

  // метод для проверки задачи на валидность
  const validateTask = (task) => {
    if (!task.id || typeof task.id !== "string") {
      return false;
    }
    if (!task.name || typeof task.name !== "string" || task.name.length > 100) {
      return false;
    }

    if (
      !task.description ||
      typeof task.description !== "string" ||
      task.description.length > 280
    ) {
      return false;
    }

    if (!task.createdAt || !(task.createdAt instanceof Date)) {
      return false;
    }

    if (
      !task.assignee ||
      typeof task.assignee !== "string" ||
      task.assignee.length === 0
    ) {
      return false;
    }

    if (
      !task.status ||
      typeof task.status !== "string" ||
      (task.status !== "To Do" &&
        task.status !== "In progress" &&
        task.status !== "Complete")
    ) {
      return false;
    }

    if (
      !task.priority ||
      typeof task.priority !== "string" ||
      (task.priority !== "High" &&
        task.priority !== "Medium" &&
        task.priority !== "Low")
    ) {
      return false;
    }

    if (typeof task.isPrivate !== "boolean") {
      return false;
    }

    if (!Array.isArray(task.comments)) {
      return false;
    }

    return true;
  };

  console.log("validateTask", validateTask(tasks[19]));

  // метод для добавления задачи
  const addTask = (name, description, status, priority, isPrivate) => {
    const newTask = {
      id: String(Math.floor(Math.random() * 1000)),
      name: name,
      description: description,
      createdAt: new Date(),
      assignee: user,
      status: status,
      priority: priority,
      isPrivate: isPrivate,
      comments: [],
    };

    console.log("newTask", newTask);

    if (validateTask(newTask)) {
      tasks.push(newTask);
      console.log("addTask", tasks);
      return true;
    }
    return false;
  };

  addTask("Тестовая задача", "Тестовое описание", "Complete", "High", false);

  // метод для проверки комментария на валидность
  const validateComment = (com) => {
    if (!com.id || typeof com.id !== "string") {
      return false;
    }
    if (!com.text || typeof com.text !== "string" || com.text.length > 280) {
      return false;
    }
    if (!com.createdAt || !(com.createdAt instanceof Date)) {
      return false;
    }
    if (!com.author || typeof com.author !== "string") {
      return false;
    }
    return true;
  };

  const comment = {
    id: "11",
    text: "Тестовый текст комментария",
    createdAt: new Date(),
    author: "Ilya Kulesh",
  };

  console.log("validateComment", validateComment(comment));

  // метод для удаления задачи
  const removeTask = (id) => {
    const checkId = tasks.findIndex((task) => task.id === id);

    const checkUser = tasks[checkId]?.assignee === user;

    if (checkId !== -1 && checkUser) {
      tasks.splice(checkId, 1);
      console.log("removeTask", tasks);
      return true;
    }

    return false;
  };

  removeTask("5");

  const addComment = (id, text) => {
    const checkId = tasks.findIndex((task) => task.id === id);
    console.log("checkId", checkId);

    const taskToComment = tasks[checkId];
    console.log("taskToComment", taskToComment);

    taskToComment?.comments.push(text);

    console.log("push", taskToComment);
  };

  addComment("15", "some text");

  // метод для изменения текущего пользователя
  const changeUser = (usr) => {
    console.log("changeUserBefore", user);

    if (typeof usr === "string") {
      user = usr;
      console.log("changeUserAfter", user);
    }
  };

  changeUser("Ivan Ivanov");
})();
