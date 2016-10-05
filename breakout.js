/*jslint browser: true*/

var gameIntialize = function () {

    "use strict";
    var canvas = document.getElementById("canvas-box"),
        ctx = canvas.getContext("2d"),
        x = canvas.width / 2,
        y = canvas.height - 10,
        dx = 2,
        dy = -2,
        ballRadius = 10,
        paddleHeight = 10,
        paddleWidth = 75,
        paddleX = (canvas.width - paddleWidth) / 2,
        rightArrowPressed = false,
        leftArrowPressed = false;

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
        ctx.rect(paddleX, canvas.height - paddleHeight - 20, paddleWidth, paddleHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }

    function moveBallAndPaddle() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBall();
        drawPaddle();
        if ((x + dx > canvas.width - ballRadius) || (x + dx < ballRadius)) {
            dx = -dx;
        }

        if ((y + dy > canvas.height - ballRadius) || (y + dy < ballRadius)) {
            dy = -dy;
        }

        if (rightArrowPressed && paddleX < canvas.width - paddleWidth) {
            paddleX += 7;
        } else if (leftArrowPressed && paddleX > 0) {
            paddleX -= 7;
        }
        x += dx;
        y += dy;
    }
    setInterval(moveBallAndPaddle, 5);
};
