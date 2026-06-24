const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('high-score');
const startScreen = document.getElementById('start-screen');
const gameOverScreen = document.getElementById('game-over');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');

// Game variables
const gridSize = 20;
const tileCount = canvas.width / gridSize;
let snake = [];
let snakeLength = 3;
let dx = 0;
let dy = 0;
let appleX = 15;
let appleY = 15;
let score = 0;
let highScore = localStorage.getItem('snakeHighScore') || 0;
let gameInterval;
let gameSpeed = 100;
let isPlaying = false;
let changingDirection = false;

highScoreElement.innerText = highScore;

// Initialize game
function initGame() {
    snake = [];
    for (let i = 0; i < snakeLength; i++) {
        snake.push({ x: 10 - i, y: 10 });
    }
    dx = 1;
    dy = 0;
    score = 0;
    scoreElement.innerText = score;
    gameSpeed = 120;
    spawnApple();
    isPlaying = true;
    startScreen.classList.add('hidden');
    gameOverScreen.classList.add('hidden');
    
    if (gameInterval) clearInterval(gameInterval);
    gameInterval = setInterval(gameLoop, gameSpeed);
}

// Main game loop
function gameLoop() {
    changingDirection = false;
    clearCanvas();
    drawApple();
    moveSnake();
    drawSnake();
    checkCollision();
}

// Clear canvas
function clearCanvas() {
    ctx.fillStyle = '#0f3460';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Draw snake
function drawSnake() {
    snake.forEach((part, index) => {
        // Head is a different color
        ctx.fillStyle = index === 0 ? '#4ade80' : '#22c55e';
        ctx.strokeStyle = '#0f3460';
        
        ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize, gridSize);
        ctx.strokeRect(part.x * gridSize, part.y * gridSize, gridSize, gridSize);
    });
}

// Move snake
function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    // Check if apple eaten
    if (head.x === appleX && head.y === appleY) {
        score += 10;
        scoreElement.innerText = score;
        if (score > highScore) {
            highScore = score;
            highScoreElement.innerText = highScore;
            localStorage.setItem('snakeHighScore', highScore);
        }
        // Increase speed slightly
        if (gameSpeed > 50) {
            gameSpeed -= 2;
            clearInterval(gameInterval);
            gameInterval = setInterval(gameLoop, gameSpeed);
        }
        spawnApple();
    } else {
        snake.pop();
    }
}

// Spawn apple
function spawnApple() {
    appleX = Math.floor(Math.random() * tileCount);
    appleY = Math.floor(Math.random() * tileCount);

    // Prevent apple from spawning on the snake
    snake.forEach(function has_snake_eaten_apple(part) {
        if (part.x === appleX && part.y === appleY) spawnApple();
    });
}

// Draw apple
function drawApple() {
    ctx.fillStyle = '#e94560';
    ctx.beginPath();
    const centerX = appleX * gridSize + gridSize / 2;
    const centerY = appleY * gridSize + gridSize / 2;
    const radius = gridSize / 2 - 2;
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fill();
}

// Check collisions
function checkCollision() {
    const head = snake[0];

    // Wall collision
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        gameOver();
    }

    // Self collision
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver();
        }
    }
}

// Game over
function gameOver() {
    isPlaying = false;
    clearInterval(gameInterval);
    gameOverScreen.classList.remove('hidden');
}

// Keyboard Controls
document.addEventListener('keydown', changeDirection);

function changeDirection(event) {
    if (changingDirection || !isPlaying) return;
    
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    const W_KEY = 87;
    const A_KEY = 65;
    const S_KEY = 83;
    const D_KEY = 68;

    const keyPressed = event.keyCode;
    const goingUp = dy === -1;
    const goingDown = dy === 1;
    const goingRight = dx === 1;
    const goingLeft = dx === -1;

    if ((keyPressed === LEFT_KEY || keyPressed === A_KEY) && !goingRight) {
        dx = -1;
        dy = 0;
        changingDirection = true;
    }
    if ((keyPressed === UP_KEY || keyPressed === W_KEY) && !goingDown) {
        dx = 0;
        dy = -1;
        changingDirection = true;
    }
    if ((keyPressed === RIGHT_KEY || keyPressed === D_KEY) && !goingLeft) {
        dx = 1;
        dy = 0;
        changingDirection = true;
    }
    if ((keyPressed === DOWN_KEY || keyPressed === S_KEY) && !goingUp) {
        dx = 0;
        dy = 1;
        changingDirection = true;
    }
}

// Mobile / Virtual D-Pad Controls
function triggerDirection(newDx, newDy) {
    if (changingDirection || !isPlaying) return;
    const goingUp = dy === -1;
    const goingDown = dy === 1;
    const goingRight = dx === 1;
    const goingLeft = dx === -1;

    if (newDx === -1 && !goingRight) { dx = -1; dy = 0; changingDirection = true; }
    if (newDx === 1 && !goingLeft) { dx = 1; dy = 0; changingDirection = true; }
    if (newDy === -1 && !goingDown) { dx = 0; dy = -1; changingDirection = true; }
    if (newDy === 1 && !goingUp) { dx = 0; dy = 1; changingDirection = true; }
}

document.getElementById('btn-up').addEventListener('click', () => triggerDirection(0, -1));
document.getElementById('btn-down').addEventListener('click', () => triggerDirection(0, 1));
document.getElementById('btn-left').addEventListener('click', () => triggerDirection(-1, 0));
document.getElementById('btn-right').addEventListener('click', () => triggerDirection(1, 0));

// Button Events
startBtn.addEventListener('click', initGame);
restartBtn.addEventListener('click', initGame);

// Initial draw
clearCanvas();
