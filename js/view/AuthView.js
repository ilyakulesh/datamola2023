import { tasks } from "../components/tasks.js";
import { users } from "../components/users.js";

import { TaskCollection } from "../model/index.js";
const taskCollection = new TaskCollection(tasks);

import { UserCollection } from "../model/userCollection.js";
const userCollection = new UserCollection(users);

import { TaskFeedView } from "../view/TaskFeedView.js";
const taskFeedView = new TaskFeedView(".main-container");

import { TaskController } from "../controller/TaskController.js";
const taskController = new TaskController();

import { TaskFeedApiService } from "../utils/TaskFeedApiService.js";

const taskFeedApiService = new TaskFeedApiService(
  "http://169.60.206.50:7777/api"
);

export class AuthView {
  constructor(containerId) {
    this.container = document.querySelector(containerId);
  }

  display() {
    this.container.innerHTML = "";

    this.container.innerHTML = `
    <div class="auth-form">
    <div class="reg-form">
        <div class="reg-form__header">
            <div class="reg-form__header-wrapper">
                    <button id="reg-form-auth" class="reg-form__auth">Вход</button>
                    <button id="reg-form-reg">Регистрация</button>
            </div>
            <hr>
        </div>
  
        <div class="reg-form__main">
            <form class="reg-form__main-wrapper" id="form2">
                <div>
                    <input type="text" id="login" placeholder="Логин*" required>
                </div>
                <div>
                    <input type="password" id="password" placeholder="Пароль*" required>
                    <span toggle="#password" class="eye-icon" id="eye-icon__password"></span>
                    <span id="password-auth__err" class="reg-form__error" style="visibility: hidden;">Логин или пароль неверные</span>
                </div>
            </form>
        </div>
  
        <div class="reg-form__footer">
            <button id="reg-form__auth-button" class="reg-button" form="form2">
                Войти
            </button>
        </div>
    </div>
    <div class="button-wrapper">
            <button id="main-page__no-user" class="main-page-button">На главную</button>
    </div>
  </div>
    `;
  }

  authCheck() {
    try {
      const formReg = document.querySelector(".reg-form__main-wrapper");

      const passwordAuthErr = document.querySelector("#password-auth__err");

      formReg.addEventListener("submit", async (e) => {
        e.preventDefault();

        const inputs = formReg.querySelectorAll("input");
        const data = {};

        inputs.forEach((input) => {
          data[input.id] = input.value;
        });

        console.log(data);

        const userLogin = await taskFeedApiService.login(
          data.login,
          data.password
        );

        if (userLogin) {
          console.log("Найден");
          const main = document.querySelector("main");
          main.innerHTML = "";

          const mainContainer = document.createElement("div");
          mainContainer.className = "main-container";

          main.appendChild(mainContainer);

          const findUserByLogin = (users, login) => {
            for (let i = 0; i < users.length; i++) {
              if (users[i].login === login) {
                console.log(users[i].id);
              }
            }
          };

          await taskFeedApiService.getAllUsers().then((users) => {
            console.log("getUsers", users);
            findUserByLogin(users, userLogin.login);
          });

          taskController.setCurrentUser(userLogin.login);
        } else {
          passwordAuthErr.style.visibility = "visible";
        }
      });
    } catch (err) {
      console.error(err);
    }
  }
}
