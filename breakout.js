/*jslint browser: true*/

var gameIntialize = function () {

    "use strict";
    var canvas = document.getElementById("canvas-box"),
        ctx = canvas.getContext("2d"),
        x = canvas.width / 2,
        y = canvas.height / 2,
        dx = 2,
        dy = -2,
        ballRadius = 10,
        paddleHeight = 10,
        paddleWidth = 75,
        paddleX = (canvas.width - paddleWidth) / 2,
        paddleY = canvas.height - paddleHeight - 15,
        rightArrowPressed = false,
        leftArrowPressed = false;

    localStorage.setItem('alerted','no');

    function keyDownHandler(e) {
        if (e.keyCode === 39) {
            rightArrowPressed = true;
        } else if (e.keyCode === 37) {
            leftArrowPressed = true;
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
        ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }

    function drawPaddle() {
        ctx.beginPath();
        ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }

    function moveBallAndPaddle() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBall();
        drawPaddle();
        if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
            dx = -dx;
        }
        if(y + dy < ballRadius) {
            dy = -(dy + 0.5);
        }
        else if(y + dy >= paddleY) {
            if(x > paddleX && x < paddleX + paddleWidth) {
                dy = -(dy + 1);
            }
            else {
                gameOver();
            }
        }

        if(rightArrowPressed && paddleX < canvas.width - paddleWidth) {
            paddleX += 7;
        }
        else if(leftArrowPressed && paddleX > 0) {
            paddleX -= 7;
        }
        x += dx;
        y += dy;
    }

    setInterval(moveBallAndPaddle, 8);
};

var gameOver = function(){
    var alerted = localStorage.getItem('alerted') || '';
    if (alerted != 'yes') {
        alert("Game Over");
        localStorage.setItem('alerted','yes');
    }
    document.location.reload();
};
