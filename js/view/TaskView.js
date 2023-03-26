export class TaskView {
  constructor(containerId) {
    this.container = document.querySelector(containerId);
  }

  display(task) {
    this.container.innerHTML = "";

    this.container.innerHTML = `
    <div class="info-task">        
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
                    <div>
                        <div class="task-description">
                        ${task.description}
                        </div>
                    </div>
                    <div class="comment">Комментарии:
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
                    <div>${task.isPrivate ? "Приватная" : "Публичная"}</div>
                </div>
                <div>Исполнитель:
                    <div class="status-task__assignee">${task.assignee}</div>
                </div>
                <div>Создано ${task.createdAt}</div>
            </div>
        </div>
        </div>
        <div class="button-wrapper">
            <button class="main-page-button">На главную</button>
        </div>`;

    if (task.comments.length > 0) {
      task.comments.forEach((comm) => {
        const comment = document.querySelector(".comment");

        const newComment = document.createElement("div");
        newComment.className = "new-comment";
        comment.append(newComment);

        newComment.innerHTML = `
          <div class="comment-wrapper">
          <div>${comm.author}</div>
          <div>${comm.createdAt}</div>
          </div>
          <div class="task-comment">
          ${comm.text}
          </div>`;
      });
    }
  }
}
