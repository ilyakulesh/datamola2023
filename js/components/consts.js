export const ERRORS = {
  idError: "Ошибка: Поле id не должно быть пустым/id должен быть string",
  nameError: "Ошибка: Имя не должно быть пустым/более 100 символов",
  descriptionError:
    "Ошибка: Описание не должно быть пустым/более 280 символов/должно быть string",
  dateError: "Ошибка: Неправильная дата",
  assigneeError: "Ошибка: Поле юзер не должно быть пустым",
  statusError: "Ошибка: Неправильный статус",
  priorityError: "Ошибка: Неправильный приоритет",
  isPrivateError: "Ошибка: Неправильная приватность",
  commentsError: "Ошибка: Комментарии должны быть в массиве",
  authorError: "Ошибка: Поле автор не должно быть пустым",
  taskNotValidate: "Ошибка: Задача не прошла валидацию",
  checkIdError: "Ошибка: Такой задачи не существует",
  validateCommentError: "Ошибка: Ошибка валидации комментария",
  taskToCommentError: "Ошибка: Задачи с таким id не существует",
  changeUserError: "Ошибка: Usr должен быть string",
  editTaskAssigneeError:
    "Ошибка: Текущий пользователь не совпадает с автором задачи",
  taskNotFound: "Ошибка: Задача не найдена",
  notObjError: "Ошибка: Не является обьектом",
  notString: "Ошибка: Не является строкой",
  notArrError: "Ошибка: Не является массивом",
  noUserError: "Ошибка: Такой пользователь уже существует",
  passDontMatch: "Ошибка: Пароли не совпадают",
  noArguments: "Ошибка: Нету аргументов",
  latinError: "Ошибка: Введите текст на латинице",
  latinOrCyrillicError: "Ошибка: Введите текст на латинице или кириллице",
  userNameError: "Ошибка: Имя пользователя превышает 100 символов",
  userAlreadyExists: "Ошибка: Такой пользователь уже существует",
  nameIsSame: "Ошибка: Новое имя не должно совпадать со старым",
};

export const TASK_MAX_LENGTH = {
  name: 100,
  description: 280,
  comment: 280,
};

export const TASK_STATUS = {
  toDo: "To Do",
  inProgress: "In progress",
  complete: "Complete",
};

export const TASK_PRIORITY = {
  high: "Высокий",
  medium: "Средний",
  low: "Низкий",
};
