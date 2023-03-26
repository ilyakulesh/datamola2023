import {
  findTaskIndexById,
  generateId,
  checkStr,
  checkIsObj,
  findTaskById,
} from "../utils/utils.js";

import { ERRORS } from "../components/consts.js";

import { Task } from "./task.js";
import { Comment } from "./comment.js";

export class TaskCollection {
  constructor(tasks) {
    this._tasks = Array.isArray(tasks) ? tasks : [];
    this._user = null;
  }

  get user() {
    return this._user;
  }

  set user(user) {
    try {
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

      const {
        assignee = null,
        dateFrom = null,
        dateTo = null,
        status = [],
        priority = [],
        isPrivate = [],
        description = null,
      } = filterConfig;

      const filteredTasks = this._tasks.filter((task) => {
        return (
          (!assignee || task.assignee.includes(assignee)) &&
          (!dateFrom || new Date(task.createdAt) >= new Date(dateFrom)) &&
          (!dateTo || new Date(task.createdAt) <= new Date(dateTo)) &&
          (status.length === 0 || status.includes(task.status)) &&
          (priority.length === 0 || priority.includes(task.priority)) &&
          (isPrivate.length === 0 || isPrivate.includes(task.isPrivate)) &&
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
        new Date().toLocaleDateString(),
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
        new Date().toLocaleDateString(),
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
