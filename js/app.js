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

setCurrentUser("IlyaKulesh");

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
  isPrivate: true,
});

removeTask("10");

// getFeed(0, 10, { assignee: "IlyaKulesh" });

// showTask("1");

filterView.display();
