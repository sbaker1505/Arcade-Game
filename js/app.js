// Enemies our player must avoid
var Enemy = function(row) {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -CELLW;
    this.y = (CELLH * row) - (CELLH * 0.3);
    this.row = row;
    this.width = CELLW;
    this.height = CELLH;

};

// Update the enemy's position
Enemy.prototype.update = function(dt) {
    if (this.row === 1){
      this.x += dt * 300;
    } else if (this.row === 2){
      this.x += dt * 225;
    } else if (this.row === 3){
      this.x += dt * 375;
    }

    // removes enemy from allEnemies Array once enemy is off canvas
    allEnemies.forEach(function(enemy, index){
      if (enemy.x >= 505) {
        allEnemies.splice(index, 1);
      }
    })
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


const CELLW = 101;
const CELLH = 83;

// player class
class Player {
  constructor(){
    this.x = CELLW * 2;
    this.y = CELLH * 4.5;
    this.width = CELLW;
    this.height = CELLH;

    this.sprite = 'images/char-horn-girl.png';
  }

  // upon collision with a star, updates starCount, calls new star, and run gameUpdate function
  update(){
    if (this.x < star.x + (star.width * 0.5) &&
     this.x + (this.width * 0.5) > star.x &&
     this.y < star.y + (star.height * 0.5) &&
     (this.height * 0.5) + this.y > star.y) {
      // if all true, star captured!
      starCount++;
      addStar();
      gameUpdate();
    }
  }

  // draws the player on the canvas
  render(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  // moves player direction one cell based on keystroke
  handleInput(dir){
    if (dir === 'up') {
      this.y -= CELLH;
      if (this.y < 0) {
        this.y += CELLH;
      }
    } else if (dir === 'down') {
      this.y += CELLH;
      if (this.y > CELLH * 5) {
        this.y -= CELLH;
      }
    } else if (dir === 'left') {
      this.x -= CELLW;
      if (this.x < 0){
        this.x += CELLW;
      }
    } else if (dir === 'right') {
      this.x += CELLW;
      if (this.x > CELLW * 4){
        this.x -= CELLW;
      }
    }
  }
}

// star class
class Star {
  constructor(row, col){
    this.x = (CELLW * col);
    this.y = (CELLH * row) - (CELLH * 0.15);
    this.width = CELLW;
    this.height = CELLH;
    this.sprite = 'images/Star.png';
  }

  // draws the star to the canvas
  render(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

let allEnemies = [];
let player = new Player();
let star;
let starCount = 0;

// adds a new enemy to allEnemies array
function addEnemy() {
  const row = Math.floor(Math.random() * 3 + 1);
  allEnemies.push(new Enemy(row))
}

// adds a new enemy at interval
setInterval(addEnemy, 750);

// adds a new star to a ramdon row and column
function addStar(){
  const row = Math.floor(Math.random() * 3 + 1);
  const col = Math.floor(Math.random() * 5 + 0);
  star = new Star(row, col);
}

// checks for collisions of player and enemies
function checkCollisions() {
  allEnemies.forEach(function(enemy){
    if (player.x < enemy.x + (enemy.width * 0.5) &&
     player.x + (player.width * 0.5) > enemy.x &&
     player.y < enemy.y + (enemy.height * 0.5) &&
     (player.height * 0.5) + player.y > enemy.y) {
      // if all true, collision detected!
      player = new Player();
      starCount--;
      gameUpdate();
    }
  });
}

// adds html so log the star count and popup
const tagId = t => idName => data => `<${t} id="${idName}">${data}</${t}>`;
const tag = t => data => `<${t}>${data}</${t}>`;
document.querySelector('body').insertAdjacentHTML('afterbegin', tagId('div')('game-text')(''));

// updates the star count everytime a star has been collected
function gameUpdate(){
  const gameText = tag('p')(`Stars = ${starCount}`);
  document.getElementById('game-text').innerHTML = gameText;

  // popup once game has been won
  if (starCount === 10){
    document.querySelector('body').insertAdjacentHTML('afterbegin', tagId('div')('game-won')(''));
    const gamePopup= document.getElementById('game-won');
    gamePopup.innerHTML = tag('h1')('Congratulations!');
    player = new Player();
  }
}

// This listens for key presses and sends the keys to
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// functions called at start of a new game
gameUpdate();
addStar();
addEnemy();
