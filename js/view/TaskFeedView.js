import { ERRORS } from "../components/consts.js";
import { FilterView } from "./FilterView.js";
const filterView = new FilterView(".filter-content");

import { formDate } from "../utils/utils.js";

import { TaskFeedApiService } from "../utils/TaskFeedApiService.js";
const taskFeedApiService = new TaskFeedApiService(
  "http://169.60.206.50:7777/api"
);

export class TaskFeedView {
  constructor(containerId) {
    this.container = document.querySelector(containerId);
    this.limit = 10;
    this._position = localStorage.getItem("taskFeedViewPosition") || "columns";
  }

  get position() {
    return this._position;
  }

  set position(value) {
    this._position = value;
    localStorage.setItem("taskFeedViewPosition", value);
  }

  display(tasks, user) {
    console.log("tasksDisplay0", tasks);
    const mainButtonsCheck = document.querySelector(".main-buttons");
    const mainContainer = document.querySelector(".main-container");

    if (!mainButtonsCheck || !mainContainer) {
      const main = document.querySelector("main");

      const mainButtons = document.createElement("div");
      mainButtons.className = "main-buttons";
      mainButtons.innerHTML = `
        <div class="main-view">
            <button class="buttons" id="view__button">Вид
                <i id="main-view-icon" class="fa-solid fa-angle-up rotate"></i></button>
            <div class="view-content" style="display:none"></div>
        </div>
        <button class="buttons" id="create-task__button">+ Создать новую задачу</button>
        <div class="filter">
            <button class="buttons" id="filer__button">Фильтр
                <i id="filter-icon" class="fa-solid fa-angle-up rotate"></i></button>
            <div class="filter-content" style="display:none">
                <div class="filter-dropdown" id="my-form">Фильтр</div>
                <hr>
                <div class="filter-dropdown__assignee">Исполнитель:
                    <select class="filter-select">
                    </select>
                </div>
                <div>Описание задачи:
                    <div>
                        <input class="filter-task__input" type='text' name='filter-task'
                            placeholder="Введите описание задачи...">
                    </div>
                </div>
                <div>Приоритет:
                    <div class="priority">
                        <div>
                            <input type="checkbox" id="priority_high" checked>
                            <label for="priority_high">Высокий</label>
                        </div>
                        <div>
                            <input type="checkbox" id="priority_medium" checked>
                            <label for="priority_medium">Средний</label>
                        </div>
                        <div>
                            <input type="checkbox" id="priority_low" checked>
                            <label for="priority_low">Низкий</label>
                        </div>
                    </div>
                </div>
                <div>Дата:
                    <input class="date__input" type="date" id="start" name="trip-start">
                    -
                    <input class="date__input" type="date" id="start" name="trip-start">
                </div>
                <div>Приватность:
                    <div class="privacy">
                        <div>
                            <input type="checkbox" id="privacy_all" checked>
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
                <button class="filter-button">Сбросить</button>
            </div>
        </div>`;

      main.innerHTML = "";

      const mainContainerDiv = document.createElement("div");
      mainContainerDiv.className = "main-container";

      main.append(mainButtons, mainContainerDiv);
      filterView.display();
      this.container = mainContainerDiv;
    }
    if (this.position === "columns") {
      this.container.innerHTML = "";
      this.container.innerHTML = `
        <div class="main-container__wrapper">
            <div class="main-container__wrapper-section">
                Нужно сделать
            </div>
            <section class="todo">
            ${this.newTask(this.filterTask(tasks, "To Do", user), user)}
            </section>
        </div>
    
        <div class="main-container__wrapper">
            <div class="main-container__wrapper-section">
                В процессе
            </div>
            <section class="inprogress">
            ${this.newTask(this.filterTask(tasks, "In progress", user), user)}
            </section>
        </div>
    
        <div class="main-container__wrapper">
            <div class="main-container__wrapper-section">
                Готово
            </div>
            <section class="complete">
            ${this.newTask(this.filterTask(tasks, "Complete", user), user)}
            </section>
        </div>`;

      this.container.addEventListener("click", (event) => {
        event.preventDefault();
        const loadMoreButton = event.target.closest(".loadmore");
        if (loadMoreButton) {
          this.limit += 10;
          this.display(tasks, user);
        }
      });
    } else {
      this.container.innerHTML = "";
      this.container.innerHTML = `
      <div class="list">
      <div class="list-header">
          <span class="task-group">Группа</span>
          <span class="task-name">Название задачи</span>
          <span class="task-executor">Исполнитель</span>
          <span class="task-date">Дата</span>
          <span class="task-text">Описание</span>
          <span class="task-comments">Комментарии</span>
          <span class="task-status">Статус</span>
          <span class="task-priority">Приоритет</span>
          <span class="task-privacy">Приватность</span>
      </div>

      <div class="list-task">
          <div class="list-task-wrapper">
              <div class="list-todo-wrapper">
                  <div class="list-todo">Нужно сделать</div>
              </div>
              <div class="tasks" style="display: block;">
              ${this.newTask(this.filterTask(tasks, "To Do", user), user)}

              </div>
          </div>
          <div class="wrap-list">
              <button class="wrap-list__button">Свернуть</button>
          </div>
      </div>
      <div class="list-task">
          <div class="list-task-wrapper">
              <div class="list-todo-wrapper">
                  <div class="inprogress-list">В процессе</div>
              </div>
              <div class="tasks" style="display: block;">
              ${this.newTask(this.filterTask(tasks, "In progress", user), user)}
              </div>
          </div>
          <div class="wrap-list">
              <button class="wrap-list__button">Свернуть</button>
          </div>
      </div>
      <div class="list-task">
      <div class="list-task-wrapper"> 
      <div class="list-todo-wrapper">
      <div class="completed-list">Готово</div>
    </div>
    <div class="tasks" style="display: block;">
    ${this.newTask(this.filterTask(tasks, "Complete", user), user)}
    </div>
      </div>
        <div class="wrap-list">
            <button class="wrap-list__button">Свернуть</button>
        </div>
  </div>`;
    }

    // TaskController.taskCollection.save();
  }

