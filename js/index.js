const taskModule = (() => {
  let user = "Ilya Kulesh";

  // метод для получения задачи по id
  const getTask = (id) => {
    try {
      if (typeof id !== "string") {
        throw new Error("Id должен быть string");
      }
      return tasks.find((task) => task.id === id);
    } catch (err) {
      console.error(err);
    }
  };

  console.log("getTask", getTask("19"));

  // метод для проверки задачи на валидность
  const validateTask = (task) => {
    try {
      if (!task.id || typeof task.id !== "string") {
        throw new Error("Поле id не должно быть пустым");
      }
      if (
        !task.name ||
        typeof task.name !== "string" ||
        task.name.length > 100
      ) {
        throw new Error("Имя не должно быть пустым/более 100 символов");
      }

      if (
        !task.description ||
        typeof task.description !== "string" ||
        task.description.length > 280
      ) {
        throw new Error("Описание не должно быть пустым/более 280 символов");
      }

      if (!task.createdAt || !(task.createdAt instanceof Date)) {
        throw new Error("Неправильная дата");
      }

      if (
        !task.assignee ||
        typeof task.assignee !== "string" ||
        task.assignee.length === 0
      ) {
        throw new Error("Поле юзер не должно быть пустым");
      }

      if (
        !task.status ||
        typeof task.status !== "string" ||
        (task.status !== "To Do" &&
          task.status !== "In progress" &&
          task.status !== "Complete")
      ) {
        throw new Error("Неправильный статус");
      }

      if (
        !task.priority ||
        typeof task.priority !== "string" ||
        (task.priority !== "High" &&
          task.priority !== "Medium" &&
          task.priority !== "Low")
      ) {
        throw new Error("Неправильный приоритет");
      }

      if (typeof task.isPrivate !== "boolean") {
        throw new Error("Неправильная приватность");
      }

      if (!Array.isArray(task.comments)) {
        throw new Error("Комментарии должны быть в массиве");
      }

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  console.log("validateTask", validateTask(tasks[19]));

  // метод для добавления задачи
  const addTask = (name, description, status, priority, isPrivate) => {
    try {
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
      throw new Error("Задача не прошла валидацию");
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  addTask("Тестовая задача", "Тестовое описание", "Complete", "High", false);

  // метод для изменения параметров задачи
  const editTask = (
    id,
    name,
    description,
    assignee,
    status,
    priority,
    isPrivate = false
  ) => {
    try {
      const taskIndex = tasks.findIndex((task) => task.id === id);
      const task = { ...tasks[taskIndex] };

      if (task.assignee !== user) {
        throw new Error("Текущий пользователь не совпадает с автором задачи");
      }

      if (name !== undefined) {
        task.name = name;
      }

      if (description !== undefined) {
        task.description = description;
      }

      if (assignee !== undefined) {
        task.assignee = assignee;
      }

      if (status !== undefined) {
        task.status = status;
      }

      if (priority !== undefined) {
        task.priority = priority;
      }

      task.isPrivate = isPrivate;

      const isValid = validateTask(task);

      if (!isValid) {
        throw new Error("Задача не прошла валидацию");
      }

      tasks[taskIndex] = task;

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  console.log(
    "editTask",
    editTask(
      "19",
      "Тестовая задача edit",
      "Тестовое описание edit",
      "Ilya Kulesh",
      "Complete",
      "High",
      true
    )
  );

  console.log("editTask_task", getTask("19"));

  // метод для проверки комментария на валидность
  const validateComment = (com) => {
    try {
      if (!com.id || typeof com.id !== "string") {
        throw new Error("Не уникальное id");
      }
      if (!com.text || typeof com.text !== "string" || com.text.length > 280) {
        throw new Error("Описание не должно быть пустым/более 280 символов");
      }
      if (!com.createdAt || !(com.createdAt instanceof Date)) {
        throw new Error("Неправильная дата");
      }
      if (!com.author || typeof com.author !== "string") {
        throw new Error("Поле автор не должно быть пустым");
      }
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
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
    try {
      if (typeof id !== "string") {
        throw new Error("id должен быть string");
      }

      const checkId = tasks.findIndex((task) => task.id === id);

      if (checkId === -1) {
        throw new Error("Такой задачи не существует");
      }

      const checkUser = tasks[checkId]?.assignee === user;

      if (checkUser) {
        tasks.splice(checkId, 1);
        console.log("removeTask", tasks);
        return true;
      }
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  removeTask("5");

  // метод для добавления комментария
  const addComment = (id, text) => {
    try {
      const newComment = {
        id: String(Math.floor(Math.random() * 1000)),
        text: text,
        createdAt: new Date(),
        author: user,
      };

      if (!validateComment(newComment)) {
        throw new Error("Ошибка валидации комментария");
      }

      const checkId = tasks.findIndex((task) => task.id === id);

      const taskToComment = tasks[checkId];
      console.log("taskToComment", taskToComment);

      if (!taskToComment) {
        throw new Error("Задачи с таким id не существует");
      }

      taskToComment.comments.push(newComment);

      console.log("push", taskToComment);
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  addComment("15", "some text");

  // метод для изменения текущего пользователя
  const changeUser = (usr) => {
    console.log("changeUserBefore", user);

    try {
      if (typeof usr !== "string") {
        throw new Error("Usr должен быть string");
      }

      user = usr;
      console.log("changeUserAfter", user);
    } catch (err) {
      console.error(err);
    }
  };

  changeUser("Ivan Ivanov");
})();
