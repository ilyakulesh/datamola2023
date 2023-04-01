import { tasks } from "../components/tasks.js";

import { TaskCollection } from "../model/index.js";

import { HeaderView } from "../view/HeaderView.js";
import { TaskFeedView } from "../view/TaskFeedView.js";
import { TaskView } from "../view/TaskView.js";
import { FilterView } from "../view/FilterView.js";

export class TaskController {
  constructor() {
    this.tasks = tasks;
    this.taskCollection = new TaskCollection(tasks);
    this.headerView = new HeaderView(".menu-name");
    this.taskFeedView = new TaskFeedView(".main-container");
    this.taskView = new TaskView("main");
    this.filterView = new FilterView(".filter-content");
  }

  setCurrentUser(user) {
    this.taskCollection.user = user;
    this.taskFeedView.display(
      this.taskCollection._tasks,
      this.taskCollection.user
    );
    this.headerView.display(user);
  }

  getCurrentUser() {
    // return document.querySelector(".menu-name__user-name").textContent
    // ? document.querySelector(".menu-name__user-name").textContent
    // : null;
    return this.taskCollection.user;
  }

  addTask(task) {
    this.taskCollection.add(
      task.name,
      task.description,
      this.taskCollection.user,
      task.status,
      task.priority,
      task.isPrivate
    );
    this.taskFeedView.display(
      this.taskCollection._tasks,
      this.taskCollection.user
    );
  }

  editTask(id, task) {
    this.taskCollection.edit(
      id,
      task.name,
      task.description,
      task.assignee,
      task.status,
      task.priority,
      task.isPrivate
    );
    this.taskFeedView.display(
      this.taskCollection._tasks,
      this.taskCollection.user
    );
  }

  removeTask(id) {
    this.taskCollection.remove(id);
    this.taskFeedView.display(
      this.taskCollection._tasks,
      this.taskCollection.user
    );
  }

  getFeed(skip, top, filterConfig) {
    console.log("filterConfig", filterConfig);
    const tasks = this.taskCollection.getPage(skip, top, filterConfig);
    this.taskFeedView.display(tasks, this.taskCollection.user);
  }

  showTask(id) {
    const taskId = this.taskCollection.get(id);
    this.taskView.display(taskId, id);
  }

  passwordEye() {
    const eyeIcons = document.querySelectorAll(".eye-icon");

    const eyeIconPassword = document.querySelector("#eye-icon__password");
    const password = document.querySelector("#password");
    const confirmPassword = document.querySelector("#confirmPassword");

    eyeIcons.forEach(function (eyeIcon) {
      eyeIcon.addEventListener("click", function () {
        if (eyeIcon === eyeIconPassword) {
          const type =
            password.getAttribute("type") === "password" ? "text" : "password";
          password.setAttribute("type", type);
          this.classList.toggle("hide");
        } else {
          const type =
            confirmPassword.getAttribute("type") === "password"
              ? "text"
              : "password";
          confirmPassword.setAttribute("type", type);
          this.classList.toggle("hide");
        }
      });
    });
  }

