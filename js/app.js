import { tasks } from "./components/tasks.js";

import { TaskFeedView } from "./view/TaskFeedView.js";
const taskFeedView = new TaskFeedView(".main-container");

import { AuthView } from "./view/AuthView.js";
const authView = new AuthView("main");

import { RegView } from "./view/RegView.js";
const regView = new RegView("main");

import { TaskCollection } from "./model/index.js";
const taskCollection = new TaskCollection(tasks);

import { TaskController } from "./controller/TaskController.js";
const taskController = new TaskController();

// Тесты
taskController.setCurrentUser(null);
taskController.setCurrentUser("IlyaKulesh");

taskController.addTask({
  name: "Тестовая задача",
  description: "Тестовое описание",
  assignee: "IlyaKulesh",
  status: "Complete",
  priority: "Высокий",
  isPrivate: false,
});

taskController.editTask("19", {
  name: "Тестовая задача edit",
  description: "Тестовое описание edit",
  assignee: "IlyaKulesh",
  status: "Complete",
  priority: "Высокий",
  isPrivate: false,
});

// removeTask("10");

// getFeed(0, 10, {
//   status: ["To Do", "In progress"],
//   isPrivate: [true, false],
// });

// showTask("1");

const filterButton = document.querySelector("#filer__button");

filterButton.addEventListener("click", () => {
  taskController.filter();
});

// Не работет после 1 вызова
const taskIconsDelete = document.querySelectorAll(".task__icons-delete");
taskIconsDelete.forEach((taskIconDelete) => {
  taskIconDelete.addEventListener("click", (e) => {
    const taskToRemove = e.target.closest("div[id]");
    console.log(taskToRemove.id);
    taskController.removeTask(taskToRemove.id);
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

const createNewTask = document.querySelector("#create-task__button");
createNewTask.addEventListener("click", () => {
  taskFeedView.modalNewTask();

  const saveButton = document.querySelector(".modal-button-save");
  const resetButton = document.querySelector(".modal-button-close");

  const newTask = taskController.createTask();

  saveButton.addEventListener("click", () => {
    console.log("Сохранено:", newTask);
    taskController.addTask({
      name: newTask.name,
      description: newTask.description,
      assignee: newTask.assignee,
      status: newTask.status,
      priority: "Высокий",
      isPrivate: newTask.isPrivate,
    });
    modalOverlayDelete.remove();
  });

  // resetButton.addEventListener("click", () => {
  //   inputs.forEach((input) => {
  //     input.value = "";
  //     // formData[input.id] = "";
  //   });
  // });

  const modalClose = document.querySelector(".modal-close");
  const modalOverlayDelete = document.querySelector(".modal-overlay");

  modalClose.addEventListener("click", () => {
    modalOverlayDelete.remove();
  });
});

const exitButton = document.querySelector("#exit-button");

exitButton.addEventListener("click", () => {
  taskController.setCurrentUser(null);

  const authButton = document.querySelector("#auth-button");
  authButton.addEventListener("click", () => {
    authView.display();
    authView.authCheck();
    taskController.passwordEye();

    const authButton = document.querySelector("#reg-form-auth");
    if (authButton) {
      authButton.addEventListener("click", (e) => {
        console.log("authButton", e);
        authView.display();
        authView.authCheck();
        taskController.passwordEye();
      });
    }

    const regButton = document.querySelector("#reg-form-reg");
    if (regButton) {
      regButton.addEventListener("click", (e) => {
        console.log("regButton", e);

        regView.display();
        regView.regCheck();
        taskController.passwordEye();
      });
    }
  });
});
