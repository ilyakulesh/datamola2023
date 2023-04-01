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
// taskController.setCurrentUser(null);
taskController.setCurrentUser("IlyaKulesh");

// showTask("1");

// Глобальный обработчик событий
document.querySelector("body").addEventListener("click", (event) => {
  if (event.target.closest("#filer__button")) {
    taskController.filter();
  }

  if (event.target.closest("#view__button")) {
    const viewContent = document.querySelector(".view-content");
    const mainViewIcon = document.getElementById("main-view-icon");

    if (viewContent.style.display === "none") {
      taskFeedView.mainView();

      mainViewIcon.classList.toggle("rotate");
    } else {
      viewContent.style.display = "none";
      mainViewIcon.classList.toggle("rotate");
    }
  }

  if (event.target.closest(".view-content__columns")) {
    const viewContentList = document.querySelector(".view-content__list");

    // event.currentTarget.style.fontWeight = "bold";
    viewContentList.style.fontWeight = "normal";
    taskFeedView.position = "columns";
    taskFeedView.display(
      taskCollection._tasks,
      taskController.getCurrentUser()
    );
    console.log(taskFeedView.position);

    // viewContent.style.display = "none";
    // mainViewIcon.classList.toggle("rotate");
  }

  if (event.target.closest(".view-content__list")) {
    const viewContentColumns = document.querySelector(".view-content__columns");
    // event.currentTarget.style.fontWeight = "bold";
    viewContentColumns.style.fontWeight = "normal";
    taskFeedView.position = "list";
    taskFeedView.display(
      taskCollection._tasks,
      taskController.getCurrentUser()
    );
    console.log(taskFeedView.position);

    // viewContent.style.display = "none";
    // mainViewIcon.classList.toggle("rotate");
  }

  if (event.target.closest("#create-task__button")) {
    taskFeedView.modalNewTask();

    const saveButton = document.querySelector(".modal-button-save");
    const resetButton = document.querySelector(".modal-button-close");

    const newTask = taskController.createTask();

    saveButton.addEventListener("click", () => {
      const modalOverlayDelete = document.querySelector(".modal-overlay");
      console.log("Сохранено:", newTask);
      taskController.addTask({
        name: newTask.name,
        description: newTask.description,
        assignee: newTask.assignee,
        status: newTask.status,
        priority: newTask.priority,
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
  }

  if (event.target.closest(".modal-close")) {
    const modalOverlayDelete = document.querySelector(".modal-overlay");
    modalOverlayDelete.remove();
  }

  if (event.target.closest("#exit-button")) {
    taskController.setCurrentUser(null);

    const authButton = document.querySelector("#auth-button");
    authButton.addEventListener("click", () => {
      authView.display();
      authView.authCheck();
      taskController.passwordEye();
    });
  }

  if (event.target.closest("#reg-form-auth")) {
    authView.display();
    authView.authCheck();
    taskController.passwordEye();
  }

  if (event.target.closest("#reg-form-reg")) {
    regView.display();
    regView.regCheck();
    taskController.passwordEye();
  }

  if (event.target.closest(".task__icons-delete")) {
    const taskToRemove = event.target.closest("div[id]");
    console.log(taskToRemove.id);
    taskController.removeTask(taskToRemove.id);
  }

  if (event.target.closest(".task__icons-edit")) {
    const taskToEdit = event.target.closest("div[id]");
    console.log(taskCollection.get(taskToEdit.id));

    taskFeedView.modalEditTask(taskCollection.get(taskToEdit.id));

    const saveButton = document.querySelector(".modal-button-save");
    const resetButton = document.querySelector(".modal-button-close");

    const newTask = taskController.editTaskModal();
    const modalOverlayDelete = document.querySelector(".modal-overlay");

    saveButton.addEventListener("click", () => {
      console.log("Сохранено:", newTask);
      taskController.editTask(taskCollection.get(taskToEdit.id).id, {
        name: newTask.name,
        description: newTask.description,
        assignee: newTask.assignee,
        status: newTask.status,
        priority: newTask.priority,
        isPrivate: newTask.isPrivate,
      });
      modalOverlayDelete.remove();
    });

    const modalClose = document.querySelector(".modal-close");

    modalClose.addEventListener("click", () => {
      modalOverlayDelete.remove();
    });
  }

  if (event.target.closest("#main-page__no-user")) {
    taskController.setCurrentUser(null);
  }

  if (event.target.closest("#main-page__user")) {
    taskController.setCurrentUser(
      document.querySelector(".menu-name__user-name").textContent
    );
  }

  if (event.target.closest("#task__with-user")) {
    const currentTask = event.target.closest(".task").id;
    console.log(currentTask);
    const menuNameUserName = document.querySelector(".menu-name__user-name");
    console.log("menuNameUserName", menuNameUserName.textContent);

    taskController.showTask(currentTask);
    // console.log(event.target.closest(".task").id);
  }
});
