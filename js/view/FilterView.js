import { tasks } from "../components/tasks.js";

import { TaskCollection } from "../model/index.js";
const taskCollection = new TaskCollection(tasks);

export class FilterView {
  constructor(containerId) {
    this.container = document.querySelector(containerId);
  }

  display() {
    this.getUniqueAssignees(taskCollection._tasks);
    this.container.style.display = "block";
  }

  getUniqueAssignees(tasks) {
    const assignees = new Set();

    for (let task of tasks) {
      assignees.add(task.assignee);
    }
    const filterSelect = document.querySelector(".filter-select");
    let filterAssignee = "";
    assignees.forEach((user) => {
      filterAssignee += `<option class="filter-select__option">${user}</option>`;
    });

    filterSelect.innerHTML = filterAssignee;
  }
}
