var x = Math.floor(Math.random() * 600);
var y = Math.floor(Math.random() * 600);

var gex = 1;
var gameOver = false;
var started = false;

var gevaarX = 0;
var gevaarY = 0;
var gevaarSnelheid = 50;

var score = 0;
if (localStorage.highscore) {
  var highscore = Number(localStorage.getItem('highscore'));
} else {
  var highscore = 0
}

function setup() {
  createCanvas(650, 650).parent('game');
  frameRate(60);
}

function mouseClicked() {
  if (started == false) {
    started = true;
  } else if (gameOver == true) {
    window.location.reload(true);
  }
}

function gameover() {
  background(220);
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(200);
  text('GAME', 300, 100)
  text('OVER', 290, 250)
  textSize(50);
  text('Klik om opnieuw te beginnen', 325, 550)
  if (score > highscore) {
    highscore = score;
    text('score: '+ score, 300, 400)
    text('highscore: '+ score, 300, 450)
    localStorage.setItem('highscore', Number(highscore))
  } else {
    text('highscore: '+ highscore, 300, 450)
    text('score: '+ score, 300, 400)
  }
}

function draw() {
  background(220);
  if (started == true) {
  fill('green');
  rect(x, y, 50, 50);

  //gevaar bewegen/berekenen
  var afstandX = mouseX - 25 - gevaarX;
  var afstandY = mouseY - 25 - gevaarY;
  gevaarX = gevaarX + afstandX/gevaarSnelheid;
  gevaarY = gevaarY + afstandY/gevaarSnelheid;
  fill('red');
  rect(gevaarX, gevaarY, 50, 50);

  //collision detection voor appel
  if (x < mouseX && x + 50 > mouseX && y < mouseY && y + 50 > mouseY && gameOver == false) {
    x = Math.floor(Math.random() * 600);
    y = Math.floor(Math.random() * 600);
    score = score + 1;
    console.log(score);
    gevaarSnelheid = gevaarSnelheid - 0.5;
  }

  if (gevaarX < mouseX && gevaarX + 50 > mouseX && gevaarY < mouseY && gevaarY + 50 > mouseY && gameOver == false) {
    gameOver=true;
  }
  if (gameOver) {
    gameover();
  }
} else {
  fill('black');
  textAlign(CENTER, CENTER);
  textSize(50);
  text('Klik om te starten', 300, 300);
  textSize(50);
  text('highscore: '+ highscore, 300, 450);
}
}
