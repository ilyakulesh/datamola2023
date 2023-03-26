import { checkStr, checkIsObj } from "../utils/utils.js";

import {
  ERRORS,
  TASK_MAX_LENGTH,
  TASK_STATUS,
  TASK_PRIORITY,
} from "../components/consts.js";

export class Task {
  constructor(
    id,
    name,
    description,
    createdAt,
    assignee,
    status,
    priority,
    isPrivate,
    comments
  ) {
    this._id = id;
    this.name = name;
    this.description = description;
    this._createdAt = createdAt;
    this.assignee = assignee;
    this.status = status;
    this.priority = priority;
    this.isPrivate = isPrivate;
    this.comments = comments;
  }

  get id() {
    return this._id;
  }

  get createdAt() {
    return this._createdAt;
  }

  static validate(task) {
    try {
      if (!checkIsObj(task)) {
        throw new Error(ERRORS.notObjError);
      }

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

      if (!task.createdAt) {
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
  }
}
