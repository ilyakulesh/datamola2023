export class TaskFeedView {
  constructor(containerId) {
    this.container = document.querySelector(containerId);
  }

  display(tasks) {
    this.container.innerHTML = "";
    this.container.innerHTML = `
    <div class="main-container__wrapper">
        <div class="main-container__wrapper-section">
            Нужно сделать
        </div>
        <section class="todo">
        ${this.newTask(this.filterTask(tasks, "To Do"))}
        </section>
    </div>


    <div class="main-container__wrapper">
        <div class="main-container__wrapper-section">
            В процессе
        </div>
        <section class="inprogress">
        ${this.newTask(this.filterTask(tasks, "In progress"))}
        </section>
    </div>

    <div class="main-container__wrapper">
        <div class="main-container__wrapper-section">
            Готово
        </div>
        <section class="complete">
        ${this.newTask(this.filterTask(tasks, "Complete"))}
        </section>
    </div>`;
  }

  filterTask(tasks, status) {
    return tasks.filter((task) => task.status === status);
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

  newTask(tasks) {
    let taskList = "";
    tasks.forEach((task) => {
      taskList += `<div class="task">
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
                      <div class="task__icons">
                          <i class="fa-solid fa-pencil"></i>
                          <i class="fa-solid fa-trash"></i>
                      </div>
                  </div>
                  </div>`;
    });

    // const section = document.querySelectorAll("section");

    // section.forEach((list) => {
    //   if (list.children.length >= 10) {
    //     const loadmore = document.createElement("div");
    //     loadmore.className = "loadmore";
    //     list.append(loadmore);
    //     loadmore.innerHTML = `
    //     <button class="loadmore">
    //       + Загрузить еще
    //     </button>`;
    //   }
    // });
    return taskList;
  }
}
