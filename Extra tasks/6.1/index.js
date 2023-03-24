const createCalendar = (elem, year, month) => {
  const daysOfWeek = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

  const date = new Date(year, month - 1, 1);

  const table = document.createElement("table");
  elem.appendChild(table);

  const thead = document.createElement("thead");
  table.appendChild(thead);

  const header = document.createElement("tr");

  for (let day of daysOfWeek) {
    const th = document.createElement("th");
    th.textContent = day;
    header.appendChild(th);
  }

  thead.appendChild(header);

  const tbody = document.createElement("tbody");
  table.appendChild(tbody);

  let row = document.createElement("tr");
  tbody.appendChild(row);

  for (let i = 0; i < date.getDay() - 1; i++) {
    const cell = document.createElement("td");
    row.appendChild(cell);
  }

  while (date.getMonth() === month - 1) {
    const cell = document.createElement("td");
    cell.textContent = date.getDate();

    row.appendChild(cell);

    if (date.getDay() === 0) {
      row = document.createElement("tr");
      tbody.appendChild(row);
    }

    date.setDate(date.getDate() + 1);
  }

  for (let i = date.getDay(); i <= 7; i++) {
    const cell = document.createElement("td");
    row.appendChild(cell);
  }
};

const container = document.querySelector(".calendar");
createCalendar(container, 2023, 3);
