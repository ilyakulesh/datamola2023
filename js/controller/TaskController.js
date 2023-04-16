import { tasks } from "../components/tasks.js";
import { users } from "../components/users.js";

import { TaskCollection } from "../model/index.js";
import { UserCollection } from "../model/userCollection.js";

import { HeaderView } from "../view/HeaderView.js";
import { TaskFeedView } from "../view/TaskFeedView.js";
import { TaskView } from "../view/TaskView.js";
import { FilterView } from "../view/FilterView.js";

import { TaskFeedApiService } from "../utils/TaskFeedApiService.js";
const taskFeedApiService = new TaskFeedApiService(
  "http://169.60.206.50:7777/api"
);

export class TaskController {
  constructor() {
    this.tasks = tasks;
    this.taskCollection = new TaskCollection(tasks);
    this.userCollection = new UserCollection(users);
    this.headerView = new HeaderView(".menu-name");
    this.taskFeedView = new TaskFeedView(".main-container");
    this.taskView = new TaskView("main");
    this.filterView = new FilterView(".filter-content");
  }

  async setCurrentUser(user) {
    this.taskCollection.user = user;

    await taskFeedApiService.getTasks().then((tasks) => {
      console.log("getTasks", tasks);
      this.taskFeedView.display(tasks, this.taskCollection.user);
    });

    this.headerView.display(user);
  }

  getCurrentUser() {
    return this.taskCollection.user;
  }

  async createTaskToken(task, bearerToken) {
    return await taskFeedApiService.createTask(task, bearerToken);
  }

  async editTask(id, task, token) {
    await taskFeedApiService.updateTask(id, task, token);

    await taskFeedApiService.getTasks().then((tasks) => {
      console.log("getTasks", tasks);
      // this.taskFeedView.display(tasks, this.taskCollection.user);
    });
  }

  removeTask(id) {
    this.taskCollection.remove(id);
    this.taskFeedView.display(
      this.taskCollection._tasks,
      this.taskCollection.user
    );
  }

  async getFeed(skip, top, filterConfig) {
    console.log("filterConfig", filterConfig);
    const tasks = await this.taskCollection.getPage(skip, top, filterConfig);
    this.taskFeedView.display(tasks, this.taskCollection.user);
  }

  async showTask(id) {
    // const taskId = this.taskCollection.get(id);
    const taskId = await taskFeedApiService.getTaskById(id);
    const comments = await taskFeedApiService.getComments(id);

    this.taskView.display(taskId, id, comments);
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
        priority: "High, Medium, Low",
        startDate: "",
        endDate: "",
        privacy: [true, false],
      };

      const filterInputs = document.querySelectorAll(
        ".filter-content input, select"
      );

      console.log("filterInputs", filterInputs);

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
            // dateFrom: filterValues.startDate,
            // dateTo: filterValues.endDate,
            // status: [],
            priority: filterValues.priority.split(", "),
            isPrivate: filterValues.privacy,
            description: filterValues.taskName,
          });

          console.log(filterValues);

          const filterButton = document.querySelector(".filter-button");
          filterButton.style.display = "block";

          filterButton.addEventListener("click", async (e) => {
            await taskFeedApiService.getTasks().then((tasks) => {
              console.log("getTasks", tasks);
              this.taskFeedView.display(tasks, this.taskCollection.user);
            });
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

    const selectedStatus = statusSelect.options[statusSelect.selectedIndex];
    const selectedValueStatus = selectedStatus.value;

    const selectedAssignee =
      assigneeSelect.options[assigneeSelect.selectedIndex];
    const selectedValueAssignee = selectedAssignee.id;

    const formData = {
      name: "",
      description: "",
      assignee: selectedValueAssignee,
      status: selectedValueStatus,
      priority: "",
      isPrivate: true,
    };

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
          formData.priority = "High";
        } else if (event.target.id.split("_")[1] === "medium") {
          formData.priority = "Medium";
        } else if (event.target.id.split("_")[1] === "low") {
          formData.priority = "Low";
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
      formData.assignee = event.target.options[event.target.selectedIndex].id;
    });

    console.log("formData", formData);

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

    const modalCreateName = document.querySelector("#modal-create__name");
    const modalCreateDescription = document.querySelector(
      "#modal-create__description"
    );

    const selectedStatus = statusSelect.options[statusSelect.selectedIndex];
    console.log("selectedStatus", selectedStatus);
    const selectedValueStatus = selectedStatus.value;

    const selectedAssignee =
      assigneeSelect.options[assigneeSelect.selectedIndex];
    const selectedValueAssignee = selectedAssignee.id;

    const formData = {
      name: modalCreateName.value,
      description: modalCreateDescription.value,
      assignee: selectedValueAssignee,
      status: selectedValueStatus,
      priority: "",
      isPrivate: true,
    };

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
          formData.priority = "High";
        } else if (event.target.id.split("_")[1] === "medium") {
          formData.priority = "Medium";
        } else if (event.target.id.split("_")[1] === "low") {
          formData.priority = "Low";
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
      formData.assignee = event.target.options[event.target.selectedIndex].id;
    });
    console.log("formData", formData);

    return formData;
  }

  async newComment(id, inputValue, bearerToken) {
    console.log(inputValue);

    const newComment = { text: inputValue };

    return await taskFeedApiService.addComment(id, newComment, bearerToken);
  }

  async findUser(token) {
    const foundUser = await taskFeedApiService.getMyProfile(token);

    if (foundUser) {
      console.log(foundUser);
      return await foundUser;
    } else {
      console.log("Пользователь не найден");
    }
  }

  async updateUserToken(userId, user, bearerToken) {
    return await taskFeedApiService.updateUser(userId, user, bearerToken);
  }
}
