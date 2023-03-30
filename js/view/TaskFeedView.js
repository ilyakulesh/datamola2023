export class TaskFeedView {
  _position = "columns";
  constructor(containerId) {
    this.container = document.querySelector(containerId);
    this.limit = 10;
  }

  get position() {
    return this._position;
  }

  set position(value) {
    this._position = value;
  }

  display(tasks, user) {
    if (this._position === "columns") {
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
        const loadMoreButton = event.target.closest(".loadmore");
        if (loadMoreButton) {
          this.limit += 10;
          this.display(tasks, user);
        }
      });
    }

    if (this._position === "list") {
      this.container.innerHTML = "";
      this.container.innerHTML = `
      <section class="list">
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
              <div class="tasks">
                  <div class="task-container">
                      <div class="task-example">
                          <div class="task-example__name">Название задачи</div>
                          <div class="task-example__executor">Иван Иванов</div>
                          <div class="task-example__date">11 февраля 18:22</div>
                          <div class="task-example__text">Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit,
                              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Viverra orci
                              sagittis eu volutpat. Senectus et netus et malesuada fames ac turpis. Lobortis
                              mattis aliquam faucibus purus in massa tempor nec feugiat. Volutpat ac tincidunt
                              vitae semper. Fames ac turpis egestas integer eget aliquet nibh praesent. Nunc
                              scelerisque viverra mauris in. Pharetra diam sit amet nisl. Lectus magna
                              fringilla
                              urna porttitor rhoncus dolor purus. Enim neque volutpat ac tincidunt vitae.
                          </div>
                          <div class="task-example__comments">2</div>
                          <div class="task-example__status">Нужно сделать</div>
                          <div class="task-example__priority">Низкий</div>
                          <div class="task-example__privacy">Приватная</div>
                      </div>
                      <div class="task-icons">
                          <i class="fa-solid fa-pencil"></i>
                          <i class="fa-solid fa-trash"></i>
                      </div>
                  </div>

                  <hr>

                  <div class="task-container">
                      <div class="task-example">
                          <div class="task-example__name">Название задачи</div>
                          <div class="task-example__executor">Иван Иванов</div>
                          <div class="task-example__date">11 февраля 18:22</div>
                          <div class="task-example__text">Текст задачи будет расположен здесь, задача будет
                              растягиваться вниз</div>
                          <div class="task-example__comments">2</div>
                          <div class="task-example__status">Нужно сделать</div>
                          <div class="task-example__priority">Низкий</div>
                          <div class="task-example__privacy">Приватная</div>
                      </div>
                      <div class="task-icons">
                          <i class="fa-solid fa-pencil"></i>
                          <i class="fa-solid fa-trash"></i>
                      </div>
                  </div>

                  <hr>

                  <div class="task-container">
                      <div class="task-example">
                          <div class="task-example__name">Название задачи</div>
                          <div class="task-example__executor">Иван Иванов</div>
                          <div class="task-example__date">11 февраля 18:22</div>
                          <div class="task-example__text">Текст задачи будет расположен здесь, задача будет
                              растягиваться вниз</div>
                          <div class="task-example__comments">2</div>
                          <div class="task-example__status">Нужно сделать</div>
                          <div class="task-example__priority">Низкий</div>
                          <div class="task-example__privacy">Приватная</div>
                      </div>
                      <div class="task-icons">
                          <i class="fa-solid fa-pencil"></i>
                          <i class="fa-solid fa-trash"></i>
                      </div>
                  </div>

                  <hr>

                  <div class="task-container">
                      <div class="task-example">
                          <div class="task-example__name">Название задачи</div>
                          <div class="task-example__executor">Иван Иванов</div>
                          <div class="task-example__date">11 февраля 18:22</div>
                          <div class="task-example__text">Текст задачи будет расположен здесь, задача будет
                              растягиваться вниз</div>
                          <div class="task-example__comments">2</div>
                          <div class="task-example__status">Нужно сделать</div>
                          <div class="task-example__priority">Низкий</div>
                          <div class="task-example__privacy">Приватная</div>
                      </div>
                      <div class="task-icons">
                          <i class="fa-solid fa-pencil"></i>
                          <i class="fa-solid fa-trash"></i>
                      </div>
                  </div>

                  <hr>

                  <div class="task-container">
                      <div class="task-example">
                          <div class="task-example__name">Название задачи</div>
                          <div class="task-example__executor">Иван Иванов</div>
                          <div class="task-example__date">11 февраля 18:22</div>
                          <div class="task-example__text">Текст задачи будет расположен здесь, задача будет
                              растягиваться вниз</div>
                          <div class="task-example__comments">2</div>
                          <div class="task-example__status">Нужно сделать</div>
                          <div class="task-example__priority">Низкий</div>
                          <div class="task-example__privacy">Приватная</div>
                      </div>
                      <div class="task-icons">
                          <i class="fa-solid fa-pencil"></i>
                          <i class="fa-solid fa-trash"></i>
                      </div>
                  </div>

                  <hr>

                  <div class="task-container">
                      <div class="task-example">
                          <div class="task-example__name">Название задачи</div>
                          <div class="task-example__executor">Иван Иванов</div>
                          <div class="task-example__date">11 февраля 18:22</div>
                          <div class="task-example__text">Текст задачи будет расположен здесь, задача будет
                              растягиваться вниз</div>
                          <div class="task-example__comments">2</div>
                          <div class="task-example__status">Нужно сделать</div>
                          <div class="task-example__priority">Низкий</div>
                          <div class="task-example__privacy">Приватная</div>
                      </div>
                      <div class="task-icons">
                          <i class="fa-solid fa-pencil"></i>
                          <i class="fa-solid fa-trash"></i>
                      </div>
                  </div>

                  <hr>

                  <div class="task-container">
                      <div class="task-example">
                          <div class="task-example__name">Название задачи</div>
                          <div class="task-example__executor">Иван Иванов</div>
                          <div class="task-example__date">11 февраля 18:22</div>
                          <div class="task-example__text">Текст задачи будет расположен здесь, задача будет
                              растягиваться вниз</div>
                          <div class="task-example__comments">2</div>
                          <div class="task-example__status">Нужно сделать</div>
                          <div class="task-example__priority">Низкий</div>
                          <div class="task-example__privacy">Приватная</div>
                      </div>
                      <div class="task-icons">
                          <i class="fa-solid fa-pencil"></i>
                          <i class="fa-solid fa-trash"></i>
                      </div>
                  </div>

                  <hr>

                  <div class="task-container">
                      <div class="task-example">
                          <div class="task-example__name">Название задачи</div>
                          <div class="task-example__executor">Иван Иванов</div>
                          <div class="task-example__date">11 февраля 18:22</div>
                          <div class="task-example__text">Текст задачи будет расположен здесь, задача будет
                              растягиваться вниз</div>
                          <div class="task-example__comments">2</div>
                          <div class="task-example__status">Нужно сделать</div>
                          <div class="task-example__priority">Низкий</div>
                          <div class="task-example__privacy">Приватная</div>
                      </div>
                      <div class="task-icons">
                          <i class="fa-solid fa-pencil"></i>
                          <i class="fa-solid fa-trash"></i>
                      </div>
                  </div>

                  <hr>

                  <div class="task-container">
                      <div class="task-example">
                          <div class="task-example__name">Название задачи</div>
                          <div class="task-example__executor">Иван Иванов</div>
                          <div class="task-example__date">11 февраля 18:22</div>
                          <div class="task-example__text">Текст задачи будет расположен здесь, задача будет
                              растягиваться вниз</div>
                          <div class="task-example__comments">2</div>
                          <div class="task-example__status">Нужно сделать</div>
                          <div class="task-example__priority">Низкий</div>
                          <div class="task-example__privacy">Приватная</div>
                      </div>
                      <div class="task-icons">
                          <i class="fa-solid fa-pencil"></i>
                          <i class="fa-solid fa-trash"></i>
                      </div>
                  </div>

                  <hr>

                  <div class="task-container">
                      <div class="task-example">
                          <div class="task-example__name">Название задачи</div>
                          <div class="task-example__executor">Иван Иванов</div>
                          <div class="task-example__date">11 февраля 18:22</div>
                          <div class="task-example__text">Текст задачи будет расположен здесь, задача будет
                              растягиваться вниз</div>
                          <div class="task-example__comments">2</div>
                          <div class="task-example__status">Нужно сделать</div>
                          <div class="task-example__priority">Низкий</div>
                          <div class="task-example__privacy">Приватная</div>
                      </div>
                      <div class="task-icons">
                          <i class="fa-solid fa-pencil"></i>
                          <i class="fa-solid fa-trash"></i>
                      </div>
                  </div>
              </div>
          </div>
          <div class="wrap-list">
              <button class="wrap-list__button">Свернуть<i class="fa-solid fa-angle-up"></i></button>
          </div>
      </div>
      <div class="list-task">
          <div class="list-task-wrapper">
              <div class="list-todo-wrapper">
                  <div class="inprogress-list">В процессе</div>
              </div>
              <div class="tasks">
                  <div class="task-container">
                      <div class="task-example">
                          <div class="task-example__name">Название задачи</div>
                          <div class="task-example__executor">Иван Иванов</div>
                          <div class="task-example__date">11 февраля 18:22</div>
                          <div class="task-example__text">Текст задачи будет расположен здесь, задача будет
                              растягиваться вниз</div>
                          <div class="task-example__comments">2</div>
                          <div class="task-example__status">В процессе</div>
                          <div class="task-example__priority">Низкий</div>
                          <div class="task-example__privacy">Приватная</div>
                      </div>
                      <div class="task-icons">
                          <i class="fa-solid fa-pencil"></i>
                          <i class="fa-solid fa-trash"></i>
                      </div>
                  </div>

                  <hr>

                  <div class="task-container">
                      <div class="task-example">
                          <div class="task-example__name">Название задачи</div>
                          <div class="task-example__executor">Иван Иванов</div>
                          <div class="task-example__date">11 февраля 18:22</div>
                          <div class="task-example__text">Текст задачи будет расположен здесь, задача будет
                              растягиваться вниз</div>
                          <div class="task-example__comments">2</div>
                          <div class="task-example__status">В процессе</div>
                          <div class="task-example__priority">Низкий</div>
                          <div class="task-example__privacy">Приватная</div>
                      </div>
                      <div class="task-icons">
                          <i class="fa-solid fa-pencil"></i>
                          <i class="fa-solid fa-trash"></i>
                      </div>
                  </div>
              </div>
          </div>
          <div class="wrap-list">
              <button class="wrap-list__button">Свернуть<i class="fa-solid fa-angle-up"></i></button>
          </div>
      </div>
      <div class="list-task">
          <div class="list-task-unwrap">
              <div class="completed-list">Готово</div>
              <div class="unwrap-list">
                  <button class="unwrap-list__button">Развернуть<i
                          class="fa-solid fa-angle-down"></i></button>
              </div>
          </div>
      </div>
  </section>`;
    }
  }

  filterTask(tasks, status, user) {
    return tasks.filter(
      (task) =>
        task.status === status &&
        (task.isPrivate === false || task.assignee === user)
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
      case "Высокий":
        return "status-wrapper__high";
      case "Средний":
        return "status-wrapper__medium";
      case "Низкий":
        return "status-wrapper__low";
    }
  }

  newTask(tasks, user) {
    let taskList = "";

    const visibleTasks = tasks.slice(0, this.limit);
    visibleTasks.forEach((task) => {
      const showIcons = task.assignee === user;
      const noUser = user != null;

      taskList += `<div id=${task.id} ${
        noUser ? `"href = "task.html"` : ""
      } class="task">
                  <div class="content-wrapper">
                      <div class="task-content">
                          <div class="title">${task.name}</div>
                          <div class="content">${task.description}
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
                          }>${task.isPrivate ? "Приватная" : "Публичная"}</div>
                      </div>
                  </div>
                  <div class="task-footer">
                      <div><i class="fa-regular fa-flag"></i>${
                        task.createdAt
                      }</div>
                      <div><i class="fa-regular fa-message"></i>${
                        task.comments.length
                      }</div>
                      <div>${task.assignee}</div>
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
  }

  modalNewTask() {
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
                    <select class="modal-content-select">
                        <option class="modal-content-select__option" selected>IlyaKulesh</option>
                        <option class="modal-content-select__option">DanielHunt</option>
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

  modalEditTask(task) {
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
            Редактирование задачи задачи
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
                        <input class="modal-content__input" type='text'
                            placeholder="Введите название задачи..." value="${task.name}">
                        <span class="modal-error">Название не должно превышать 100 символов</span>
                    </div>
                </div>
                <button class="modal-add-img">
                    <i class="fa-solid fa-paperclip"></i>
                    <span>Прикрепить</span>
                </button>
                <div>Описание задачи:
                    <div>
                        <input class="modal-content__input" type='text'
                            placeholder="Введите описание задачи..." value="${task.description}">
                        <span class="modal-error">Описание не должно превышать 280 символов</span>
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
                    <div class="privacy">
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
                    <select class="modal-content-select">
                        <option class="modal-content-select__option" selected>IlyaKulesh</option>
                        <option class="modal-content-select__option">DanielHunt</option>
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

  mainView() {
    const viewContent = document.querySelector(".view-content");

    this.position = "list";
    viewContent.style.display = "block";

    viewContent.innerHTML = `
    <a href="main.html">
        <button class="view-content__columns">Колонками</button>
    </a>
    <a href="main(list).html">
        <button class="view-content__list">Общим списком</button>
    </a>
    `;
  }
}
