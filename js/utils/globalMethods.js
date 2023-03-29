import { tasks } from "../components/tasks.js";

import { TaskCollection } from "../model/index.js";

import { HeaderView } from "../view/HeaderView.js";
import { TaskFeedView } from "../view/TaskFeedView.js";
import { TaskView } from "../view/TaskView.js";

const taskCollection = new TaskCollection(tasks);
const headerView = new HeaderView(".menu-name");
const taskFeedView = new TaskFeedView(".main-container");
const taskView = new TaskView("main");

taskFeedView.display(taskCollection._tasks);

export const setCurrentUser = (user) => {
  taskCollection.user = user;
  headerView.display(user);

  taskFeedView.display(taskCollection._tasks, taskCollection.user);
};

export const addTask = (task) => {
  taskCollection.add(
    task.name,
    task.description,
    task.assignee,
    task.status,
    task.priority,
    task.isPrivate
  );
  taskFeedView.display(taskCollection._tasks, taskCollection.user);
};

export const editTask = (id, task) => {
  taskCollection.edit(
    id,
    task.name,
    task.description,
    task.assignee,
    task.status,
    task.priority,
    task.isPrivate
  );
  taskFeedView.display(taskCollection._tasks, taskCollection.user);
};

export const removeTask = (id) => {
  taskCollection.remove(id);
  taskFeedView.display(taskCollection._tasks, taskCollection.user);
};

export const getFeed = (skip, top, filterConfig) => {
  const tasks = taskCollection.getPage(skip, top, filterConfig);
  taskFeedView.display(tasks, taskCollection.user);
};

export const showTask = (id) => {
  const taskId = taskCollection.get(id);
  taskView.display(taskId);
};

const createNewTask = document.querySelector("#create-task__button");
createNewTask.addEventListener("click", () => {
  taskFeedView.modalNewTask();

  const modalClose = document.querySelector(".modal-close");
  const modalOverlayDelete = document.querySelector(".modal-overlay");

  modalClose.addEventListener("click", () => {
    modalOverlayDelete.remove();
  });
});