  filterTask(tasks, status, user) {
    return tasks.filter(
      (task) =>
        task.status === status &&
        (task.isPrivate === false || task.assignee.userName === user)
    );
  }

  setClasses(condition) {
    switch (condition) {
      case "To Do":
        return "status-wrapper__todo";
      case "In progress":
        return "status-wrapper__inprogress";
      case "Complete":
        return "status-wrapper__complete";
      case "High":
        return "status-wrapper__high";
      case "Medium":
        return "status-wrapper__medium";
      case "Low":
        return "status-wrapper__low";
    }
  }

  newTask(tasks, user) {
    if (this.position === "columns") {
      let taskList = "";

      const visibleTasks = tasks.slice(0, this.limit);
      visibleTasks.forEach((task) => {
        const showIcons = task.creator.userName === user;
        const noUser = user != null;

        taskList += `<div id=${task.id} class="task">
                      <div class="content-wrapper">
                          <div class="task-content">
                              <div class="title">${task.name}</div>
                              <div class="content" id=${
                                noUser ? "task__with-user" : "task__no-user"
                              }>${task.description}
                              </div>
                          </div>
                          <div class="status-wrapper">
                              <div class=${this.setClasses(task.status)}>${
          task.status
        }</div>
                              <div class=${this.setClasses(task.priority)}>${
          task.priority
        }</div>
                              <div class=${
                                task.isPrivate
                                  ? "status-wrapper__private"
                                  : "status-wrapper__public"
                              }>${
          task.isPrivate ? "Приватная" : "Публичная"
        }</div>
                          </div>
                      </div>
                      <div class="task-footer">
                          <div><i class="fa-regular fa-flag"></i>${formDate(
                            task
                          )}</div>
                          <div><i class="fa-regular fa-message"></i>${
                            task.comments.length
                          }</div>
                          <div>${task.assignee.login}</div>
                          <div class="task__icons">${
                            showIcons
                              ? `
                              <button class="task__icons-edit">
                              <i class="fa-solid fa-pencil"></i>
                              </button>
                              <button class="task__icons-delete">
                              <i class="fa-solid fa-trash"></i>
                              </button>`
                              : `
                              <i style="visibility: hidden" class="fa-solid fa-pencil"></i>
                              <i style="visibility: hidden" class="fa-solid fa-trash"></i>`
                          }
    
                          </div>
                      </div>
                      </div>`;
      });

      if (tasks.length > this.limit) {
        taskList += `
            <div class="task-load-more">     
              <button class="loadmore">
                + Загрузить еще
              </button>
            </div>
          `;
      }

      return taskList;
    } else if (this.position === "list") {
      let taskList = "";

      const visibleTasks = tasks.slice(0, this.limit);

      visibleTasks.forEach((task) => {
        const showIcons = task.creator.userName === user;

        taskList += `
    <div id=${task.id} class="task-container">
        <div class="task-example">
            <div class="task-example__name">${task.name}</div>
            <div class="task-example__executor">${task.assignee.login}</div>
            <div class="task-example__date">${formDate(task)}</div>
            <div class="task-example__text">${task.description}</div>
            <div class="task-example__comments">${task.comments.length}</div>
            <div class="task-example__status">${task.status}</div>
            <div class="task-example__priority">${task.priority}</div>
            <div class="task-example__privacy">${
              task.isPrivate ? "Приватная" : "Публичная"
            }</div>
        </div>
        <div class="task-icons">
        ${
          showIcons
            ? `
              <button class="task__icons-edit">
              <i class="fa-solid fa-pencil"></i>
              </button>
              <button class="task__icons-delete">
              <i class="fa-solid fa-trash"></i>
              </button>`
            : `
              <i style="visibility: hidden" class="fa-solid fa-pencil"></i>
              <i style="visibility: hidden" class="fa-solid fa-trash"></i>`
        }
        </div>
    </div>

    <hr>`;
      });

      return taskList;
    }
  }

