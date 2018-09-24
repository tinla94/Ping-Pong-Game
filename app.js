// grab elements
let canvas;
let canvasContext;

// create coordinator for ball movements
let x = 250;
let y = 250;
let speedX = 10;
let speedY = 4;

// width and height for panels
const width =  10;
const height = 100;

// create coordinatorY for player
let player;
let playerY = 250;

// create coordinatorY for cpu
let cpuPlayerY = 250;

// up/down press
let upPressed = false;
let downPressed = false;



// load window.onload
// once the window is loaded all the functions will be load immediately
window.onload = function() {
  // create canvas -> gameArea
  canvas = document.getElementById('gameArea'); // get element canvas in html
  canvasContext = gameArea.getContext('2d'); // create your game in 2d simulator

  // use setInterval for ball bouncing
  setInterval(() => {
    //create ball()
    gameStart();
    // bounce
    ballMovement();
  },25);

  // addEvent listener keydown
  document.addEventListener('keydown', keyDownHandler, false);
  // add event listner keyup
  document.addEventListener('keyup', keyUpHandler, false);

} // window.load()


// create ball
function gameStart() {
  canvasContext.fillStyle = 'black'; // background
  // fillRect(x , y , width, height);
  canvasContext.fillRect(0,0, canvas.width, canvas.height); // game width and height

  // ball
  ball(x ,y , 10, 0, 2 * Math.PI);
  // player
  player = createRect(15, playerY, width, height);
  //create cpuPlayer
  createRect(785, cpuPlayerY, width, height);
}


// creating rect
  function createRect(rectX, rectY, rectWidth, rectTop) {
    canvasContext.fillStyle = 'white';
    canvasContext.fillRect(rectX, rectY, rectWidth, rectTop);
  }

//  create a function for ball
function ball(ballX, ballY, r, rAngle, sAngle) {
  // use arc() to create circle
  // arc(x, y, r, sAngle, eAngle,)
  canvasContext.fillStyle = 'white';
  canvasContext.beginPath();
  canvasContext.arc(ballX, ballY, r, rAngle, sAngle);
  canvasContext.fill();
}


// make the ball move around and bounce back
function ballMovement() {
  x += speedX;
  y += speedY;
  // bounce to left
  if (x > canvas.width) {
    speedX -= 5;
  }
  // bounce to right
  if (x < 0) {
    if(y > playerY && y < playerY + height){
      speedX += 5;
    }else {
      gameReset();
    }
  }
  if(y < 0) {
    speedY += 5;
  }
  if(y > canvas.height) {
    speedY -= 5;
  }
}

// keyDownHandler
function keyDownHandler(e) {
  if(e.keyCode == 38) {
      playerY -= 15;
      upPressed = true;
  }
  else if (e.keyCode == 40) {
    playerY += 15;
    downPressed = true;
  }
}

// keyUpHandler
function keyUpHandler(e) {
  if(e.keyCode == 38) {
    upPressed = false;
  }
  else if (e.keyCode == 40) {
    downPressed = false;
  }
}

// create a function to reset the game
function gameReset() {
  x = canvas.width / 2;
  y = canvas.height / 2;
}
