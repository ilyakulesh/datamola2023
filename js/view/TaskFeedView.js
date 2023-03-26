export class TaskFeedView {
  constructor(containerId) {
    this.container = document.querySelector(containerId);
    this.limit = 10;
  }

  display(tasks, user) {
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
      case "High":
        return "status-wrapper__high";
      case "Medium":
        return "status-wrapper__medium";
      case "Low":
        return "status-wrapper__low";
    }
  }

  newTask(tasks, user) {
    let taskList = "";

    const visibleTasks = tasks.slice(0, this.limit);
    visibleTasks.forEach((task) => {
      const showIcons = task.assignee === user;
      const noUser = user != null;

      taskList += `<div ${noUser ? `"href = "task.html"` : ""} class="task">
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
                      <i class="fa-solid fa-pencil"></i>
                      <i class="fa-solid fa-trash"></i>`
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
}
