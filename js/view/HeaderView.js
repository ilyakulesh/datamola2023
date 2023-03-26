export class HeaderView {
  constructor(containerId) {
    this.container = document.querySelector(containerId);
  }

  display(user) {
    this.container.prepend(user);

    const button = document.querySelector(".header-button");
    button.textContent = "Выйти";
  }
}
