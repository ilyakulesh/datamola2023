import { tasks } from "../js/components/tasks.js";

import { TaskCollection } from "../js/class/index.js";

class HeaderView {
  constructor(containerId) {
    this.container = document.querySelector(containerId);
  }

  display(user) {
    this.container.prepend(`Welcome, ${user}`);
  }
}

class TaskFeedView {
  constructor(containerId) {
    this.container = document.querySelector(containerId);
  }

  display(tasks) {
    tasks.forEach((task) => {
      const newTask = document.createElement("div");
      newTask.className = "task";
      this.container.prepend(newTask);
      newTask.innerHTML = `
              <div class="content-wrapper">
                  <div class="task-content">
                      <div class="title">${task.name}</div>
                      <div class="content">${task.description}
                      </div>
                  </div>
                  <div class="status-wrapper">
                      <div class="status-wrapper__todo">${task.status}</div>
                      <div class="status-wrapper__medium">${task.priority}</div>
                      <div class="status-wrapper__private">${task.isPrivate}</div>
                  </div>
              </div>
              <div class="task-footer">
                  <div><i class="fa-regular fa-flag"></i>${task.createdAt}</div>
                  <div><i class="fa-regular fa-message"></i>${task.comments.length}</div>
                  <div>${task.assignee}</div>
                  <div class="task__icons">
                      <i class="fa-solid fa-pencil"></i>
                      <i class="fa-solid fa-trash"></i>
                  </div>
              </div>`;
    });
  }
}

class FilterView {
  constructor(containerId) {
    this.container = document.querySelector(containerId);
  }

  display() {
    const newTask = document.createElement("div");
    newTask.className = "filter-content";
    newTask.style.display = "block";
    this.container.append(newTask);
    newTask.innerHTML = `
    <div class="filter-dropdown">Фильтр</div>
    <hr>
    <div>Исполнитель:
        <div>
            <input type="checkbox" id="checkbox_1">
            <label for="checkbox_1">Иван Иванов</label>
        </div>

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
  }
}

class TaskView {
  constructor(containerId) {
    this.container = document.querySelector(containerId);
  }

  display(task) {
    const newTask = document.createElement("div");
    newTask.className = "info-task";
    this.container.prepend(newTask);
    newTask.innerHTML = `        
      <div class="header-info">
          <div class="text-info">Информация о задаче</div>
          <div class="info-task__icons">
              <i class="fa-solid fa-pencil"></i>
              <i class="fa-solid fa-trash"></i>
          </div>
      </div>
      <div class="task-wrapper">
          <div class="full-task">
              <div class="full-task__wrapper">
                  <div>${task.name}</div>
                  <div>Описание задачи:
                      <div class="task-description">
                      ${task.description}
                      </div>
                  </div>
                  <div>Комментарии:
                      <div class="comment-wrapper">
                          <div>${task.comments.assignee}</div>
                          <div>${task.comments.createdAt}</div>
                      </div>
                      <div class="task-comment">
                      ${task.comments.text}
                      </div>
                  </div>
              </div>
              <div class="full-task__comment-wrapper">
                  <input class="full-task__input" type='text' name='comment'
                      placeholder="Добавить комментарий...">
                  <button class="full-task__button">Отправить</button>
              </div>
          </div>
          <div class="status-task">
              <div>Статус задачи:
                  <div class="status-task__todo">${task.status}</div>
              </div>
              <div>Приоритет:
                  <div class="status-task__priority">${task.priority}</div>
              </div>
              <div>Приватность:
                  <div>${task.isPrivate}</div>
              </div>
              <div>Исполнитель:
                  <div class="status-task__assignee">${task.assignee}</div>
              </div>
              <div>Создано ${task.createdAt}</div>
          </div>
      </div>`;
  }
}

const taskCollection = new TaskCollection(tasks);
const headerView = new HeaderView(".menu-name");
const taskFeed = new TaskFeedView("section");
const filterView = new FilterView(".filter");
const taskView = new TaskView("main");

function setCurrentUser(user) {
  taskCollection.user = user;
  console.log("taskCollection.user", taskCollection.user);
  headerView.display(user);
}

function addTask(task) {
  // console.log("taskCollection.add(task)", taskCollection.add(task));
  taskFeed.display(task);
}

function editTask(id, ...task) {
  console.log(
    "taskCollection.edit(id, ...task)",
    taskCollection.edit(id, ...task)
  );
}

function removeTask(id) {
  taskCollection.remove(id);
  //   taskFeed.display(tasks);
}

function getFeed(skip, top, filterConfig) {
  const taskss = taskCollection.getPage(skip, top, filterConfig);
  console.log("getFeed", taskss);
  //   taskFeed.display(tasks);
}

function showTask(id) {
  const taskId = taskCollection.get(id);

  taskView.display(taskId);
}

setCurrentUser("IlyaKulesh");

addTask(tasks);

editTask(
  "19",
  "Тестовая задача edit",
  "Тестовое описание edit",
  "IlyaKulesh",
  "Complete",
  "High",
  true
);

removeTask("15");

getFeed(0, 10, { description: "резюме", priority: "High" });

// showTask("1");

// filterView.display();
