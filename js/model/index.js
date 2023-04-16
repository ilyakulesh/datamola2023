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

import { TaskFeedApiService } from "../utils/TaskFeedApiService.js";

const taskFeedApiService = new TaskFeedApiService(
  "http://169.60.206.50:7777/api"
);

export class TaskCollection {
  constructor(tasks) {
    try {
      if (!Array.isArray(tasks)) {
        throw new Error(ERRORS.notArrError);
      }

      this._user = null;
      this._tasks = this.restore("tasks") || [];
    } catch (err) {
      console.error(err);
    }
  }

  get user() {
    return this._user;
  }

  set user(user) {
    try {
      this._user = user;
      localStorage.setItem("currentUser", JSON.stringify(user));
    } catch (err) {
      console.error(err);
    }
  }

  save() {
    try {
      localStorage.setItem("tasks", JSON.stringify(this._tasks));
    } catch (err) {
      console.error(err);
    }
  }

  restore(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  }

  async getPage(skip = 0, top = 10, filterConfig = {}) {
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

      const filterTask = await taskFeedApiService.getTasks().then((tasks) => {
        console.log("getTasks", tasks);

        const filteredTasks = tasks.filter((task) => {
          console.log("Date.parse(task.createdAt)", Date.parse(task.createdAt));
          console.log("Date.parse(dateFrom)", Date.parse(dateFrom));
          return (
            (!assignee || task.assignee.userName.includes(assignee)) &&
            (!dateFrom || Date.parse(task.createdAt) >= Date.parse(dateFrom)) &&
            (!dateTo || Date.parse(task.createdAt) <= Date.parse(dateTo)) &&
            (status.length === 0 || status.includes(task.status)) &&
            (priority.length === 0 || priority.includes(task.priority)) &&
            (isPrivate.length === 0 || isPrivate.includes(task.isPrivate)) &&
            (!description ||
              task.description
                .toLowerCase()
                .includes(description.toLowerCase()))
          );
        });

        const sortedTasks = filteredTasks.sort(
          (task1, task2) =>
            new Date(task2.createdAt) - new Date(task1.createdAt)
        );

        return sortedTasks.slice(skip, skip + top);
      });

      console.log("filterTaskfilterTask", filterTask);

      return filterTask;
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

        this.save();
        return true;
      }
      throw new Error(ERRORS.taskNotValidate);
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  edit(
    id,
    name,
    description,
    assignee = this._user,
    status,
    priority,
    isPrivate = false
  ) {
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

      task.id = id;

      task.isPrivate = isPrivate;

      const isValid = Task.validate(task);

      if (!isValid) {
        throw new Error(ERRORS.taskNotValidate);
      }

      this._tasks[taskIndex] = task;
      this.save();

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

        this.save();
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

      this.save();
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
