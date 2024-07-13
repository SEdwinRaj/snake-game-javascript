// Define HTML elements
const board = document.getElementById('game-board');
const instructionText = document.getElementById('instruction-text');
const logo = document.getElementById('logo');
const score = document.getElementById('score');
const highScoreText = document.getElementById('highScore');

// Define game variables
const gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = generateFood();
let highScore = 0;
let direction = 'right';
let gameInterval;
let gameSpeedDelay = 200;
let gameStarted = false;

// Draw game map, snake, food
function draw() {
  board.innerHTML = '';
  drawSnake();
  drawFood();
  updateScore();
}

// Draw snake
function drawSnake() {
  snake.forEach((segment) => {
    const snakeElement = createGameElement('div', 'snake');
    setPosition(snakeElement, segment);
    board.appendChild(snakeElement);
  });
}

// Create a snake or food cube/div
function createGameElement(tag, className) {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

// Set the position of snake or food
function setPosition(element, position) {
  element.style.gridColumn = position.x;
  element.style.gridRow = position.y;
}


// Draw food function
function drawFood() {
  if (gameStarted) {
    const foodElement = createGameElement('div', 'food');
    setPosition(foodElement, food);
    board.appendChild(foodElement);
  }
}

// Generate food
function generateFood() {
  const x = Math.floor(Math.random() * gridSize) + 1;
  const y = Math.floor(Math.random() * gridSize) + 1;
  return { x, y };
}

// Moving the snake
function move() {
  const head = { ...snake[0] };
  switch (direction) {
    case 'up':
      head.y--;
      break;
    case 'down':
      head.y++;
      break;
    case 'left':
      head.x--;
      break;
    case 'right':
      head.x++;
      break;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    food = generateFood();
    increaseSpeed();
    clearInterval(gameInterval); // Clear past interval
    gameInterval = setInterval(() => {
      move();
      checkCollision();
      draw();
    }, gameSpeedDelay);
  } else {
    snake.pop();
  }
}

// Start game function
function startGame() {
  gameStarted = true; // Keep track of a running game
  instructionText.style.display = 'none';
  logo.style.display = 'none';
  gameInterval = setInterval(() => {
    move();
    checkCollision();
    draw();
  }, gameSpeedDelay);
}

// Keypress event listener
function handleKeyPress(event) {
  if (
    (!gameStarted && event.code === 'Space') ||
    (!gameStarted && event.key === ' ')
  ) {
    startGame();
  } else {
    if(event.code == "ArrowUp" && direction != 'down') {
      direction = 'up';
    }
    if(event.code == "ArrowDown" && direction != 'up') {
      direction = 'down';
    }
    if(event.code == "ArrowLeft" && direction != 'right') {
      direction = 'left';
    }
    if(event.code == "ArrowRight" && direction != 'left') {
      direction = 'right';
    }
  }
}

document.addEventListener('keydown', handleKeyPress);

function increaseSpeed() {
  if (gameSpeedDelay > 150) {
    gameSpeedDelay -= 5;
  } else if (gameSpeedDelay > 100) {
    gameSpeedDelay -= 3;
  } else if (gameSpeedDelay > 50) {
    gameSpeedDelay -= 2;
  } else if (gameSpeedDelay > 25) {
    gameSpeedDelay -= 1;
  }
}

function checkCollision() {
  const head = snake[0];

  if (head.x < 1) {
    head.x = gridSize;
  } 
  if( head.x > gridSize) {
    head.x=0;
  }
  if(head.y < 1){
    head.y = gridSize;
  }
  if(head.y > gridSize){
    head.y = 0;
  } 
  

  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      resetGame();
    }
  }
}


function resetGame() {
  updateHighScore();
  stopGame();
  snake = [{ x: 10, y: 10 }];
  food = generateFood();
  direction = 'right';
  gameSpeedDelay = 200;
  updateScore();
}

function updateScore() {
  const currentScore = snake.length - 1;
  score.textContent = currentScore.toString().padStart(3, '0');
}

function stopGame() {
  clearInterval(gameInterval);
  gameStarted = false;
  instructionText.style.display = 'block';
  logo.style.display = 'block';
}

function updateHighScore() {
  const currentScore = snake.length - 1;
  if (currentScore > highScore) {
    highScore = currentScore;
    highScoreText.textContent = highScore.toString().padStart(3, '0');
  }
  highScoreText.style.display = 'block';
}












// var blockSize = 25;
// var row = 20;
// var col = 20;
// var board;
// var context;

// var snakeX = blockSize*5;
// var snakeY = blockSize*5;

// var snakeBody = [];

// var velocityX = 0;
// var velocityY = 0;

// var foodX;
// var foodY;

// var gameOver = false;

// window.onload = function() {
//     board = document.getElementById("board");
//     board.height = row * blockSize;
//     board.width = col * blockSize;
//     context = board.getContext("2d");

//     placefood();

//     document.addEventListener("keyup", changeDirection);

//     setInterval(update, 1000/10);
// }

// function update() {
//     if(gameOver) {
//         return;
//     }
//     context.fillStyle = "black";
//     context.fillRect( 0, 0, board.width, board.height);

//     context.fillStyle = "red";
//     context.fillRect(foodX, foodY, blockSize, blockSize);

//     if(snakeX == foodX && snakeY == foodY) {
//         snakeBody.push([foodX,foodY]);
//         placefood();
//     }

//     for(let i=snakeBody.length-1; i>0; i--) {
//         snakeBody[i] = snakeBody[i-1];
//     }

//     if(snakeBody.length) {
//         snakeBody[0] = [snakeX,snakeY];
//     }

//     context.fillStyle = "lime";
//     snakeX += velocityX * blockSize;
//     snakeY += velocityY * blockSize;
//     context.fillRect(snakeX, snakeY, blockSize, blockSize);

//     for(let i=0; i<snakeBody.length; i++) {
//         context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
//     }

//     if(snakeX < 0 || snakeX > col*blockSize || snakeY < 0 || snakeY > row*blockSize) {
//         gameOver = true;
//         alert("Game Over");
//     }

//     for(let i=0; i<snakeBody.length; i++) {
//         if( snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
//             gameOver = true;
//             alert("Game Over");
//         }
//     }
    
// }

// function changeDirection(e) {
//     if( e.code == "ArrowUp" && velocityY != 1) {
//         velocityX = 0;
//         velocityY = -1;
//     }
//     else if( e.code == "ArrowDown" && velocityY != -1) {
//         velocityX = 0;
//         velocityY = 1;
//     }
//     if( e.code == "ArrowRight" && velocityX != -1) {
//         velocityX = 1;
//         velocityY = 0;
//     }
//     if( e.code == "ArrowLeft" && velocityX != 1) {
//         velocityX = -1;
//         velocityY = 0;
//     }
// }

// function placefood() {
//     foodX = Math.floor(Math.random() * col) * blockSize;
//     foodY = Math.floor(Math.random() * row) * blockSize;
// }


