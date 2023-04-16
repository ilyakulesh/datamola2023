import { tasks } from "./components/tasks.js";

import { TaskFeedView } from "./view/TaskFeedView.js";
const taskFeedView = new TaskFeedView(".main-container");

import { AuthView } from "./view/AuthView.js";
const authView = new AuthView("main");

import { RegView } from "./view/RegView.js";
const regView = new RegView("main");

import { getToken } from "./utils/utils.js";

import { notifaction } from "./utils/utils.js";

import { TaskFeedApiService } from "./utils/TaskFeedApiService.js";

const taskFeedApiService = new TaskFeedApiService(
  "http://169.60.206.50:7777/api"
);

taskFeedApiService.getAllUsers().then((users) => {
  console.log("getUsers", users);
  // return users;
});

taskFeedApiService.getTaskById(1).then((task) => {
  console.log("getTaskById", task);
});

// populateLocalStorage();
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
    : null
);

// Глобальный обработчик событий
document.querySelector("body").addEventListener("click", async (event) => {
  if (event.target.closest("#filer__button")) {
    const filterContent = document.querySelector(".filter-content");
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
    await taskFeedApiService.getTasks().then((tasks) => {
      console.log("getTasks", tasks);
      taskFeedView.display(tasks, taskController.getCurrentUser());
    });
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
    await taskFeedApiService.getTasks().then((tasks) => {
      console.log("getTasks", tasks);
      taskFeedView.display(tasks, taskController.getCurrentUser());
    });
    console.log(taskFeedView.position);

    // viewContent.style.display = "none";
    // mainViewIcon.classList.toggle("rotate");
  }

  if (event.target.closest("#create-task__button")) {
    await taskFeedView.modalNewTask();

    const saveButton = document.querySelector(".modal-button-save");

    const newTask = taskController.createTask();

    saveButton.addEventListener("click", async () => {
      const modalOverlayDelete = document.querySelector(".modal-overlay");
      console.log("Сохранено:", newTask);

      modalOverlayDelete.remove();
      await taskFeedApiService.createTask(newTask, getToken());
      taskController.setCurrentUser(
        document.querySelector(".menu-name__user-name").textContent
      );

      const userPage = await taskController.findUser(getToken());

      if (newTask.assignee === userPage.id) {
        notifaction("У вас новая задача!", newTask.name);
      }
    });

    const resetButton = document.querySelector(".modal-button-close");
    const nameInput = document.getElementById("modal-create__name");
    const descriptionInput = document.getElementById(
      "modal-create__description"
    );
    const statusSelect = document.querySelector(".modal-content-select");
    const priorityCheckboxes = document.querySelectorAll(
      '.priority input[type="checkbox"]'
    );
    const privacyCheckboxes = document.querySelectorAll(
      '#privacy__create-modal input[type="checkbox"]'
    );
    const assigneeSelect = document.querySelectorAll(
      ".modal-content-select"
    )[1];

    resetButton.addEventListener("click", () => {
      nameInput.value = "";
      descriptionInput.value = "";
      statusSelect.value = statusSelect[0].value;
      priorityCheckboxes.value = "";
      privacyCheckboxes.value = "";
      assigneeSelect.value = assigneeSelect[0].value;
    });
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
    await taskFeedApiService.deleteTask(taskToRemove.id, getToken());
    taskController.setCurrentUser(
      document.querySelector(".menu-name__user-name").textContent
    );
  }

  if (event.target.closest(".task__icons-edit")) {
    const taskToEdit = event.target.closest("div[id]");
    console.log("taskToEdit", taskToEdit.id);

    const titleElement = taskToEdit.querySelector(".title"); // находим элемент заголовка внутри задачи
    const contentElement = taskToEdit.querySelector(".content"); // находим элемент содержимого внутри задачи

    const title = titleElement.textContent.trim(); // получаем текст заголовка и удаляем лишние пробелы
    const content = contentElement.textContent.trim(); // получаем текст содержимого и удаляем лишние пробелы
    console.log("title", title);
    console.log("content", content);

    // await taskFeedApiService.getTasks().then((res) => {
    //   res.find((task) => {
    //     if (task.id === taskToEdit.id) {
    //       console.log("task.id", task.id);
    //       console.log("task.name", task.name);
    //       console.log("task.description", task.description);
    //       taskFeedView.modalEditTask(task);
    //     }
    //   });
    // });

    taskFeedView.modalEditTask(title, content);

    const modalEditTaskFunction = () => {
      const saveButton = document.querySelector("#modal-button-save__edit");
      const resetButton = document.querySelector("#modal-button-close__edit");

      const newTask = taskController.editTaskModal();
      const modalOverlayDelete = document.querySelector(".modal-overlay");

      saveButton.addEventListener("click", async () => {
        // console.log(
        //   "taskCollection.get(taskToEdit.id).id",
        //   taskCollection.get(taskToEdit.id).id
        // );
        console.log("Сохранено:", newTask);

        console.log("taskToEdit.id", taskToEdit.id);
        await taskController.editTask(taskToEdit.id, newTask, getToken());
        taskController.setCurrentUser(
          document.querySelector(".menu-name__user-name").textContent
        );
        modalOverlayDelete.remove();
      });

      resetButton.addEventListener("click", () => {
        nameInput.value = "";
        descriptionInput.value = "";
        statusSelect.value = statusSelect[0].value;
        priorityCheckboxes.value = "";
        privacyCheckboxes.value = "";
        assigneeSelect.value = assigneeSelect[0].value;
      });

      const modalClose = document.querySelector(".modal-close");

      modalClose.addEventListener("click", () => {
        modalOverlayDelete.remove();
      });
    };

    setTimeout(modalEditTaskFunction, 1000);
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
    // const token = localStorage.getItem("token");
    console.log("token", getToken());
    userPageView.display(getToken());
  }

  if (event.target.closest(".edit__user-edit")) {
    await userPageView.userPageEdit(getToken());
    await userPageView.userPageCheck(getToken());
    taskController.passwordEye();
  }

  if (event.target.closest(".full-task__button")) {
    event.preventDefault();
    const inputComment = document.querySelector(".full-task__input");
    console.log(inputComment.value);

    const currentTask = event.target.closest(".info-task").id;
    console.log("currentTask", currentTask);

    const assigneeTask = document.querySelector(
      ".status-task__assignee"
    ).textContent;

    const currentUser = document.querySelector(
      ".menu-name__user-name"
    ).textContent;

    if (assigneeTask === currentUser) {
      notifaction("У вашей задачи новый комменарий!", inputComment.value);
    }

    await taskController.newComment(
      currentTask,
      inputComment.value,
      getToken()
    );
    await taskController.showTask(currentTask);
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

  if (event.target.closest(".reg-form__choose-avatar")) {
    console.log("ВЫБОР ФОТО");
  }
});

console.log("qwe", taskController.taskCollection);