  async modalNewTask() {
    const modalOverlay = document.createElement("div");
    modalOverlay.classList.add("modal-overlay");
    document.body.appendChild(modalOverlay);

    modalOverlay.style.display = "block";

    const modal = document.createElement("section");
    modal.classList.add("modal");
    modal.innerHTML = `
<div class="modal-wrapper">
    <div class="modal-header">
        <div class="modal-info">
            Создание новой задачи
        </div>
        <div class="modal-close">
            <i class="fa-solid fa-xmark"></i>
        </div>
    </div>
    <div class="modal-content">
        <div class="modal-content__wrapper">
            <div class="modal-content__left">
                <div>Название задачи:
                    <div>
                        <input id="modal-create__name" class="modal-content__input" type='text'
                            placeholder="Введите название задачи...">
                        <span class="modal-error" style="visibility: hidden;">Название не должно превышать 100 символов</span>
                    </div>
                </div>
                <button class="modal-add-img">
                    <i class="fa-solid fa-paperclip"></i>
                    <span>Прикрепить</span>
                </button>
                <div>Описание задачи:
                    <div>
                        <input id="modal-create__description" class="modal-content__input" type='text'
                            placeholder="Введите описание задачи...">
                        <span class="modal-error" style="visibility: hidden;">Описание не должно превышать 280 символов</span>
                    </div>
                </div>
            </div>
            <div class="modal-content__right">
                <div class="modal-content__status">Статус задачи:
                    <select id="modal-select__status" class="modal-content-select">
                        <option class="modal-content-select__option" selected>To Do</option>
                        <option class="modal-content-select__option">In progress</option>
                        <option class="modal-content-select__option">Complete</option>
                    </select>
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
                <div>Приватность:
                    <div id="privacy__create-modal" class="privacy">
                        <div>
                            <input type="checkbox" id="privacy_own">
                            <label for="privacy_own">Личная</label>
                        </div>
                        <div>
                            <input type="checkbox" id="privacy_public">
                            <label for="privacy_public">Общедоступная</label>
                        </div>
                    </div>
                </div>
                <div class="modal-content__assignee">Исполнитель:
                    <select id="modal-content-assignee" class="modal-content-select">${this.getUniqueAssignees(
                      await taskFeedApiService.getAllUsers()
                    )}
                    </select>
                </div>
            </div>
        </div>
    </div>

    <div class="modal-footer">
        <button class="modal-button-close">Сбросить</button>
        <button class="modal-button-save">Сохранить</button>
    </div>
</div>`;

    modalOverlay.appendChild(modal);
  }

