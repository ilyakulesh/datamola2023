import { snake } from "../utils/snake.js";

export class ErrorView {
  constructor(containerId) {
    this.container = document.querySelector(containerId);
  }

  display() {
    this.container.innerHTML = "";

    this.container.innerHTML = `
    <div class="main-error__wrapper">
    <div class="main-error__top">
        <div class="main-error__left">
            <div class="main-error__text">
                Ой!<br><br>Похоже что-то пошло не так.<br><br>Код ошибки:
            </div>
            <div class="button-wrapper">
                <button id="main-page__user" class="main-page-button">На главную</button>
            </div>
        </div>
        <div class="main-error__right"><img src="./assets/img/cross.png" alt=""></div>
    </div>
    <div class="snake-error__wrapper">
        <canvas id="canvas" width="400" height="300"></canvas>
        <br />
        <div class="snake-error__buttons-wrapper">
            <button id="startButton">Старт</button>
            <button id="restartButton" disabled>Начать новую игру</button>
        </div>
    </div>

</div>
`;
    snake();
  }
}
