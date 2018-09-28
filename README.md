**INTRODUCTION**
--------------------

### **Ping-Pong-Game**

A 2D simulator game which is made for all ages. This game is made by HTML, HTML Canvase, Javascript, Jquery and CSS.

https://github.com/tinla94/Ping-Pong-Game


**FEATURE**
-----------

1. Using HTML Canvas to make game smooth.

2. Using JS and Jquery to make an AI paddle moving on its own.

3. Using keyCode to control your paddle up and down.

4. Making ball bouncing around the canvas area. 


**INSTALLATION**
-----------------

+ Using Jquery:
    1. Go to Jquery website, copy link https://code.jquery.com/jquery-3.3.1.min.js.
    2. In html, you type  <script src=<jquerylink> charset="utf-8"></script>. 
    3. Go to your JS file and console.log($) to check if Jquery is connected.

+ Using Google Fonts:
    1. Go to fonts.google.com
    2. Choose the fonts you like, and copy its link
    3. Put the link in "href" ->     <link href="<GoogleFontsLink>" rel="stylesheet">
    
+ Using w3school icons:
    1. Go to W3Schools, and seach for icon you like
    2. Copy and paste this link     <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"> in to your head of html
    3. You can use google fonts by adding it to font-family in CSS.
    
    
    **GAME CODE**
    --------------------
    
### **1. Use "Start Game" to trigger the game once user CLICKED it**

```
const button = $('#startButton');
button.on('click', () => {
gameStart();
button.hide();
});
```

### **2 .Game Start**


```
const gameStart = () => {
console.log('Game is started');

canvas = document.getElementById('gameArea');
canvasContext = gameArea.getContext('2d'); 

intervalFunction();
}
```
    
2a. Use CanvasRenderingContext2D interface for your canvas by using getContext('2d')
--> getContext('2D') is used for drawing rectangles, text, images and other objects onto the canvas.

2b. Pass in function **intervalFunction()** to create all objects of canvas.


### **3. IntervalFunction**


```
function intervalFunction() {
interval = setInterval( () => {
gamePlay();
ballMovement(); 
ballReset(); 
//update score for both side
pScore.text(playerScore);
cScore.text(cpuScore);
if(cpuScore == 5) {
modal.show(); // show modal
winnerText.text('You Lost');
gameEnd();
}
if(playerScore == 5) {
modal.show(); // show modal
winnerText.text('You Win');
gameEnd();
}
}, 25);
}
});
```

3a. Using setInterval() to set your ball and other objects speed.

3b. Pass in into gamePlay() function 

        1. Create canvas area
        ```
        canvasContext.fillStyle = 'black'; // background
        canvasContext.fillRect(0,0, canvas.width, canvas.height); // x,y,width,height;
        ```

        2. Draw a mid line in canvas to separate two sides -> middleLine()
        ```
        const middleLine = () => {
        canvasContext.beginPath();
        canvasContext.strokeStyle='white';
        canvasContext.lineWidth = 2;
        canvasContext.setLineDash([10, 10]);
        canvasContext.moveTo(canvas.width/2, 0);
        canvasContext.lineTo(canvas.width/2,600);
        canvasContext.stroke();
        }
        ```
        
        3. Create ball for game
        ```
        ball(x ,y , 10, 0, 2 * Math.PI);
        ```
        
        4. Create 2 paddles using createRect() function 
        ```
        // create player
        createRect(0, playerY, width, height);
        // create cpuPlayer
        createRect(canvas.width - 10, cpuPlayerY, width, height);
        ```
        

## Complete Code
    ```
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
    }
    ```


**SUPPORT**
----------------

1. You can contact me at tinla14@gmail.com for any issues.
2. Create new issue at "Issue" tag above.


    
