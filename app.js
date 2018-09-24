// grab elements
let canvas;
let canvasContext;
// create coordinator for movements
let x = 50;
let y = 50;

// width and height for panels
let width =  10;
let height = 100;

// createMath random
const mathRandom = Math.floor((Math.random() * 10) + 1);

// load window.onload
// once the window is loaded all the functions will be load immediately
window.onload = function() {


  // create canvas -> gameArea
  canvas = document.getElementById('gameArea'); // get element canvas in html
  canvasContext = gameArea.getContext('2d'); // create your game in 2d simulator
  // gameArea
  creatingGameArea();
  // use setInterval for ball movements
  setInterval(ball, 38);
  // player and cpu
  player();
  cpuPlayer();

}


// create gameArea
function creatingGameArea() {
  canvasContext.fillStyle = 'black'; // background
  // fillRect(x , y , width, height);
  canvasContext.fillRect(0,0, canvas.width, canvas.height); // create gameArea  with canvas width and height;
}


// create player
function player() {
  // Set up coordinator for Player
  let x = 30;
  let y = canvas.height/2;
  // Player
  canvasContext.fillStyle = 'white';
  canvasContext.fillRect(x, y, width, height);
}


// create cpuPlayer
function cpuPlayer() {
  // set up coordinator for cpuPlayer
  let x =

  // CPU
  canvasContext.fillStyle = 'white';
  canvasContext.fillRect(770, canvas.height/2, width, height);
}


// create ball
function ball() {
  // movement
  x += mathRandom;
  y += mathRandom;

  // use arc() to create circle
  // arc(x, y, r, sAngle, eAngle,)
  canvasContext.arc(x, y, 5, 0, 2 * Math.PI, false);
  canvasContext.fillStyle = 'white';
  canvasContext.fill();
  this.gravitySpeed = 0;
  this.counce = 0.6;
}
