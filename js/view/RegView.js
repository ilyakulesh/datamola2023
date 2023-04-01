import { users } from "../components/users.js";

import { UserCollection } from "../model/userCollection.js";
const userCollection = new UserCollection(users);

import { AuthView } from "./AuthView.js";
const authView = new AuthView("main");

export class RegView {
  constructor(containerId) {
    this.container = document.querySelector(containerId);
  }

  display() {
    this.container.innerHTML = "";

    this.container.innerHTML = `
      <div class="main__reg-form">
      <div class="reg-form">
          <div class="reg-form__header">
              <div class="reg-form__header-wrapper">
                  <button id="reg-form-auth">Вход</button>
                  <button id="reg-form-reg" class="reg-form__reg">Регистрация</button>
              </div>
              <hr>
          </div>
    
          <div class="reg-form__main">
              <form class="reg-form__main-wrapper" id="form1">
                  <div>
                      <input type="text" id="login" class="login-reg" placeholder="Логин*" required>
                      <span id="login-reg__err" class="reg-form__error" style="visibility: hidden;">Введите логин,
                          состоящий из латинских
                          символов</span>
                          <span id="login-reg__err-two" class="reg-form__error" style="visibility: hidden;">Пользователь с таким логином уже существует</span>
                  </div>
                  <div>
                      <input type="password" id="password" class="password-reg" placeholder="Пароль*" required>
                      <span toggle="#password" class="eye-icon" id="eye-icon__password"></span>
                  </div>
                  <div>
                      <input type="password" id="confirmPassword" class="confirm-password-reg"
                          placeholder="Подтверждение пароля*" required>
                      <span toggle="#password" class="eye-icon" id="eye-icon__confirm"></span>
                      <span id="password-reg__err" class="reg-form__error" style="visibility: hidden;">Пароли не
                          совпадают</span>
                  </div>
                  <div>
                      <input type="text" id="username" class="username-reg" placeholder="Имя пользователя*"
                          required>
                      <span id="username-reg__err" class="reg-form__error" style="visibility: hidden;">Имя
                          пользователя превышает 100
                          символов</span>
                          <span id="username-reg__err-two" class="reg-form__error" style="visibility: hidden;">Введите логин,
                          состоящий из латиницы и кириллицы</span>
                  </div>
              </form>
              <div class="reg-form__main-avatar">
                  <button class="reg-form__choose-avatar">Выберите аватар</button>
                  <div>или</div>
                  <button class="reg-form__load-avatar">Загрузите аватар</button>
              </div>
          </div>
    
          <div class="reg-form__footer">
              <button class="reg-button" form="form1">
                  Зарегистрироваться
              </button>
          </div>
      </div>
      <div class="button-wrapper">
              <button id="main-page__no-user" class="main-page-button">На главную</button>
      </div>
    </div>
      `;
  }

  regCheck() {
    try {
      const formReg = document.querySelector(".reg-form__main-wrapper");

      const loginReg = document.querySelector(".login-reg");
      const passwordReg = document.querySelector(".password-reg");
      const confirmPasswordReg = document.querySelector(
        ".confirm-password-reg"
      );
      const usernameReg = document.querySelector(".username-reg");

      const loginRegError = document.querySelector("#login-reg__err");
      const loginRegErrTwo = document.querySelector("#login-reg__err-two");
      const passwordRegError = document.querySelector("#password-reg__err");
      const usernameRegError = document.querySelector("#username-reg__err");
      const usernameRegErrorTwo = document.querySelector(
        "#username-reg__err-two"
      );

      const regButton = document.querySelector(".reg-button");

      formReg.addEventListener("submit", (e) => {
        e.preventDefault();
        const latinRegex = /^[a-zA-Z]+$/;
        if (!latinRegex.test(loginReg.value)) {
          loginReg.value = "";
          loginRegError.style.visibility = "visible";
          throw new Error("Ошибка: введите текст на латинице");
        }

        const latinСyrillicRegex = /^[a-zA-Zа-яА-Я\s]*$/;
        if (!latinСyrillicRegex.test(usernameReg.value)) {
          usernameReg.value = "";
          usernameRegErrorTwo.style.visibility = "visible";
          throw new Error("Ошибка: введите текст на латинице или кириллице");
        }

        if (usernameReg.value.length > 100) {
          usernameReg.value = "";
          usernameRegError.style.visibility = "visible";
          throw new Error("Ошибка: имя пользователя превышает 100 символов");
        }

        if (passwordReg.value !== confirmPasswordReg.value) {
          passwordRegError.style.visibility = "visible";
          throw new Error("Ошибка: пароли не совпадают");
        }

        const inputs = formReg.querySelectorAll("input");
        const data = {};

        inputs.forEach((input) => {
          data[input.id] = input.value;
        });

        if (userCollection.hasLogin(data.login)) {
          loginRegErrTwo.style.visibility = "visible";
          throw new Error("Ошибка: такой пользователь уже существует");
        }

        // regButton.disabled = false;

        console.log(data);
        userCollection.add(
          data.login,
          data.password,
          data.confirmPassword,
          data.username
        );

        authView.display();
      });
    } catch (err) {
      console.error(err);
    }
  }
}
