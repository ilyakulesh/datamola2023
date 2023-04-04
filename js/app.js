import { tasks } from "./components/tasks.js";

import { TaskFeedView } from "./view/TaskFeedView.js";
const taskFeedView = new TaskFeedView(".main-container");

import { AuthView } from "./view/AuthView.js";
const authView = new AuthView("main");

import { RegView } from "./view/RegView.js";
const regView = new RegView("main");

const populateLocalStorage = () => {
  const tasksStorage = localStorage.getItem("tasks");
  if (!tasksStorage || !JSON.parse(tasksStorage).length) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
};

populateLocalStorage();
import { TaskCollection } from "./model/index.js";
const taskCollection = new TaskCollection(tasks);

import { TaskController } from "./controller/TaskController.js";
const taskController = new TaskController();

import { UserPageView } from "./view/UserPageView.js";
const userPageView = new UserPageView("main");

// Тесты
taskController.setCurrentUser(
  localStorage.getItem("currentUser")
    ? JSON.parse(localStorage.getItem("currentUser"))
    : "IlyaKulesh"
);
// taskController.setCurrentUser("IlyaKulesh");

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
    const viewContentColumns = document.querySelector(".view-content__columns");
    const viewContentList = document.querySelector(".view-content__list");

    viewContentColumns.style.fontWeight = "bold";
    viewContentList.style.fontWeight = "normal";

    taskFeedView.position = "columns";
    taskFeedView.display(
      JSON.parse(localStorage.getItem("tasks")),
      taskController.getCurrentUser()
    );
    console.log(taskFeedView.position);

    // viewContent.style.display = "none";
    // mainViewIcon.classList.toggle("rotate");
  }

  if (event.target.closest(".view-content__list")) {
    const viewContentColumns = document.querySelector(".view-content__columns");
    const viewContentList = document.querySelector(".view-content__list");

    viewContentList.style.fontWeight = "bold";
    viewContentColumns.style.fontWeight = "normal";

    taskFeedView.position = "list";
    taskFeedView.display(
      JSON.parse(localStorage.getItem("tasks")),
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
  }

  if (event.target.closest("#auth-button")) {
    authView.display();
    authView.authCheck();
    taskController.passwordEye();
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
      console.log(
        "taskCollection.get(taskToEdit.id).id",
        taskCollection.get(taskToEdit.id).id
      );
      console.log("Сохранено:", newTask);

      console.log("taskToEdit.id", taskToEdit.id);
      taskController.editTask(taskToEdit.id, {
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

    taskController.showTask(currentTask);
    // console.log(event.target.closest(".task").id);
  }

  if (event.target.closest(".menu-name__user-name")) {
    userPageView.display(
      document.querySelector(".menu-name__user-name").textContent
    );
  }

  if (event.target.closest(".edit__user-edit")) {
    userPageView.userPageEdit(
      document.querySelector(".menu-name__user-name").textContent
    );
    userPageView.userPageCheck();
    taskController.passwordEye();
  }

  if (event.target.closest(".full-task__button")) {
    const inputComment = document.querySelector(".full-task__input");
    console.log(inputComment.value);

    const currentTask = event.target.closest(".info-task").id;
    console.log(currentTask);

    taskController.newComment(currentTask, inputComment.value);
    taskController.showTask(currentTask);
  }

  if (event.target.closest(".wrap-list__button")) {
    // console.log("event.target", event.target);
    const listTask = event.target.closest(".list-task");
    const tasks = listTask.querySelector(".tasks");
    console.log("tasks.style.display", tasks.style.display);
    console.log("event.target", event.target.textContent);

    const listButton = document.querySelector("#list_button");

    if (tasks.style.display === "block") {
      tasks.style.display = "none";
      event.target.textContent = "Развернуть";
      // listButton.classList.toggle("rotate");
    } else if (tasks.style.display === "none") {
      tasks.style.display = "block";
      event.target.textContent = "Свернуть";
      // listButton.classList.toggle("rotate");
    }
  }
});

console.log("qwe", taskController.taskCollection);
