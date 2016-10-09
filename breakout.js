/*jslint browser: true*/

var gameIntialize = function () {

    "use strict";
    var canvas = document.getElementById("canvas-box"),
        ctx = canvas.getContext("2d"),
        ballX = canvas.width / 2,
        ballY = canvas.height / 2,
        dx = 2,
        dy = -2,
        ballRadius = 10,
        paddleHeight = 10,
        paddleWidth = 75,
        paddleX = (canvas.width - paddleWidth) / 2,
        paddleY = canvas.height - paddleHeight - 15,
        rightArrowPressed = false,
        leftArrowPressed = false,
        spaceKeyPressed = false,
        brickRowCount = 5,
        brickColumnCount = 7,
        brickWidth = 50,
        brickHeight = 15,
        brickPadding = 10,
        brickOffsetTop = 30,
        brickOffsetLeft = 30;

    localStorage.setItem('alerted','no');

    var bricks = [];
    for(var ii = 0; ii < brickRowCount; ii++) {
        bricks[ii] = [];
        for(var jj = 0; jj < brickColumnCount ; jj++) {
            bricks[ii][jj] = {
                x: 0,
                y: 0,
                hit: false,
            };
        }
    }

    function keyDownHandler(e) {
        if (e.keyCode === 39) {
            rightArrowPressed = true;
        } else if (e.keyCode === 37) {
            leftArrowPressed = true;
        } else if (e.keyCode === 32) {
            spaceKeyPressed = true;
        }
    }
    function keyUpHandler(e) {
        if (e.keyCode === 39) {
            rightArrowPressed = false;
        } else if (e.keyCode === 37) {
            leftArrowPressed = false;
        }
    }
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);

    function drawBall() {
        ctx.beginPath();
        ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = "#000000";
        ctx.fill();
        ctx.closePath();
    }

    function drawPaddle() {
        ctx.beginPath();
        ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
        ctx.fillStyle = "#551A8B";
        ctx.fill();
        ctx.closePath();
    }

    function drawBricks() {
        for(var ii = 0; ii < brickRowCount; ii++) {
            var brickY = (ii *(brickHeight + brickPadding)) + brickOffsetTop;
            for(var jj = 0; jj < brickColumnCount  ; jj++) {
                var brick = bricks[ii][jj];
                if(!brick.hit){
                    brick.y = brickY;
                    var brickX = (jj * (brickWidth + brickPadding)) + brickOffsetLeft;
                    brick.x = brickX;
                    ctx.beginPath();
                    ctx.rect(brickX, brickY, brickWidth, brickHeight);
                    ctx.fillStyle = brickColor(ii);
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
    }

    function collisionDetection() {
        for(var ii = 0; ii < brickRowCount; ii++) {
            for(var jj = 0; jj < brickColumnCount  ; jj++) {
                var brick = bricks[ii][jj];
                if(!brick.hit) {
                    if(ballX > brick.x && ballX < brick.x + brickWidth && ballY > brick.y && ballY < brick.y + brickHeight) {
                        dy = -dy;
                        brick.hit = true;
                    }
                }
            }
        }
    }

    function moveBallAndPaddle() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBricks();
        drawBall();
        drawPaddle();
        collisionDetection();
        if(ballX + dx > canvas.width-ballRadius || ballX + dx < ballRadius) {
            dx = -dx;
        }
        if(ballY + dy < ballRadius) {
            dy = -dy;
        }
        else if(ballY + dy >= paddleY) {
            if(ballX > paddleX && ballX < paddleX + paddleWidth ) {
                dy = -dy;
            }
            else {
                gameOver();
            }
        }

        if(spaceKeyPressed){
            if(rightArrowPressed && paddleX < canvas.width - paddleWidth) {
                paddleX += 7;
            }
            else if(leftArrowPressed && paddleX > 0) {
                paddleX -= 7;
            }
            ballX += dx;
            ballY += dy;
        }

    }

    setInterval(moveBallAndPaddle, 8);
};

var brickColor = function(rowNumber){
    var color = "red";
    switch (rowNumber) {
        case 0:
            color = "red";
            break;
        case 1:
            color = "orange";
            break;
        case 2:
            color = "yellow";
            break;
        case 3:
            color = "green";
            break;
        default:
            color = "cyan";
    }
    return color;
};

var gameOver = function(){
    var alerted = localStorage.getItem('alerted');
    if (alerted != 'yes') {
        alert("Game Over");
        localStorage.setItem('alerted','yes');
    }
    document.location.reload();
};
