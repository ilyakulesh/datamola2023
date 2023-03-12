const taskModule = (() => {
  let user = "IlyaKulesh";

  // метод для получения задач с сортировкой
  // console.log("getTasks", getTasks(0, 10, { description: "резюме" }));

  // метод для получения задачи по id
  const getTask = (id) => {
    try {
      if (!checkStr(id)) {
        throw new Error(ERRORS.idError);
      }

      const task = findTaskById(id, tasks);

      if (!task) {
        throw new Error(ERRORS.taskNotFound);
      }

      return task;
    } catch (err) {
      console.error(err);
    }
  };

  console.log("getTask", getTask("19"));

  // метод для проверки задачи на валидность
  const validateTask = (task) => {
    try {
      if (!checkIsObj(task)) {
        throw new Error(ERRORS.notObjError);
      }

      console.log("task.id", task.id);

      if (!task.id || !checkStr(task.id)) {
        throw new Error(ERRORS.idError);
      }

      if (
        !task.name ||
        !checkStr(task.name) ||
        task.name.length > TASK_MAX_LENGTH.name
      ) {
        throw new Error(ERRORS.nameError);
      }

      if (
        !task.description ||
        !checkStr(task.description) ||
        task.description.length > TASK_MAX_LENGTH.description
      ) {
        throw new Error(ERRORS.descriptionError);
      }

      if (!task.createdAt || !(task.createdAt instanceof Date)) {
        throw new Error(ERRORS.dateError);
      }

      if (
        !task.assignee ||
        !checkStr(task.assignee) ||
        task.assignee.length === 0
      ) {
        throw new Error(ERRORS.assigneeError);
      }

      if (
        !task.status ||
        !checkStr(task.status) ||
        (task.status !== TASK_STATUS.toDo &&
          task.status !== TASK_STATUS.inProgress &&
          task.status !== TASK_STATUS.complete)
      ) {
        throw new Error(ERRORS.statusError);
      }

      if (
        !task.priority ||
        !checkStr(task.priority) ||
        (task.priority !== TASK_PRIORITY.high &&
          task.priority !== TASK_PRIORITY.medium &&
          task.priority !== TASK_PRIORITY.low)
      ) {
        throw new Error(ERRORS.priorityError);
      }

      if (typeof task.isPrivate !== "boolean") {
        throw new Error(ERRORS.isPrivateError);
      }

      if (!Array.isArray(task.comments)) {
        throw new Error(ERRORS.commentsError);
      }

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  console.log("validateTask", validateTask(tasks[19]));

  // метод для добавления задачи
  const addTask = (
    name,
    description,
    assignee,
    status,
    priority,
    isPrivate
  ) => {
    try {
      const newTask = {
        id: generateId(),
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
      throw new Error(ERRORS.taskNotValidate);
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  addTask(
    "Тестовая задача",
    "Тестовое описание",
    "IlyaKulesh",
    "Complete",
    "High",
    false
  );

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
      const taskIndex = findTaskIndexById(id, tasks);
      const task = { ...tasks[taskIndex] };

      if (task.assignee !== user) {
        throw new Error(ERRORS.editTaskAssigneeError);
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
        throw new Error(ERRORS.taskNotValidate);
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
      "IlyaKulesh",
      "Complete",
      "High",
      true
    )
  );

  console.log("editTask_task", getTask("19"));

  // метод для проверки комментария на валидность
  const validateComment = (com) => {
    try {
      if (!checkIsObj(com)) {
        throw new Error(ERRORS.notObjError);
      }

      if (!com.id || !checkStr(com.id)) {
        throw new Error(ERRORS.idError);
      }
      if (
        !com.text ||
        !checkStr(com.text) ||
        com.text.length > TASK_MAX_LENGTH.comment
      ) {
        throw new Error(ERRORS.descriptionError);
      }
      if (!com.createdAt || !(com.createdAt instanceof Date)) {
        throw new Error(ERRORS.dateError);
      }
      if (!com.author || !checkStr(com.author)) {
        throw new Error(ERRORS.authorError);
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
    author: "IlyaKulesh",
  };

  console.log("validateComment", validateComment(comment));

  // метод для удаления задачи
  const removeTask = (id) => {
    try {
      if (!checkStr(id)) {
        throw new Error(ERRORS.idError);
      }

      const checkId = findTaskIndexById(id, tasks);

      if (checkId === -1) {
        throw new Error(ERRORS.checkIdError);
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
        id: generateId(),
        text: text,
        createdAt: new Date(),
        author: user,
      };

      if (!validateComment(newComment)) {
        throw new Error(ERRORS.validateCommentError);
      }

      const checkId = findTaskIndexById(id, tasks);

      const taskToComment = tasks[checkId];
      console.log("taskToComment", taskToComment);

      if (!taskToComment) {
        throw new Error(ERRORS.taskToCommentError);
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
      if (!checkStr(usr)) {
        throw new Error(ERRORS.changeUserError);
      }

      user = usr;
      console.log("changeUserAfter", user);
    } catch (err) {
      console.error(err);
    }
  };

  changeUser("IvanIvanov");
})();
