const themeButton = document.getElementById("chk");
const root = document.querySelector(":root");
const checkbox = document.querySelector(".checkbox");
const logoName = document.querySelector(".logo-name");

const themes = {
  default: {
    "--background-color": "#f5f7fb",
    "--background-secondary": "#ffffff",
    "--background-buttons": "#31416d",
    "--black-color": "#333333",
    "--footer-color": "#1f2430",
  },
  dark: {
    "--background-color": "#202124",
    "--background-secondary": "#292a2d",
    "--background-buttons": "#272727",
    "--black-color": "#ffffff",
    "--footer-color": "#292a2d",
  },
};

if (!localStorage.getItem("theme")) {
  localStorage.setItem("theme", false);
}

let isDarkTheme = JSON.parse(localStorage.getItem("theme"));

changeTheme(isDarkTheme);
checkbox.checked = isDarkTheme ? true : false;

themeButton.onclick = (e) => {
  e.preventDefault;
  isDarkTheme = !isDarkTheme;
  localStorage.setItem("theme", isDarkTheme);
  changeTheme(isDarkTheme);
};

function changeTheme(isDarkTheme) {
  const theme = isDarkTheme ? "dark" : "default";

  if (theme === "dark") {
    logoName.src = "./assets/img/NameDark.svg";
  } else {
    logoName.src = "./assets/img/Name.svg";
  }

  Object.entries(themes[theme]).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
}