  filter() {
    const filterContent = document.querySelector(".filter-content");
    const icon = document.getElementById("filter-icon");

    if (filterContent.style.display === "none") {
      this.filterView.display();

      let filterValues = {
        assignee: "",
        taskName: "",
        priority: "Высокий, Средний, Низкий",
        startDate: "",
        endDate: "",
        privacy: [true, false],
      };

      const filterInputs = document.querySelectorAll(
        ".filter-select, .filter-task__input, .date__input, .priority input, .privacy input"
      );

      filterInputs.forEach((input) => {
        input.addEventListener("change", (e) => {
          e.preventDefault();
          if (input.classList.contains("filter-select")) {
            filterValues.assignee = input.value;
          } else if (input.classList.contains("filter-task__input")) {
            filterValues.taskName = input.value;
          } else if (input.classList.contains("date__input")) {
            const startDateInput = document.querySelector(
              ".date__input:first-of-type"
            );
            const endDateInput = document.querySelector(
              ".date__input:last-of-type"
            );
            filterValues.startDate = new Date(
              startDateInput.value
            ).toLocaleDateString();
            filterValues.endDate = new Date(
              endDateInput.value
            ).toLocaleDateString();
          } else {
            filterValues.priority = "";
            const priorityInputs = document.querySelectorAll(
              ".priority input:checked"
            );
            priorityInputs.forEach((priorityInput) => {
              filterValues.priority += `${priorityInput.nextElementSibling.textContent}, `;
            });

            filterValues.priority = filterValues.priority.slice(0, -2);

            // приватность
            filterValues.privacy = "";
            const privacyInputs = document.querySelectorAll(
              ".privacy input:checked"
            );
            privacyInputs.forEach((privacyInput) => {
              console.log(privacyInput.nextElementSibling.textContent);
              if (privacyInput.nextElementSibling.textContent === "Личные") {
                filterValues.privacy = [true];
              } else if (
                privacyInput.nextElementSibling.textContent === "Общедоступные"
              ) {
                filterValues.privacy = [false];
              } else if (
                privacyInput.nextElementSibling.textContent === "Все"
              ) {
                filterValues.privacy = [true, false];
              }
            });
          }

          this.getFeed(0, 10, {
            assignee: filterValues.assignee,
            dateFrom: filterValues.startDate,
            dateTo: filterValues.endDate,
            // status: [],
            priority: filterValues.priority.split(", "),
            isPrivate: filterValues.privacy,
            description: filterValues.taskName,
          });

          console.log(filterValues);

          const filterButton = document.querySelector(".filter-button");
          filterButton.style.display = "block";

          filterButton.addEventListener("click", (e) => {
            e.preventDefault();
            this.getFeed(0, 10, {});
            filterButton.style.display = "none";
          });
        });
      });

      icon.classList.toggle("rotate");
    } else {
      filterContent.style.display = "none";
      icon.classList.toggle("rotate");
    }
  }

  createTask() {
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

    const formData = {};

    nameInput.addEventListener("input", (event) => {
      formData.name = event.target.value;
    });

    descriptionInput.addEventListener("input", (event) => {
      formData.description = event.target.value;
    });

    statusSelect.addEventListener("change", (event) => {
      formData.status = event.target.value;
    });

    priorityCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", (event) => {
        if (event.target.id.split("_")[1] === "high") {
          formData.priority = "Высокий";
        } else if (event.target.id.split("_")[1] === "medium") {
          formData.priority = "Средний";
        } else if (event.target.id.split("_")[1] === "low") {
          formData.priority = "Низкий";
        }
      });
    });

    privacyCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", (event) => {
        if (event.target.id.split("_")[1] === "own") {
          formData.isPrivate = true;
        } else if (event.target.id.split("_")[1] === "public") {
          formData.isPrivate = false;
        }
      });
    });

    assigneeSelect.addEventListener("change", (event) => {
      formData.assignee = event.target.value;
    });

    return formData;
  }

  editTaskModal() {
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

    const formData = {};

    nameInput.addEventListener("input", (event) => {
      formData.name = event.target.value;
    });

    descriptionInput.addEventListener("input", (event) => {
      formData.description = event.target.value;
    });

    statusSelect.addEventListener("change", (event) => {
      formData.status = event.target.value;
    });

    priorityCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", (event) => {
        if (event.target.id.split("_")[1] === "high") {
          formData.priority = "Высокий";
        } else if (event.target.id.split("_")[1] === "medium") {
          formData.priority = "Средний";
        } else if (event.target.id.split("_")[1] === "low") {
          formData.priority = "Низкий";
        }
      });
    });

    privacyCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", (event) => {
        if (event.target.id.split("_")[1] === "own") {
          formData.isPrivate = true;
        } else if (event.target.id.split("_")[1] === "public") {
          formData.isPrivate = false;
        }
      });
    });

    assigneeSelect.addEventListener("change", (event) => {
      formData.assignee = event.target.value;
    });

    return formData;
  }
}
