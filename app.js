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
// coordinatorY for player & coordinatorY for cpu
let cpuPlayerY = 250;
let playerY = 250;
// up/down press
let upPressed = false;
let downPressed = false;
// set up timer for ball
let ballTimer = -1;
let maxTimer = 20;
// playerScore and cpuScore
let playerScore = 0;
let cpuScore = 0;

// set interval
let interval;

// load window.onload
// once the window is loaded all the functions will be load immediately
$( () => {
  // grab player score and cpu score
  let pScore = $('#playerScore');
  let cScore = $('#cpuScore');
  // grab your Modal
  let modal = $('#modal');
  modal.hide();
  // start Button function
  const button = $('#startButton');
  button.on('click', () => {
    gameStart();
    button.hide();
  });
  // play again button
  const playAgainButton = $('#playAgainButton');
  playAgainButton.on('click', () => {
    modal.css('display', 'none');
    gameRestart();
  });
  // event lisnter
    document.addEventListener('keydown', keyDownHandler, false); // keyDownHandler
    document.addEventListener('keyup', keyUpHandler, false); // keyUpHandler


    // game start
    const gameStart = () => {
      // log
      console.log('Game is started');
      // Canvas Game Area
      canvas = document.getElementById('gameArea');
      canvasContext = gameArea.getContext('2d'); // create your game in 2d simulator
      // intervalOn
      intervalFunction();
    }

    function intervalFunction() {
      interval = setInterval( () => {
        gamePlay(); // game start
        ballMovement(); // make ball bounce
        ballReset(); // ball timer
        //update score for both side
        pScore.text(playerScore);
        cScore.text(cpuScore);
        if(cpuScore == 5) {
          modal.show(); // show modal
          gameEnd();
        }
        if(playerScore == 5) {
          modal.show(); // show modal
          gameEnd();
        }
      }, 25);
    }

}); // window.load()




// game play
function gamePlay() {
  canvasContext.fillStyle = 'black'; // background
  canvasContext.fillRect(0,0, canvas.width, canvas.height); // x,y,width,height;
  middleLine(); // draw a line
  // create ball
  ball(x ,y , 10, 0, 2 * Math.PI);
  // create player
  createRect(0, playerY, width, height);
  // create cpuPlayer
  createRect(canvas.width - 10, cpuPlayerY, width, height);
} // gamePlay()


// creating rect
  function createRect(rectX, rectY, rectWidth, rectTop) {
    canvasContext.fillStyle = 'white';
    canvasContext.fillRect(rectX, rectY, rectWidth, rectTop);
  }


//  create ball
function ball(ballX, ballY, r, rAngle, sAngle) {
  // color for ball
  var grd = canvasContext.createLinearGradient(0, 0, 170, 0);
  grd.addColorStop(0, "orange");
  grd.addColorStop(0.33, "yellow");
  grd.addColorStop(0.66, "red");
  grd.addColorStop(1, "white");
  // create ball
  canvasContext.fillStyle = grd;
  canvasContext.beginPath();
  canvasContext.arc(ballX, ballY, r, rAngle, sAngle); // arc(x, y, r, sAngle, eAngle,)
  canvasContext.fill();
}


// function to bounce ball around
const ballMovement = () => {
  // cpu movement
  cpuPlayerMovement();
  x += speedX;
  y += speedY;
  // when ball hit right wall
  if (x > 790) {
    if(y > cpuPlayerY && y < cpuPlayerY + height) {
      speedX = -speedX;
      // increasing speed when it hit paddles
      let deltaY = y - (cpuPlayerY + height/2);
      speedY = deltaY * 0.35;
    }
    else {
      ballTimer = 0;
      playerScore++;
    }
  }
  // when ball hit left wall
  if (x < 10) {
    if(y > playerY && y < playerY + height){
      speedX = -speedX;
      // make the ball move faster after hitting panel
      var deltaY = y - (playerY + height/2);
      speedY = deltaY * 0.35;
    }
    else {
      ballTimer = 0;
      cpuScore++;
    }
  }
  // ball bounce to top/bottom of the walls
  if(y < 0) {
    speedY += 5;
  }
  if(y > canvas.height) {
    speedY -= 5;
  }
} // ballMovement()



// make AI for cpu Player
const cpuPlayerMovement = () => {
  if(cpuPlayerY + (height / 2) < y - 35) {
    cpuPlayerY += 15; // move up
  }
  else if(cpuPlayerY + (height / 2) > y + 35) {
    cpuPlayerY -= 15; // move down
  }
} // cpuPlayerMovement


// keyDownHandler
const keyDownHandler = (e) => {
  if(e.keyCode == 38 && playerY > 0) {
    playerY -= 32;
    upPressed = true;
  }
  else if (e.keyCode == 40 && playerY + 95<canvas.height) {
    playerY += 32;
    downPressed = true;
  }
} // keyDownHandler()

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
    x = canvas.width / 2;
    y = canvas.height / 2;
    speedX = 0;
    speedY = 0;
    ballTimer++;
};

const gameEnd = () => {
  x = canvas.width / 2;
  y = canvas.height / 2;
  speedX = 0;
  speedY = 0;
  ballTimer = -1;
  cpuScore = 0;
  playerScore = 0;
}

const gameRestart = () => {
  ballTimer = 0;
}

//  ball reset timer
const ballReset = () => {
    // ballTimer > 0 -> increase time
    if(ballTimer >= 0){
      gameReset();
    }
    if(ballTimer > maxTimer){
      ballTimer = -1;
      speedY = 4;
      speedX = 10;
    }
}


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
