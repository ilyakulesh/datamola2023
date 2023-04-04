const createList = (title, list) => {
  const heading = document.createElement("h2");
  heading.innerText = title;

  const ul = document.createElement("ul");

  const createListItem = (item) => {
    const li = document.createElement("li");
    li.innerText = item.value;

    if (item.children) {
      const ul = document.createElement("ul");

      item.children.forEach((child) => {
        ul.appendChild(createListItem(child));
      });

      li.appendChild(ul);
    }

    return li;
  };

  list.forEach((item) => {
    ul.appendChild(createListItem(item));
  });

  document.body.appendChild(heading);
  document.body.appendChild(ul);
};

const list = [
  {
    value: "Пункт 1.",
    children: null,
  },
  {
    value: "Пункт 2.",
    children: [
      {
        value: "Подпункт 2.1.",
        children: null,
      },
      {
        value: "Подпункт 2.2.",
        children: [
          {
            value: "Подпункт 2.2.1.",
            children: null,
          },
          {
            value: "Подпункт 2.2.2.",
            children: null,
          },
        ],
      },
      {
        value: "Подпункт 2.3.",
        children: null,
      },
    ],
  },
  {
    value: "Пункт 3.",
    children: null,
  },
];

createList("My List", list);

const moveList = () => {
  const list = document.getElementById("myList");
  list.addEventListener("click", (event) => {
    const clickedElement = event.target;
    if (clickedElement.tagName === "LI") {
      const subList = clickedElement.querySelector("ul");
      if (subList) {
        subList.style.display =
          subList.style.display === "none" ? "block" : "none";
      }
    }
  });
};

moveList();
