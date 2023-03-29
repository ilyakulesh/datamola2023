const eyeIcons = document.querySelectorAll(".eye-icon");

const eyeIconPassword = document.querySelector("#eye-icon__password");
const eyeIconConfirm = document.querySelector("#eye-icon__confirm");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirm-password");

eyeIcons.forEach(function (eyeIcon) {
  eyeIcon.addEventListener("click", function () {
    if (eyeIcon === eyeIconPassword) {
      const type =
        password.getAttribute("type") === "password" ? "text" : "password";
      password.setAttribute("type", type);
      this.classList.toggle("hide");
    } else {
      const type =
        confirmPassword.getAttribute("type") === "password"
          ? "text"
          : "password";
      confirmPassword.setAttribute("type", type);
      this.classList.toggle("hide");
    }
  });
});

const regAuthButton = document.querySelector("#reg-form__auth-button");
regAuthButton.addEventListener("click", () => {
  window.location.replace("main.html");
});
