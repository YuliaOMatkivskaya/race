const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

//здесь создаем переменные(разметка, игрок, другие машины, монетки, жизни, очки)

let lineOne = new Image();
lineOne.src = "line.png";
lineOne.X = 295;
lineOne.Y = -150;

let lineTwo = new Image();
lineTwo.src = "line.png";
lineTwo.X = 295;
lineTwo.Y = 210;

let gamer = new Image();
gamer.src = "taxi.png";
gamer.X = 200;
gamer.Y = 390;

let enemyOne = new Image();
enemyOne.src = "taxi.png";
enemyOne.X = Math.floor(Math.random()*520);
enemyOne.Y = -150;

let bonusOne = new Image();
bonusOne.src = "bonusOne.png";
bonusOne.X = Math.floor(Math.random()*520);
bonusOne.Y = -80;

let lives = 3;
let bonuses = 0;
let left;
let right;

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
    lineOne.Y += 8;
    if (lineOne.Y > 550){
        lineOne.Y = -150;
    }

    ctx.drawImage(lineTwo,lineTwo.X,lineTwo.Y);
    lineTwo.Y += 8;
    if (lineTwo.Y > 550){
        lineTwo.Y = -150;
    }
}

function drawGamer(){
    if (left === true && gamer.X > 0){gamer.X-=5}
    if (right === true && gamer.X < 520){gamer.X+=5}
    ctx.drawImage(gamer,gamer.X,gamer.Y);
}

function drawEnemyOne(){
    if(enemyOne.Y +150 > gamer.Y && enemyOne.X +80 > gamer.X &&  enemyOne.X < gamer.X+80){
        //столкновение
        lives--;
        enemyOne.Y = -150;
        enemyOne.X = Math.floor(Math.random()*520);
        gameOver();
    } else {
    ctx.drawImage(enemyOne,enemyOne.X,enemyOne.Y);
    enemyOne.Y += 5;
        if (enemyOne.Y > 550){
            enemyOne.Y = -150;
            enemyOne.X = Math.floor(Math.random()*520);
        }
    }
}

function drawLives() {
    ctx.font ="20px Arial";
    ctx.fillStyle = "#FFCC00";
    ctx.fillText("Осталось жизней: " + lives, 30, 30);
}

function drawTextBonuses() {
    ctx.font ="20px Arial";
    ctx.fillStyle = "#FFCC00";
    ctx.fillText("Бонусы: " + bonuses, 470, 30);
}

function drawBonus(){
    if(bonusOne.Y +80 > gamer.Y && bonusOne.X +80 > gamer.X &&  bonusOne.X < gamer.X+80){
        bonuses++
        bonusOne.Y = -80;
        bonusOne.X = Math.floor(Math.random()*520);
    } else {
        ctx.drawImage(bonusOne,bonusOne.X,bonusOne.Y);
        bonusOne.Y += 8;
        if (bonusOne.Y > 550){
            bonusOne.Y = -80;
            bonusOne.X = Math.floor(Math.random()*520);
        }
    }
}

function gameOver() {
    if (lives < 1){
    cancelAnimationFrame(GAME);
    ctx.font ="50px Arial";
    ctx.fillStyle = "#660000";
    ctx.fillText("GAME OVER", 150, 250);
    }
}

//здесь обработчик событий вправо-влево : нажатия и отпускания кнопок вправо-влево

addEventListener ("keydown", function(event){
    let key = event.keyCode;
    if (key===37){
        left = true;
    }
    if (key===39){
        right = true;
    }
})

addEventListener ("keyup", function(event){
    let key = event.keyCode;
    if (key===37){
        left = false;
    }
    if (key===39){
        right = false;
    }
})

//здесь создание основной функции game, в нее передаем все созданные функции, здесь происходит отрисовка игры
function game(){
    
    drawRoad();
    drawRoadMarkings();
    drawBonus();
    drawGamer();
    drawEnemyOne();
    drawLives();
    drawTextBonuses();

    GAME = requestAnimationFrame(game);
    gameOver();
}

game();
