const ERRORS = {
  idError: "Поле id не должно быть пустым/id должен быть string",
  nameError: "Имя не должно быть пустым/более 100 символов",
  descriptionError:
    "Описание не должно быть пустым/более 280 символов/должно быть string",
  dateError: "Неправильная дата",
  assigneeError: "Поле юзер не должно быть пустым",
  statusError: "Неправильный статус",
  priorityError: "Неправильный приоритет",
  isPrivateError: "Неправильная приватность",
  commentsError: "Комментарии должны быть в массиве",
  authorError: "Поле автор не должно быть пустым",
  taskNotValidate: "Задача не прошла валидацию",
  checkIdError: "Такой задачи не существует",
  validateCommentError: "Ошибка валидации комментария",
  taskToCommentError: "Задачи с таким id не существует",
  changeUserError: "Usr должен быть string",
  editTaskAssigneeError: "Текущий пользователь не совпадает с автором задачи",
  taskNotFound: "Задача не найдена",
  notObjError: "Не является обьектом",
  checkIsNumError: "Не является числом",
};

const TASK_MAX_LENGTH = {
  name: 100,
  description: 280,
  comment: 280,
};

const TASK_STATUS = {
  toDo: "To Do",
  inProgress: "In progress",
  complete: "Complete",
};

const TASK_PRIORITY = {
  high: "High",
  medium: "Medium",
  low: "Low",
};
