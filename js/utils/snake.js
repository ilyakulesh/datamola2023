export const snake = () => {
  const canvas = document.getElementById("canvas");
  const startButton = document.getElementById("startButton");
  const restartButton = document.getElementById("restartButton");

  const ctx = canvas.getContext("2d");

  let snake = [{ x: 10, y: 10 }];
  let food = { x: 5, y: 5 };

  let direction = "right";

  const gridSize = 20;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "green";
    snake.forEach((segment) => {
      ctx.fillRect(
        segment.x * gridSize,
        segment.y * gridSize,
        gridSize,
        gridSize
      );
    });

    ctx.fillStyle = "red";
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
  }

  function handleKeyPress(e) {
    switch (e.keyCode) {
      case 37:
        if (direction !== "right") {
          direction = "left";
        }
        break;
      case 38:
        if (direction !== "down") {
          direction = "up";
        }
        break;
      case 39:
        if (direction !== "left") {
          direction = "right";
        }
        break;
      case 40:
        if (direction !== "up") {
          direction = "down";
        }
        break;
      default:
        break;
    }
  }

  function update() {
    let head = { ...snake[0] };
    switch (direction) {
      case "left":
        head.x--;
        break;
      case "up":
        head.y--;
        break;
      case "right":
        head.x++;
        break;
      case "down":
        head.y++;
        break;
      default:
        break;
    }
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      food.x = Math.floor(Math.random() * (canvas.width / gridSize));
      food.y = Math.floor(Math.random() * (canvas.height / gridSize));
    } else {
      snake.pop();
    }

    if (
      head.x < 0 ||
      head.x >= canvas.width / gridSize ||
      head.y < 0 ||
      head.y >= canvas.height / gridSize ||
      snake
        .slice(1)
        .some((segment) => segment.x === head.x && segment.y === head.y)
    ) {
      clearInterval(gameInterval);
      restartButton.disabled = false;
    }
  }

  startButton.addEventListener("click", () => {
    snake = [{ x: 10, y: 10 }];
    food = { x: 5, y: 5 };
    direction = "right";

    document.addEventListener("keydown", handleKeyPress);

    gameInterval = setInterval(() => {
      update();
      draw();
    }, 100);

    startButton.disabled = true;
  });

  restartButton.addEventListener("click", () => {
    snake = [{ x: 10, y: 10 }];
    food = { x: 5, y: 5 };
    direction = "right";

    restartButton.disabled = true;

    startButton.disabled = false;
  });

  draw();
};
