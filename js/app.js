import {
  setCurrentUser,
  addTask,
  editTask,
  removeTask,
  getFeed,
  showTask,
} from "./utils/globalMethods.js";

import { FilterView } from "./view/FilterView.js";
const filterView = new FilterView(".filter-content");

// Тесты
setCurrentUser(null);
setCurrentUser("IlyaKulesh");
// setCurrentUser("DanielHunt");
// setCurrentUser(null);

addTask({
  name: "Тестовая задача",
  description: "Тестовое описание",
  assignee: "IlyaKulesh",
  status: "Complete",
  priority: "High",
  isPrivate: false,
});

editTask("19", {
  name: "Тестовая задача edit",
  description: "Тестовое описание edit",
  assignee: "IlyaKulesh",
  status: "Complete",
  priority: "High",
  isPrivate: false,
});

removeTask("10");

// getFeed(0, 10, { status: ["To Do", "In progress"], isPrivate: [true, false] });

// showTask("1");

// filterView.display();
