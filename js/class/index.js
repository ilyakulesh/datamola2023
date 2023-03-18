class TaskCollection {
  constructor(tasks) {
    this._tasks = Array.isArray(tasks) ? tasks : [];
    this._user = "IlyaKulesh";
  }

  get user() {
    return this._user;
  }

  set user(user) {
    try {
      if (!checkStr(user)) {
        throw new Error(ERRORS.changeUserError);
      }

      this._user = user;
    } catch (err) {
      console.error(err);
    }
  }

  getPage(skip = 0, top = 10, filterConfig = {}) {
    try {
      if (!checkIsObj(filterConfig)) {
        throw new Error(ERRORS.notObjError);
      }

      const filteredTasks = this._tasks.filter((task) => {
        const {
          assignee,
          dateFrom,
          dateTo,
          status,
          priority,
          isPrivate,
          description,
        } = filterConfig;

        return (
          (!assignee || task.assignee.includes(assignee)) &&
          (!dateFrom || new Date(task.createdAt) >= new Date(dateFrom)) &&
          (!dateTo || new Date(task.createdAt) <= new Date(dateTo)) &&
          (!status || task.status === status) &&
          (!priority || task.priority === priority) &&
          (isPrivate === undefined || task.isPrivate === isPrivate) &&
          (!description || task.description.includes(description))
        );
      });

      const sortedTasks = filteredTasks.sort(
        (task1, task2) => new Date(task2.createdAt) - new Date(task1.createdAt)
      );

      return sortedTasks.slice(skip, skip + top);
    } catch (err) {
      console.error(err);
    }
  }

  get(id) {
    try {
      if (!checkStr(id)) {
        throw new Error(ERRORS.idError);
      }

      const task = findTaskById(id, this._tasks);

      if (!task) {
        throw new Error(ERRORS.taskNotFound);
      }

      return task;
    } catch (err) {
      console.error(err);
    }
  }

  add(name, description, assignee, status, priority, isPrivate) {
    try {
      const newTask = new Task(
        generateId(),
        name,
        description,
        new Date(),
        assignee,
        status,
        priority,
        isPrivate,
        []
      );

      if (Task.validate(newTask)) {
        this._tasks.push(newTask);
        return true;
      }
      throw new Error(ERRORS.taskNotValidate);
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  edit(id, name, description, assignee, status, priority, isPrivate = false) {
    try {
      const taskIndex = findTaskIndexById(id, this._tasks);
      const task = { ...this._tasks[taskIndex] };

      if (task.assignee !== this._user) {
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

      const isValid = Task.validate(task);

      if (!isValid) {
        throw new Error(ERRORS.taskNotValidate);
      }

      this._tasks[taskIndex] = task;

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  remove(id) {
    try {
      if (!checkStr(id)) {
        throw new Error(ERRORS.idError);
      }

      const checkId = findTaskIndexById(id, this._tasks);

      if (checkId === -1) {
        throw new Error(ERRORS.checkIdError);
      }

      const checkUser = this._tasks[checkId]?.assignee === this._user;

      if (checkUser) {
        this._tasks.splice(checkId, 1);
        return true;
      }

      return false;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  addComment(id, text) {
    try {
      const newComment = new Comment(
        generateId(),
        text,
        new Date(),
        this._user
      );

      if (!Comment.validate(newComment)) {
        throw new Error(ERRORS.validateCommentError);
      }

      const checkId = findTaskIndexById(id, this._tasks);

      const taskToComment = this._tasks[checkId];

      if (!taskToComment) {
        throw new Error(ERRORS.taskToCommentError);
      }

      taskToComment.comments.push(newComment);
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  addAll(tasks) {
    const invalidTasks = [];
    tasks.forEach((task) => {
      if (!Task.validate(task)) {
        invalidTasks.push(task);
      } else {
        this._tasks.push(task);
      }
    });
    return invalidTasks;
  }

  clear() {
    this._tasks = [];
  }
}

const taskCollection = new TaskCollection(tasks);
//getPageCLASS
console.log(
  "getPageCLASS",
  taskCollection.getPage(0, 10, { description: "резюме", priority: "High" })
);

//getCLASS
console.log("getCLASS", taskCollection.get("19"));

//addCLASS
console.log("add_beforeCLASS", tasks);
taskCollection.add(
  "Тестовая задача",
  "Тестовое описание",
  "IlyaKulesh",
  "Complete",
  "High",
  false
);
console.log("addTask_afterCLASS", tasks);

//editCLASS
console.log(
  "editCLASS",
  taskCollection.edit(
    "19",
    "Тестовая задача edit",
    "Тестовое описание edit",
    "IlyaKulesh",
    "Complete",
    "High",
    true
  )
);

console.log("editTask_taskCLASS", taskCollection.get("19"));

//removeCLASS
taskCollection.remove("7");
console.log("removeTaskCLASS", tasks);

//addCommentCLASS
taskCollection.addComment("15", "some text");
console.log("addCommentCLASS", tasks[13]);

//addAllCLASS
console.log("addAllCLASS", taskCollection.addAll(tasks));
