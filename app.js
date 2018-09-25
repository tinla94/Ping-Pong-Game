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
let playerY = 250;

// create coordinatorY for cpu
let cpuPlayerY = 250;

// up/down press
let upPressed = false;
let downPressed = false;



// load window.onload
// once the window is loaded all the functions will be load immediately
$( () => {

  // grab your button
  const button = $('#startButton');
  button.click( () => {
    console.log('Button is clicked');
    // create canvas -> gameArea
    canvas = document.getElementById('gameArea'); // get element canvas in html
    canvasContext = gameArea.getContext('2d'); // create your game in 2d simulator
    // draw line
    middleLine();

    // after button is clicked
    button.hide();
    // use setInterval for ball bouncing
    setInterval(() => {
      //create ball()
      gameStart();
      // bounce
      ballMovement();
    }, 30);
    // addEvent listener keydown
    document.addEventListener('keydown', keyDownHandler, false);
    // add event listner keyup
    document.addEventListener('keyup', keyUpHandler, false);
  }); // button click
}); // window.load()


// create ball
function gameStart() {
  canvasContext.fillStyle = 'black'; // background
  // fillRect(x , y , width, height);
  canvasContext.fillRect(0,0, canvas.width, canvas.height); // game width and height

  // ball
  ball(x ,y , 10, 0, 2 * Math.PI);
  // player
  createRect(0, playerY, width, height);
  //create cpuPlayer
  createRect(canvas.width - 10, cpuPlayerY, width, height);
}


// creating rect
  function createRect(rectX, rectY, rectWidth, rectTop) {
    // create rect
    canvasContext.fillStyle = 'white';
    canvasContext.fillRect(rectX, rectY, rectWidth, rectTop);
  }

//  create a function for ball
function ball(ballX, ballY, r, rAngle, sAngle) {
  var grd = canvasContext.createLinearGradient(0, 0, 170, 0);
  grd.addColorStop(0, "orange");
  grd.addColorStop(0.25, "yellow");
  grd.addColorStop(0.5, "red");
  grd.addColorStop(1, "white");
  // use arc() to create circle
  // arc(x, y, r, sAngle, eAngle,)
  canvasContext.fillStyle = grd;
  canvasContext.beginPath();
  canvasContext.arc(ballX, ballY, r, rAngle, sAngle);
  canvasContext.fill();
}


// make the ball move around and bounce back
const ballMovement = () => {
  // cpu movement
  cpuPlayerMovement();

  x += speedX;
  y += speedY;
  // bounce to left
  if (x > canvas.width) {
    if(y > cpuPlayerY && y < cpuPlayerY + height) {
      speedX = -speedX;

      var deltaY = y - (cpuPlayerY + height/2);
      speedY = deltaY * 0.35;
    }
    else {
      gameReset();
    }
}
  // ball will bounce if it hits the panels
  if (x < 0) {
    if(y > playerY && y < playerY + height){
      speedX = -speedX;
      // make the ball move faster after hitting panel
      var deltaY = y - (playerY + height/2);
      speedY = deltaY * 0.35;
    }else {
      gameReset();
    }
  }
  // ball bounce to top/bottom of the walls
  if(y < 0) {
    speedY += 5;
  }
  if(y > canvas.height) {
    speedY -= 5;
  }
}

// create a movement for cpu player
const cpuPlayerMovement = () => {
  // if y of ball is below the panel 2 -> ball bounce back
    if(cpuPlayerY + (height / 2) < y - 35) {
      cpuPlayerY += 20;
    }
    else if(cpuPlayerY + (height / 2) > y + 35) { // if y of ball is above panel 2 -> ball bounce up
      cpuPlayerY -= 20;
    }
}

// keyDownHandler
const keyDownHandler = (e) => {
  if(e.keyCode == 38 && playerY > 0) {
    playerY -= 20;
    upPressed = true;
  }
  else if (e.keyCode == 40 && playerY + 95<canvas.height) {
    playerY += 20;
    downPressed = true;
  }
}

// keyUpHandler
const keyUpHandler= (e) =>{
  if(e.keyCode == 38) {
    upPressed = false;
  }
  else if (e.keyCode == 40) {
    downPressed = false;
  }
}


// create a function to reset the game
const gameReset = () => {
  speedX = -speedX; // make ball move opposite way when we reset the game
  x = 250;
  y = 250;
};



// draw a middle line
const middleLine = () => {
  canvasContext.beginPath();
  canvasContext.strokeStyle='white';
  canvasContext.lineWidth = 2;
  canvasContext.setLineDash([10, 10]);
  canvasContext.moveTo(canvas.width/2, 0);
  canvasContext.lineTo(canvas.width/2,600);
  canvasContext.stroke();
}
