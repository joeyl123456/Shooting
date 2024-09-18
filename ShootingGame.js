// Canvas
let canvas;
let ctx;

canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 700;
document.body.appendChild(canvas);

// Elements

let spaceShipWidth = 50
let spaceShipHeight =  60

let spaceShipX = canvas.width * 0.5 - spaceShipWidth/2
let spaceShipY = canvas.height - spaceShipHeight - 5

let spaceshipSpeed = 5;


// Images

let backgroundImage, spaceShipImage, bulletImage, monsterImage, gameOverImage;

function loadImage() {
  backgroundImage = new Image();
  backgroundImage.src = "images/background.png";

  spaceShipImage = new Image();
  spaceShipImage.src = "images/Spaceship.png";

  bulletImage = new Image();
  bulletImage.src = "images/Bullet.png";
}

function renderImage() {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(spaceShipImage, spaceShipX, spaceShipY, spaceShipWidth, spaceShipHeight );
}

// Keyboard

let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;
let spacePressed = false;


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


async function sleep(time) {
    await new Promise(resolve => setTimeout(resolve, time));
}

function keyDownHandler(event) {
    if (event.code === "ArrowRight") {
      rightPressed = true;
    } else if (event.code === "ArrowLeft") {
      leftPressed = true;
    } else if (event.code === "Space") {
    }
  }
  
  function keyUpHandler(event) {
    if (event.code === "ArrowRight") {
      rightPressed = false;
    } else if (event.code === "ArrowLeft") {
      leftPressed = false;
    } else if (event.code === "Space") {
      bulletLaunch();
    }
  }

// Movement



function shipMovement() {
    if (rightPressed && spaceShipX < canvas.width - spaceShipWidth) {
        spaceShipX += spaceshipSpeed;
      } else if (leftPressed && spaceShipX > 0) {
        spaceShipX -= spaceshipSpeed;
      } 
}

// Bullet

class Bullet {
    constructor(x, y, z) {
        this.X = x
        this.Y = y
        this.shoot = z
    }
}

let Bullet_save = [];

function bulletLaunch() {
        Bullet_save.push(new Bullet(spaceShipX, spaceShipY, true));
}

function bulletShoot() {
    for (let i = 0; i < Bullet_save.length; i++){
        console.log(i)
        if (Bullet_save[i].shoot) {
        ctx.drawImage(bulletImage, Bullet_save[i].X + 15 , Bullet_save[i].Y, 20, 20);
        Bullet_save[i].Y -= 2;
    }
    }
}

// Enemy

class Enemy {
    constructor(x, y, z) {
        this.X = x
        this.Y = y
        this.shoot = z
    }
}

let Enemy_save = [];

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

function spawnEnemy() {
    const interval = setInterval(function() {
        Enemy_save.push(new Enemy(getRandomInt(canvas.width - 40), 10, true));
    }, 2000)
}

let EnemyY = 10

function enemyShoot() {
    for (let i = 0; i < Enemy_save.length; i++){
        if (Enemy_save[i].shoot) {
        ctx.fillStyle = "green";
        ctx.fillRect(Enemy_save[i].X, Enemy_save[i].Y, 40, 40);
        Enemy_save[i].Y += 2;
    }
    }
}

// Game function 

function enemyHit() {
    for (let i = 0; i < Bullet_save.length; i++){
        for (let e = 0; e < Enemy_save.length; e++){
            if (Bullet_save[i].X < Enemy_save[e].X + 25  && Bullet_save[i].X + 15 > Enemy_save[e].X &&
                Bullet_save[i].Y < Enemy_save[e].Y + 40 && Bullet_save[i].shoot && Enemy_save[e].shoot ) {
                Bullet_save[i].shoot = false;
                Enemy_save[e].shoot = false;
            } else if (Bullet_save[i].Y <= 0) {
                Bullet_save[i].shoot = false;
            } else if (Enemy_save[e].Y >= canvas.height -5) {
                Enemy_save[e].shoot = false;
            }
            
    }
}}


function main() {
  renderImage();
  shipMovement();
  bulletShoot();
  enemyShoot();
  enemyHit();

  requestAnimationFrame(main);
}

spawnEnemy();
loadImage();
main();