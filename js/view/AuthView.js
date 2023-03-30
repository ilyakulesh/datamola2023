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
            <button id="reg-form__auth-button" type="submit" class="reg-button" form="form2">
                Войти
            </button>
        </div>
    </div>
    <div class="button-wrapper">
        <a href="../UI/main.html">
            <button class="main-page-button">На главную</button>
        </a>
    </div>
  </div>
    `;
  }

  authCheck() {
    const formReg = document.querySelector(".reg-form__main-wrapper");

    const passwordAuthErr = document.querySelector("#password-auth__err");

    formReg.addEventListener("submit", (e) => {
      e.preventDefault();

      const inputs = formReg.querySelectorAll("input");
      const data = {};

      inputs.forEach((input) => {
        data[input.id] = input.value;
      });

      console.log(data);
    });
  }
}
