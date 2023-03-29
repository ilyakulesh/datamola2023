import { tasks } from "./components/tasks.js";

import { TaskFeedView } from "./view/TaskFeedView.js";
const taskFeedView = new TaskFeedView(".main-container");

import { TaskCollection } from "./model/index.js";
const taskCollection = new TaskCollection(tasks);

import {
  setCurrentUser,
  addTask,
  editTask,
  removeTask,
  getFeed,
  showTask,
} from "./utils/globalMethods.js";

import { FilterView } from "./view/FilterView.js";
const filterView = new FilterView(".filter-content");

// Тесты
setCurrentUser(null);
setCurrentUser("IlyaKulesh");
// setCurrentUser("DanielHunt");
// setCurrentUser(null);

addTask({
  name: "Тестовая задача",
  description: "Тестовое описание",
  assignee: "IlyaKulesh",
  status: "Complete",
  priority: "High",
  isPrivate: false,
});

editTask("19", {
  name: "Тестовая задача edit",
  description: "Тестовое описание edit",
  assignee: "IlyaKulesh",
  status: "Complete",
  priority: "High",
  isPrivate: false,
});

// removeTask("10");

// getFeed(0, 10, { status: ["To Do", "In progress"], isPrivate: [true, false] });

// showTask("1");

const filerButton = document.querySelector("#filer__button");
const filterContent = document.querySelector(".filter-content");
const icon = document.getElementById("filter-icon");

filerButton.addEventListener("click", () => {
  if (filterContent.style.display === "none") {
    filterView.display();
    icon.classList.toggle("rotate");
  } else {
    filterContent.style.display = "none";
    icon.classList.toggle("rotate");
  }
});

const exitButton = document.querySelector("#exit-button");

exitButton.addEventListener("click", () => {
  setCurrentUser(null);

  const authButton = document.querySelector("#auth-button");
  authButton.addEventListener("click", () => {
    window.location.replace("authorization.html");
  });
});

// Не работет после 1 вызова
const taskIconsDelete = document.querySelectorAll(".task__icons-delete");
taskIconsDelete.forEach((taskIconDelete) => {
  taskIconDelete.addEventListener("click", (e) => {
    const taskToRemove = e.target.closest("div[id]");
    console.log(taskToRemove.id);
    removeTask(taskToRemove.id);
  });
});

const taskIconsEdit = document.querySelectorAll(".task__icons-edit");
taskIconsEdit.forEach((taskIconEdit) => {
  taskIconEdit.addEventListener("click", (e) => {
    const taskToEdit = e.target.closest("div[id]");
    console.log(taskCollection.get(taskToEdit.id));

    taskFeedView.modalEditTask(taskCollection.get(taskToEdit.id));

    const modalClose = document.querySelector(".modal-close");
    const modalOverlayDelete = document.querySelector(".modal-overlay");

    modalClose.addEventListener("click", () => {
      modalOverlayDelete.remove();
    });
  });
});

const viewButton = document.querySelector("#view__button");
const viewContent = document.querySelector(".view-content");
const mainViewIcon = document.getElementById("main-view-icon");

viewButton.addEventListener("click", () => {
  if (viewContent.style.display === "none") {
    taskFeedView.mainView();
    mainViewIcon.classList.toggle("rotate");
  } else {
    viewContent.style.display = "none";
    mainViewIcon.classList.toggle("rotate");
  }
});
