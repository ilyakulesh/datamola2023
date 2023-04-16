export class HeaderView {
  constructor(containerId) {
    this.container = document.querySelector(containerId);
  }

  display(user) {
    if (user) {
      const userName = document.querySelector(".menu-name__user-name");
      userName.innerText = user;

      const button = document.querySelector(".header-button");
      button.textContent = "Выйти";
      button.setAttribute("id", "exit-button");

      const createTask = document.querySelector("#create-task__button");
      console.log("createTask", createTask);
      createTask.style.visibility = "visible";
    } else {
      const userName = document.querySelector(".menu-name__user-name");
      userName.innerText = null;

      const button = document.querySelector(".header-button");
      button.textContent = "Войти";
      button.setAttribute("id", "auth-button");

      const createTask = document.querySelector("#create-task__button");
      createTask.style.visibility = "hidden";
    }
  }
}
