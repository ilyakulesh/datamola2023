const tasks = [
  {
    id: "1",
    name: "Отдохнуть на море",
    description:
      "Нужно выбрать место отдыха, забронировать гостиницу, купить билеты",
    createdAt: new Date("2023-03-09T23:00:00"),
    assignee: "Ilya Kulesh",
    status: "Complete",
    priority: "Low",
    isPrivate: false,
    comments: [],
  },
  {
    id: "2",
    name: "Найти работу",
    description:
      "Составить резюме и отправлять его на вакансии, а также участвовать в собеседованиях и расширять профессиональные контакты",
    createdAt: new Date("2023-03-09T23:00:00"),
    assignee: "Ilya Kulesh",
    status: "Complete",
    priority: "High",
    isPrivate: false,
    comments: [],
  },
  {
    id: "3",
    name: "Научиться готовить что-нибудь новое",
    description:
      "Найти рецепт, купить продукты, приготовить блюдо и оценить свои старания",
    createdAt: new Date("2023-03-09T23:00:00"),
    assignee: "Ilya Kulesh",
    status: "To Do",
    priority: "Medium",
    isPrivate: true,
    comments: [],
  },
  {
    id: "4",
    name: "Реализовать мультиязычность",
    description: "Добавить поддержку английского языка на сайте",
    createdAt: new Date("2023-03-09T23:00:00"),
    assignee: "Ilya Kulesh",
    status: "In progress",
    priority: "High",
    isPrivate: false,
    comments: [],
  },
  {
    id: "5",
    name: "Закончить домашнее задание",
    description: "Сделать домашку по JS в срок и сдать её",
    createdAt: new Date("2023-03-09T23:00:00"),
    assignee: "Ilya Kulesh",
    status: "Complete",
    priority: "Low",
    isPrivate: false,
    comments: [],
  },
  {
    id: "6",
    name: "Переписать резюме",
    description: "Обновить резюме, чтобы улучшить шансы на поиск работы",
    createdAt: new Date("2023-03-09T23:00:00"),
    assignee: "Ilya Kulesh",
    status: "Complete",
    priority: "High",
    isPrivate: false,
    comments: [],
  },
  {
    id: "7",
    name: "Учить новые слова на английском каждый день",
    description:
      "Учить новые слова на английском каждый день, чтобы расширить свой словарный запас",
    createdAt: new Date("2023-03-09T23:00:00"),
    assignee: "Ilya Kulesh",
    status: "To Do",
    priority: "Medium",
    isPrivate: true,
    comments: [],
  },
  {
    id: "8",
    name: "Организовать день рождения для девушки",
    description:
      "Подготовиться к дню рождения девушки, выбрать подарок, все приготовить и организовать",
    createdAt: new Date("2023-03-09T23:00:00"),
    assignee: "Ilya Kulesh",
    status: "In progress",
    priority: "High",
    isPrivate: false,
    comments: [],
  },
  {
    id: "9",
    name: "Пересмотреть гардероб",
    description:
      "Пересмотреть свой гардероб и избавиться от ненужных вещей, а также купить новую одежду",
    createdAt: new Date("2023-03-09T23:00:00"),
    assignee: "Ilya Kulesh",
    status: "Complete",
    priority: "Low",
    isPrivate: false,
    comments: [],
  },
  {
    id: "10",
    name: "Купить продукты для ужина",
    description:
      "Нужно сходить в магазин и купить все необходимое для приготовления ужина",
    createdAt: new Date("2023-03-09T23:00:00"),
    assignee: "Ilya Kulesh",
    status: "Complete",
    priority: "High",
    isPrivate: false,
    comments: [],
  },
  {
    id: "11",
    name: "Приготовить ужин",
    description: "Приготовить вкусный и здоровый ужин",
    createdAt: new Date("2023-03-09T23:00:00"),
    assignee: "Ilya Kulesh",
    status: "To Do",
    priority: "Medium",
    isPrivate: true,
    comments: [],
  },
  {
    id: "12",
    name: "Записаться на курсы английского языка",
    description:
      "Найти курсы английского языка и записаться на них, чтобы улучшить свои знания языка",
    createdAt: new Date("2023-03-09T23:00:00"),
    assignee: "Ilya Kulesh",
    status: "In progress",
    priority: "High",
    isPrivate: false,
    comments: [],
  },
  {
    id: "13",
    name: "Не забыть про 8 марта",
    description: "Не забыть поздравить всех знакомых девушек/женщин с 8 марта",
    createdAt: new Date("2023-03-09T23:00:00"),
    assignee: "Ilya Kulesh",
    status: "Complete",
    priority: "Low",
    isPrivate: false,
    comments: [],
  },
  {
    id: "14",
    name: "Помочь друзьям с переездом",
    description: "Помочь друзьям собрать вещи и перевезти их в новую квартиру",
    createdAt: new Date("2023-03-09T23:00:00"),
    assignee: "Ilya Kulesh",
    status: "Complete",
    priority: "High",
    isPrivate: false,
    comments: [],
  },
  {
    id: "15",
    name: "Заняться спортом",
    description:
      "Выбрать удобное для себя время и место для занятий, подобрать программу тренировок",
    createdAt: new Date("2023-03-09T23:00:00"),
    assignee: "Ilya Kulesh",
    status: "To Do",
    priority: "Medium",
    isPrivate: true,
    comments: [],
  },
  {
    id: "16",
    name: "Навестить бабушку",
    description: "Найти удобное время для поездки, купить билеты и подарок",
    createdAt: new Date("2023-03-09T23:00:00"),
    assignee: "Ilya Kulesh",
    status: "In progress",
    priority: "High",
    isPrivate: false,
    comments: [],
  },
  {
    id: "17",
    name: "Научиться играть на музыкальном инструменте",
    description:
      "Заниматься регулярно, изучать теорию и практику, слушать и анализировать музыку",
    createdAt: new Date("2023-03-09T23:00:00"),
    assignee: "Ilya Kulesh",
    status: "Complete",
    priority: "Low",
    isPrivate: false,
    comments: [],
  },
  {
    id: "18",
    name: "Заказать билеты на самолет",
    description: "Найти подходящий рейс, выбрать места и оплатить билеты",
    createdAt: new Date("2023-03-09T23:00:00"),
    assignee: "Ilya Kulesh",
    status: "Complete",
    priority: "High",
    isPrivate: false,
    comments: [],
  },
  {
    id: "19",
    name: "Переставить мебель",
    description:
      "Переставить мебель в комнате, чтобы увеличить пространство комнаты",
    createdAt: new Date("2023-03-09T23:00:00"),
    assignee: "Ilya Kulesh",
    status: "To Do",
    priority: "Medium",
    isPrivate: true,
    comments: [],
  },
  {
    id: "20",
    name: "Построить дом",
    description:
      "Выбрать место для дома, разработать проект, найти строителей и начать строить",
    createdAt: new Date("2023-03-09T23:00:00"),
    assignee: "Ilya Kulesh",
    status: "In progress",
    priority: "High",
    isPrivate: false,
    comments: [],
  },
];
