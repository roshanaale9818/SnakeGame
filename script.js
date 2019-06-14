document.getElementById("btn").addEventListener("click", start);
document.getElementById("canvas").style.display = 'none';
document.getElementById("btnPlayAgain").style.display = 'none';

function start() {
    // checkCookie();

    document.getElementById("gameArena").style.display = 'none';
    document.getElementById("canvas").style.display = 'block';
    document.getElementById("btnPlayAgain").style.display = 'none';

    const cvs = document.getElementById("canvas");
    const ctx = cvs.getContext("2d");
    //creating a unit
    const box = 32;
    //unit created finished

    const ground = new Image();
    ground.src = "2.png";
    const startBtn = new Image();
    startBtn.src = "resized.png"
    const foodImg = new Image();
    foodImg.src = "food.png";
    const playnow = new Image();
    playnow.src = "playnow.png";
    const gameover = new Image();
    gameover.src = "gameover.png";
    let playAgain = new Image();
    playAgain.src = "playagain.png";
    //consoling png images 
    // console.log(foodImg);
    // console.log(ground);

    //create snake
    const eat = new Audio();
    const left = new Audio();
    const right = new Audio();
    const down = new Audio();
    const up = new Audio();
    const dead = new Audio();

    eat.src = "audio/apple.mp3";
    left.src = "audio/left.mp3";
    right.src = "audio/right.mp3";
    up.src = "audio/up.mp3";
    down.src = "audio/up.mp3";
    dead.src = "audio/dead.mp3";
    let snake = [];
    snake[0] = {
        x: 9 * box,
        y: 10 * box
    };




    let food = {
        x: Math.floor(Math.random() * 19) * box,
        y: Math.floor(Math.random() * 19) * box
    };
    //create score
    let score = 0;

    //control snake
    let d;


    document.addEventListener("keydown", direction);

    function direction(event) {
        // let key = event.keyCode;
        if (event.keyCode == 37 && d != "RIGHT") {
            d = "LEFT";
            left.play();
        } else if (event.keyCode == 38 && d != "DOWN") {
            d = "UP";
            right.play();


        } else if (event.keyCode == 39 && d != "LEFT") {
            d = "RIGHT";
            up.play();


        } else if (event.keyCode == 40 && d != "UP") {
            d = "DOWN";
            down.play();


        }
    }
    //check collision function 
    function collision(head, array) {
        for (let i = 0; i < array.length; i++) {
            console.log('collision passed')


            if (head.x == array[i].x && head.y == array[i].y) {
                return true;

            }

        }
        return false;
    }


    function playStart() {
        ctx.strokeStyle = "green";
        ctx.rect(150, 150, 60, 60);
        console.log("created Rectangle");
    }

    //draw everything inside canvas
    function draw() {
        ctx.drawImage(ground, 0, 0);

        for (let i = 0; i < snake.length; i++) {
            ctx.fillStyle = (i == 0) ? "green" : "white";
            ctx.fillRect(snake[i].x, snake[i].y, box, box);

            ctx.strokeStyle = "red";
            ctx.strokeRect(snake[i].x, snake[i].y, box, box);
            // console.log('drawnImage');
        }


        ctx.drawImage(foodImg, food.x, food.y);




        //check old head
        let snakeX = snake[0].x;
        let snakeY = snake[0].y;


        //which direction 
        if (d == "LEFT") snakeX -= box;
        if (d == "UP") snakeY -= box;
        if (d == "RIGHT") snakeX += box;
        if (d == "DOWN") snakeY += box;



        //if the snake eats food
        if (snakeX == food.x && snakeY == food.y) {
            score++;
            eat.play();
            food = {
                x: Math.floor(Math.random() * 19) * box,
                y: Math.floor(Math.random() * 19) * box
            }

        } else {
            snake.pop();
        }

        let newHead = {
            x: snakeX,
            y: snakeY
        }
        if (snakeX < 0 || snakeX > 18 * box || snakeY < 0 || snakeY > 18 * box || collision(newHead, snake)) {
            clearInterval(game);
            dead.play();
            ctx.drawImage(gameover, 200, 200, 200, 200);
            document.getElementById("btnPlayAgain").style.display = 'block';
            // console.log(this.user + "your score" + ":" + score);
        }

        snake.unshift(newHead);




        // create score board
        ctx.fillStyle = "red";
        ctx.font = "45px Sans serif";
        ctx.fillText(score, 16 * box, 1.6 * box);


    }

    let game = setInterval(draw, 350);
}

// function setCookie(cname, cvalue, exdays) {
//     var d = new Date();
//     d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
//     var expires = "expires=" + d.toGMTString();
//     document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
// }

// function getCookie(cname) {
//     var name = cname + "=";
//     var decodedCookie = decodeURIComponent(document.cookie);
//     var ca = decodedCookie.split(';');
//     for (var i = 0; i < ca.length; i++) {
//         var c = ca[i];
//         while (c.charAt(0) == ' ') {
//             c = c.substring(1);
//         }
//         if (c.indexOf(name) == 0) {
//             return c.substring(name.length, c.length);
//         }
//     }
//     return "";
// }

// function checkCookie() {
//     this.user = getCookie("username");
//     if (user != "") {
//         alert("Welcome again " + user);
//     } else {
//         user = prompt("Please enter your name:", "");
//         if (user != "" && user != null) {
//             setCookie("username", user, 30);
//         }

//     }
// }
// let cookiePart = setInterval(checkCookie, 9000)