import { ERRORS } from "../components/consts.js";
import { users } from "../components/users.js";

import { UserCollection } from "../model/userCollection.js";
const userCollection = new UserCollection(users);

import { AuthView } from "./AuthView.js";
const authView = new AuthView("main");

import { TaskFeedApiService } from "../utils/TaskFeedApiService.js";

const taskFeedApiService = new TaskFeedApiService(
  "http://169.60.206.50:7777/api"
);

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
              <label>
              <input id="avatar-checkbox" type="checkbox" name="avatar" value="avatar1">
              <img id="man__img"  alt="Avatar1" style="width:39px; height:39px;">
            </label>
            
            <label>
              <input id="avatar-checkbox" type="checkbox" name="avatar" value="avatar2">
              <img id="woman__img" alt="Avatar 2" style="width:39px; height:39px;">
            </label>
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
    const manImg = document.querySelector("#man__img");
    manImg.src =
      "../../UI/assets/img/user-profile-avatar-man-boy-round-png-icon-free-download-453813.png";
    const womanImg = document.querySelector("#woman__img");
    womanImg.src =
      "../../UI/assets/img/female-avatar-hospital-staff-lady-doctor-icon-with-png-754945.png";
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

      function convertImageToBase64(url, callback) {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = function () {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.height = img.naturalHeight;
          canvas.width = img.naturalWidth;
          ctx.drawImage(img, 0, 0);
          const dataURL = canvas.toDataURL("image/png");
          callback(dataURL);
        };
        img.src = url;
      }

      const avatarInputs = document.querySelectorAll('input[name="avatar"]');
      let selectedAvatar = null;

      avatarInputs.forEach((input) => {
        input.addEventListener("change", (event) => {
          if (event.target.checked) {
            const imgId =
              event.target.value === "avatar1" ? "man__img" : "woman__img";
            const img = document.querySelector(`#${imgId}`);
            convertImageToBase64(img.src, (base64) => {
              selectedAvatar = base64.replace(
                /^data:image\/(png|jpg);base64,/,
                ""
              );
            });
            avatarInputs.forEach((otherInput) => {
              if (otherInput !== event.target) {
                otherInput.checked = false;
              }
            });
          } else {
            selectedAvatar = null;
          }
        });
      });

      const loadAvatarButton = document.querySelector(".reg-form__load-avatar");
      loadAvatarButton.addEventListener("click", () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.onchange = (event) => {
          const file = event.target.files[0];
          const reader = new FileReader();
          reader.onload = (event) => {
            const base64 = event.target.result;
            selectedAvatar = base64.replace(
              /^data:image\/(png|jpg);base64,/,
              ""
            );
          };
          reader.readAsDataURL(file);
        };
        input.click();
      });

      formReg.addEventListener("submit", (e) => {
        e.preventDefault();
        const latinRegex = /^[a-zA-Z]+$/;
        if (!latinRegex.test(loginReg.value)) {
          loginReg.value = "";
          loginRegError.style.visibility = "visible";
          throw new Error(ERRORS.latinError);
        }

        const latinСyrillicRegex = /^[a-zA-Zа-яА-Я\s]*$/;
        if (!latinСyrillicRegex.test(usernameReg.value)) {
          usernameReg.value = "";
          usernameRegErrorTwo.style.visibility = "visible";
          throw new Error(ERRORS.latinOrCyrillicError);
        }

        if (usernameReg.value.length > 100) {
          usernameReg.value = "";
          usernameRegError.style.visibility = "visible";
          throw new Error(ERRORS.userNameError);
        }

        if (passwordReg.value !== confirmPasswordReg.value) {
          passwordRegError.style.visibility = "visible";
          throw new Error(ERRORS.passDontMatch);
        }

        const inputs = formReg.querySelectorAll("input");
        const data = {};

        inputs.forEach((input) => {
          data[input.id] = input.value;
        });

        const newUser = {
          login: data.login,
          userName: data.username,
          password: data.password,
          retypedPassword: data.confirmPassword,
          photo: selectedAvatar,
        };
        console.log("newUser", newUser);

        taskFeedApiService.registerUser(newUser).then((response) => {
          console.log("response", response);
        });

        authView.display();
        authView.authCheck();
      });
    } catch (err) {
      console.error(err);
    }
  }
}
