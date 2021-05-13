const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

//здесь создаем переменные(разметка, игрок, другие машины, монетки, жизни, очки)

let lineOne = new Image();
lineOne.src = "line.png";
lineOne.X = 285;
lineOne.Y = -150;

let lineTwo = new Image();
lineTwo.src = "line.png";
lineTwo.X = 285;
lineTwo.Y = 210;

let lives = 3;
let bonus = 0;

/*здесь создаем функции 

вывод основного поля, 
вывод разметки,
машины игрока, 
других машин, 
отработка столкновений,
отработка сбора монет,
отсчет жизней, 
отсчет очков
*/

function drawRoad() {
    ctx.fillStyle = "#333333";
    ctx.fillRect(0, 0, 600, 550);
}

function drawRoadMarkings(){
    
    ctx.drawImage(lineOne,lineOne.X,lineOne.Y);
    lineOne.Y += 5;
    if (lineOne.Y > 550){
        lineOne.Y = -150;
    }

    ctx.drawImage(lineTwo,lineTwo.X,lineTwo.Y);
    lineTwo.Y += 5;
    if (lineTwo.Y > 550){
        lineTwo.Y = -150;
    }
}

function gameOver() {
    if (lives === 0){
    cancelAnimationFrame(GAME);
    ctx.font ="50px Arial";
    ctx.fillStyle = "#660000";
    ctx.fillText = "GAME OVER";
    }
}
//здесь создание основной функции game, в нее передаем все созданные функции, здесь происходит отрисовка игры
function game(){
    
    drawRoad();
    drawRoadMarkings();


    GAME = requestAnimationFrame(game);
}

game();
gameOver();

//здесь обработчики событий вправо-влево