  async modalEditTask(title, content) {
    const modalOverlay = document.createElement("div");
    modalOverlay.classList.add("modal-overlay");
    document.body.appendChild(modalOverlay);

    modalOverlay.style.display = "block";

    const modal = document.createElement("section");
    modal.classList.add("modal");
    modal.innerHTML = `
<div class="modal-wrapper">
    <div class="modal-header">
        <div class="modal-info">
            Редактирование задачи
        </div>
        <div class="modal-close">
            <i class="fa-solid fa-xmark"></i>
        </div>
    </div>
    <div class="modal-content">
        <div class="modal-content__wrapper">
            <div class="modal-content__left">
                <div>Название задачи:
                    <div>
                        <input id="modal-create__name" class="modal-content__input" type='text'
                            placeholder="Введите название задачи..." value="${title}">
                        <span id="modal-name-edit__err" class="modal-error" style="visibility: hidden;">Название не должно превышать 100 символов</span>
                    </div>
                </div>
                <button class="modal-add-img">
                    <i class="fa-solid fa-paperclip"></i>
                    <span>Прикрепить</span>
                </button>
                <div>Описание задачи:
                    <div>
                        <input id="modal-create__description" class="modal-content__input" type='text'
                            placeholder="Введите описание задачи..." value="${content}">
                        <span id="modal-description-edit__err" class="modal-error" style="visibility: hidden;">Описание не должно превышать 280 символов</span>
                    </div>
                </div>
            </div>
            <div class="modal-content__right">
                <div class="modal-content__status">Статус задачи:
                    <select class="modal-content-select">
                        <option class="modal-content-select__option" selected>To Do</option>
                        <option class="modal-content-select__option">In progress</option>
                        <option class="modal-content-select__option">Complete</option>
                    </select>
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
                <div>Приватность:
                    <div id="privacy__create-modal" class="privacy">
                        <div>
                            <input type="checkbox" id="privacy_own">
                            <label for="privacy_own">Личная</label>
                        </div>
                        <div>
                            <input type="checkbox" id="privacy_public">
                            <label for="privacy_public">Общедоступная</label>
                        </div>
                    </div>
                </div>
                <div class="modal-content__assignee">Исполнитель:
                <select id="modal-content-assignee" class="modal-content-select">${this.getUniqueAssignees(
                  await taskFeedApiService.getAllUsers()
                )}
                </select>
                </div>
            </div>
        </div>
    </div>

    <div class="modal-footer">
        <button id="modal-button-close__edit" class="modal-button-close">Сбросить</button>
        <button id="modal-button-save__edit" class="modal-button-save">Сохранить</button>
    </div>
</div>`;

    const modalEditCheck = () => {
      try {
        const modalNameEditErr = document.querySelector(
          "#modal-name-edit__err"
        );
        const modalDescriptionEditErr = document.querySelector(
          "#modal-description-edit__err"
        );

        document
          .querySelector(".modal-button-save")
          .addEventListener("click", () => {
            if (modalDescriptionEditErr.value.length > 100) {
              modalDescriptionEditErr.value = "";
              modalDescriptionEditErr.style.visibility = "visible";
              throw new Error(ERRORS.userNameError);
            }
          });
      } catch (err) {}
    };

    modalEditCheck();

    modalOverlay.appendChild(modal);
  }

  mainView() {
    const viewContent = document.querySelector(".view-content");

    viewContent.style.display = "block";

    viewContent.innerHTML = `
        <button class="view-content__columns">Колонками</button>
        <button class="view-content__list">Общим списком</button>
    `;
  }

  getUniqueAssignees(users) {
    const assignees = new Set();

    for (let user of users) {
      assignees.add(user);
    }

    let filterAssignee = "";
    let firstUser = true;
    assignees.forEach((user) => {
      const selected = firstUser ? "selected" : "";
      filterAssignee += `<option id="${user.id}" class="modal-content-select__option" ${selected}>${user.login}</option>`;
      firstUser = false;
    });

    return filterAssignee;
  }
}
