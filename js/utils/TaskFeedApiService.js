// import { AuthView } from "../view/AuthView.js";
// const authView = new AuthView("main");
import { ErrorView } from "../view/ErrorView.js";
const errorView = new ErrorView("main");

export class TaskFeedApiService {
  constructor(serverAddress) {
    this.serverAddress = serverAddress;
  }

  async _makeRequest(endpoint, options = {}) {
    const headers = {
      "Content-Type": "application/json",
    };

    const loader = document.querySelector(".loader");
    loader.style.display = "block";

    if (options.bearerToken) {
      headers["Authorization"] = `Bearer ${options.bearerToken}`;
      delete options.bearerToken;
    }

    const response = await fetch(`${this.serverAddress}${endpoint}`, {
      headers: headers,
      ...options,
    });

    console.log("response", response);

    loader.style.display = "none";

    if (!response.ok && response.status !== "401") {
      errorView.display();
      // if (response.status === "401") {
      //   authView.display();
      //   authView.authCheck();
      //   // taskController.passwordEye();
      // }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // if (response.status === "401") {
    //   authView.display();
    //   authView.authCheck();
    // }

    return response.json();
  }

  async _getTasks() {
    let tasks = [];

    const newTasks = await this._makeRequest("/tasks?skip=0&top=10&status=0");
    tasks = tasks.concat(newTasks);

    setInterval(async () => {
      const updatedTasks = await this._makeRequest(
        "/tasks?skip=0&top=10&status=0"
      );
      tasks = tasks.concat(updatedTasks);
    }, 300000);

    return tasks;
  }

  async getTasks() {
    return await this._getTasks();
  }

  async getAllUsers() {
    return await this._makeRequest(`/user/allUsers`);
  }

  async getMyProfile(bearerToken) {
    return await this._makeRequest(`/user/myProfile`, { bearerToken });
  }

  async getTaskById(id) {
    return await this._makeRequest(`/tasks/${id}`);
  }

  async registerUser(user) {
    const options = {
      method: "POST",
      body: JSON.stringify(user),
    };
    try {
      const response = await this._makeRequest("/user/register", options);
      return response;
    } catch (err) {
      console.error("Ошибка: Ошибка регистрации", err);
      throw err;
    }
  }

  async login(login, password) {
    const options = {
      method: "POST",
      body: JSON.stringify({ login, password }),
    };
    try {
      const response = await this._makeRequest("/auth/login", options);
      localStorage.setItem("token", response.token);
      return response;
    } catch (err) {
      console.error("Ошибка: Ошибка авторизации", err);
      throw err;
    }
  }

  async updateUser(userId, user, bearerToken) {
    const options = {
      method: "PATCH",
      bearerToken,
      body: JSON.stringify(user),
    };
    try {
      const response = await this._makeRequest(`/user/${userId}`, options);
      return response;
    } catch (err) {
      console.error("Ошибка: изменения данных юзера:", err);
      throw err;
    }
  }

  async createTask(task, bearerToken) {
    const options = {
      method: "POST",
      bearerToken,
      body: JSON.stringify(task),
    };
    console.log("options", options);
    try {
      const response = await this._makeRequest(`/tasks`, options);
      return response;
    } catch (err) {
      console.error("Ошибка: создания задачи:", err);
      throw err;
    }
  }

  async updateTask(taskId, task, bearerToken) {
    const options = {
      method: "PATCH",
      bearerToken,
      body: JSON.stringify(task),
    };
    console.log("options", options);
    try {
      const response = await this._makeRequest(`/tasks/${taskId}`, options);
      return response;
    } catch (err) {
      console.error("Ошибка: обновления задачи:", err);
      throw err;
    }
  }

  async getComments(taskId) {
    const options = {
      method: "GET",
    };
    try {
      const response = await this._makeRequest(
        `/tasks/${taskId}/comments`,
        options
      );
      return response;
    } catch (err) {
      console.error("Ошибка: получения комментария:", err);
      throw err;
    }
  }

  async addComment(taskId, comment, bearerToken) {
    const options = {
      method: "POST",
      bearerToken,
      body: JSON.stringify(comment),
    };
    try {
      const response = await this._makeRequest(
        `/tasks/${taskId}/comments`,
        options
      );
      return response;
    } catch (err) {
      console.error("Ошибка: добавления комментария:", err);
      throw err;
    }
  }

  async deleteTask(taskId, bearerToken) {
    const options = {
      method: "DELETE",
      bearerToken,
    };
    try {
      const response = await this._makeRequest(`/tasks/${taskId}`, options);
      return response;
    } catch (err) {
      console.error("Ошибка: удаления задачи:", err);
      throw err;
    }
  }
}
