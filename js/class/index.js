class TaskCollection {
  constructor(tasks) {
    this.tasks = Array.isArray(tasks) ? tasks : [];
  }

  getPage(skip = 0, top = 10, filterConfig = {}) {
    try {
      if (!checkIsObj(filterConfig)) {
        throw new Error(ERRORS.notObjError);
      }

      const filteredTasks = tasks.filter((task) => {
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

      const task = findTaskById(id, tasks);

      if (!task) {
        throw new Error(ERRORS.taskNotFound);
      }

      return task;
    } catch (err) {
      console.error(err);
    }
  }

  add(text) {
    try {
      const { name, description, assignee, status, priority, isPrivate } = text;
      const newTask = {
        id: generateId(),
        name: name,
        description: description,
        createdAt: new Date(),
        assignee: assignee,
        status: status,
        priority: priority,
        isPrivate: isPrivate,
        comments: [],
      };

      if (validateTask(newTask)) {
        tasks.push(newTask);
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
  }

  remove(id) {
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

      if (!taskToComment) {
        throw new Error(ERRORS.taskToCommentError);
      }

      taskToComment.comments.push(newComment);
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}
