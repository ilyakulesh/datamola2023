import { tasks } from "../components/tasks.js";

import { TaskCollection } from "../model/index.js";
const taskCollection = new TaskCollection(tasks);

export class FilterView {
  constructor(containerId) {
    this.container = document.querySelector(containerId);
  }

  display() {
    this.container.style.display = "block";
    this.container.innerHTML = `
      <div class="filter-dropdown">Фильтр</div>
      <hr>
      <div class="filter-dropdown__assignee">Исполнитель:
        <select class="filter-select"> 
        ${this.getUniqueAssignees(taskCollection._tasks)}
        </select>
      </div>
      <div>Название задачи:
          <div>
              <input class="filter-task__input" type='text' name='filter-task'
                  placeholder="Введите название задачи...">
          </div>
      </div>
      <div>Приоритет:
          <div class="priority">
              <div>
                  <input type="checkbox" id="priority_high">
                  <label for="priority_high">Высокий</label>
              </div>
              <div>
                  <input type="checkbox" id="priority_medium">
                  <label for="priority_medium">Средний</label>
              </div>
              <div>
                  <input type="checkbox" id="priority_low">
                  <label for="priority_low">Низкий</label>
              </div>
          </div>
      </div>
      <div>Дата:
          <input class="date__input" type="date" id="start" name="trip-start" value="2023-02-22"
              min="2018-01-01" max="2023-02-28">
          -
          <input class="date__input" type="date" id="start" name="trip-start" value="2023-02-22"
              min="2018-01-01" max="2023-02-28">
      </div>
      <div>Приватность:
          <div class="privacy">
              <div>
                  <input type="checkbox" id="privacy_all">
                  <label for="privacy_all">Все</label>
              </div>
              <div>
                  <input type="checkbox" id="privacy_own">
                  <label for="privacy_own">Личные</label>
              </div>
              <div>
                  <input type="checkbox" id="privacy_public">
                  <label for="privacy_public">Общедоступные</label>
              </div>
          </div>
      </div>
      <button class="filter-button">Сбросить</button>`;

    // Если применен какой-то фильтр, то кнопка появляется
    // taskCollection._tasks это пример, что пользователь применил фильтр
    if (taskCollection._tasks) {
      const filterButton = document.querySelector(".filter-button");
      filterButton.style.display = "block";
    }
  }

  getUniqueAssignees(tasks) {
    const assignees = new Set();

    for (let task of tasks) {
      assignees.add(task.assignee);
    }

    let filterAssignee = "";
    assignees.forEach((user) => {
      filterAssignee += `<option class="filter-select__option">${user}</option> `;
    });

    return filterAssignee;
  }
}
