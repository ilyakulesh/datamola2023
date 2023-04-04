import { users } from "../components/users.js";

import { ERRORS } from "../components/consts.js";

import { TaskController } from "../controller/TaskController.js";
const taskController = new TaskController();

export class UserPageView {
  constructor(containerId) {
    this.container = document.querySelector(containerId);
  }

  display(login) {
    this.container.innerHTML = "";

    this.container.innerHTML = `
    <div class="edit-user">
    <div class="edit-user__header">
        <div class="edit-user__info">Страница пользователя</div>
        <div class="edit-user__icons">
        <button class="edit__user-edit">
            <i class="fa-solid fa-pencil"></i>
        </button>
        </div>
    </div>
    <div class="edit-user-wrapper">
        <div class="user-photo-wrapper">
            <div class="user-photo"></div>
        </div>
        <div class="edit-input-wrapper">
            <div class="edit-input__user-name">${
              taskController.findUser(login).name
            }</div>
            <div class="edit-input__login">${
              taskController.findUser(login).login
            }</div>
            <div class="edit-input__password">${
              taskController.findUser(login).password
            }</div>
        </div>
    </div>
</div>
<div class="button-wrapper">
    <button id="main-page__user" class="main-page-button">На главную</button>
</div>`;
  }

  userPageEdit(login) {
    this.container.innerHTML = "";

    this.container.innerHTML = `
    <div class="edit-user">
    <div class="edit-user-wrapper">
        <div class="user-photo-wrapper">
            <div class="user-photo"></div>
            <button class="user-photo-button">Загрузить</button>
        </div>
        <form class="edit-input-wrapper" id="form3">
            <div>
                <input class="name__edit-user" id="name" type='text' placeholder="Имя пользователя*" value="${
                  taskController.findUser(login).name
                }" required>
                <span id="edit-user__name-err" class="edit-input-wrapper__error" style="visibility: hidden;">Новое имя не должно совпадать со старым</span>
                <span id="edit-user__name-err-two" class="reg-form__error" style="visibility: hidden;">Имя
                пользователя превышает 100
                символов</span>
                <span id="username-reg__err-three" class="reg-form__error" style="visibility: hidden;">Введите логин,
                состоящий из латиницы и кириллицы</span>
            </div>
            <div>
                <input class="login__edit-user" id="login" type='text' placeholder="Логин*" value="${
                  taskController.findUser(login).login
                }" required>
                <span id="edit-user__login-err" class="reg-form__error" style="visibility: hidden;">Введите логин,
                состоящий из латинских
                символов</span>
            </div>
            <div>
                <input class="password__edit-user" type="password" id="password" placeholder="Пароль*" value="${
                  taskController.findUser(login).password
                }" required>
                <span id="edit-user__password-err" class="edit-input-wrapper__error" style="visibility: hidden;">Новый пароль не должен совпадать со старым</span>
                <span toggle="#password" class="eye-icon" id="eye-icon__password"></span>
            </div>
            <div>
                <input class="confirm-password__edit-user" type="password" id="confirmPassword" placeholder="Подтверждение пароля*" required>
                <span toggle="#password" class="eye-icon" id="eye-icon__confirm"></span>
            </div>
        </form>
    </div>
    <div class="edit-user-footer">
        <button id="edit-user__cancel" class="edit-user-button">Сбросить</button>
        <button id="edit-user__save" class="edit-user-button" form="form3">Сохранить</button>
    </div>
</div>
<div class="button-wrapper">
    <button id="main-page__user" class="main-page-button">На главную</button>
</div>`;
  }

  userPageCheck() {
    try {
      const formUserEdit = document.querySelector("#form3");

      const nameEditUser = document.querySelector(".name__edit-user");
      const loginEditUser = document.querySelector(".login__edit-user");
      const passwordEditUser = document.querySelector(".password__edit-user");
      const confirmPasswordEditUser = document.querySelector(
        ".confirm-password__edit-user"
      );

      const editUserNameErr = document.querySelector("#edit-user__name-err");
      const editUserNameErrTwo = document.querySelector(
        "#edit-user__name-err-two"
      );
      const editUserNameErrThree = document.querySelector(
        "#edit-user__name-err-two"
      );
      const editUserPasswordErr = document.querySelector(
        "#edit-user__password-err"
      );
      const editUserLoginErr = document.querySelector("#edit-user__login-err");

      formUserEdit.addEventListener("submit", (event) => {
        event.preventDefault();

        const currentUser = taskController.findUser(
          document.querySelector(".menu-name__user-name").textContent
        );

        if (currentUser.name === nameEditUser.value) {
          editUserNameErr.style.visibility = "visible";
          editUserNameErrThree.style.visibility = "hidden";
          throw new Error(ERRORS.nameIsSame);
        }

        const latinRegex = /^[a-zA-Z]+$/;
        if (!latinRegex.test(loginEditUser.value)) {
          loginEditUser.value = "";
          editUserLoginErr.style.visibility = "visible";
          throw new Error(ERRORS.latinError);
        }

        const latinСyrillicRegex = /^[a-zA-Zа-яА-Я\s]*$/;
        if (!latinСyrillicRegex.test(nameEditUser.value)) {
          nameEditUser.value = "";
          editUserNameErr.style.visibility = "hidden";
          editUserNameErrThree.style.visibility = "visible";
          throw new Error(ERRORS.latinOrCyrillicError);
        }

        if (nameEditUser.value.length > 100) {
          nameEditUser.value = "";
          editUserNameErr.style.visibility = "hidden";
          editUserNameErrThree.style.visibility = "hidden";
          editUserNameErrTwo.style.visibility = "visible";
          throw new Error(ERRORS.userNameError);
        }

        if (passwordEditUser.value !== confirmPasswordEditUser.value) {
          editUserPasswordErr.style.visibility = "visible";
          throw new Error(ERRORS.passDontMatch);
        }

        const inputs = formUserEdit.querySelectorAll("input");
        const data = {};

        inputs.forEach((input) => {
          data[input.id] = input.value;
        });

        currentUser.name = data.name;
        currentUser.login = data.login;
        currentUser.password = data.password;

        console.log("userData", data);
        console.log("currentUser", currentUser);

        taskController.setCurrentUser(currentUser.name);
      });
    } catch (err) {
      console.error(err);
    }
  }
}
