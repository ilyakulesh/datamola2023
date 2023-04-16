import { tasks } from "../components/tasks.js";

import { TaskCollection } from "../model/index.js";
const taskCollection = new TaskCollection(tasks);

import { TaskFeedApiService } from "../utils/TaskFeedApiService.js";
const taskFeedApiService = new TaskFeedApiService(
  "http://169.60.206.50:7777/api"
);

export class FilterView {
  constructor(containerId) {
    this.container = document.querySelector(containerId);
  }

  async display() {
    this.getUniqueAssignees(await taskFeedApiService.getAllUsers());
    const filter = document.querySelector(".filter-content");
    filter.style.display = "block";
  }

  getUniqueAssignees(users) {
    console.log("users", users);
    const assignees = new Set();

    for (let user of users) {
      assignees.add(user);
    }
    const filterSelect = document.querySelector(".filter-select");
    let filterAssignee = "";
    assignees.forEach((user) => {
      filterAssignee += `<option class="filter-select__option">${user.login}</option>`;
    });

    filterSelect.innerHTML = filterAssignee;
  }
}
