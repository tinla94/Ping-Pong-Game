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


    ``` javascript
    const button = $('#startButton');
    button.on('click', () => {
    gameStart();
    button.hide();
    });
    ```

### **2 .Game Start**


    ``` javascript
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


    ``` javascript
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
        
        ``` javascript
        canvasContext.fillStyle = 'black'; // background
        canvasContext.fillRect(0,0, canvas.width, canvas.height); // x,y,width,height;
        ```

        2. Draw a mid line in canvas to separate two sides -> middleLine()
        
        ``` javascript
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
        
        ``` javascript
        ball(x ,y , 10, 0, 2 * Math.PI);
        ```
        
        4. Create 2 paddles using createRect() function 
        
        ``` javascript
        // create player
        createRect(0, playerY, width, height);
        // create cpuPlayer
        createRect(canvas.width - 10, cpuPlayerY, width, height);
        ```
        

## Complete Code
   
    ``` javascript
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
    
    
### **4. Creating Function For Objects**

4a . Create a function to create ball (x , y, rAngle, sAngle)

        ``` javascript
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
        ```

4b. Create a function to create rectangles (x ,y , width, height)

        ``` javascript
        function createRect(rectX, rectY, rectWidth, rectTop) {
        canvasContext.fillStyle = 'white';
        canvasContext.fillRect(rectX, rectY, rectWidth, rectTop);
        }
        ```


### ***5. Creating a function to move ball around*** 

    ```javascript
    // function to bounce ball around
    const ballMovement = () => {
    // cpu movement
    cpuPlayerMovement();
    x += speedX;
    y += speedY;
    // when ball hit right wall
    if (x > 795 && (y >= 0 && y <= 600)) {
    if(y > cpuPlayerY && y < cpuPlayerY + height) {
    speedX = -speedX;
    // increasing speed when it hit paddles
    let deltaY = y - (cpuPlayerY + height/2);
    speedY = deltaY * 0.4;
    }
    else {
    ballTimer = 0;
    playerScore++;
    playerScoring = true;
    }
    }
    // when ball hit left wall
    if (x < 5 && (y >= 0 && y <= 600)) {
    if(y > playerY && y < playerY + height){
    speedX = -speedX;
    // make the ball move faster after hitting panel
    var deltaY = y - (playerY + height/2);
    speedY = deltaY * 0.4;
    }
    else {
    ballTimer = 0;
    cpuScore++;
    cpuScoring = true;
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
    ```
    

### ***6. Creating a function for AI Paddle*** 

    ``` javascript
    // make AI for cpu Player
    const cpuPlayerMovement = () => {
    if(cpuPlayerY + (height / 2) < y - 35) {
    cpuPlayerY += 20; // move up
    }
    else if(cpuPlayerY + (height / 2) > y + 35) {
    cpuPlayerY -= 20; // move down
    }
    } // cpuPlayerMovement
    ```
    

### ***7. Creating a function to move player paddles up/down*** 

7a. Create a function when you press your key up

    ``` javascript
    // keyDownHandler
    const keyDownHandler = (e) => {
    if(e.keyCode == 38 && playerY > 0) {
    playerY -= 35;
    upPressed = true;
    }
    else if (e.keyCode == 40 && playerY + 95 < canvas.height) {
    playerY += 35;
    downPressed = true;
    }
    } // keyDownHandler()
    ```
    
7b. Create a function when  you press your key down

    ``` javascript
    // keyUpHandler
    const keyUpHandler= (e) =>{
    if(e.keyCode == 38) {
    upPressed = false;
    }
    else if (e.keyCode == 40) {
    downPressed = false;
    }
    }
    ```
    
7c. Trigger your keys in window.onload()

    ``` javascript
    document.addEventListener('keydown', keyDownHandler, false); // keyDownHandler
    document.addEventListener('keyup', keyUpHandler, false); // keyUpHandler
    ```








**SUPPORT**
----------------

1. You can contact me at tinla14@gmail.com for any issues.
2. Create new issue at "Issue" tag above.


    
