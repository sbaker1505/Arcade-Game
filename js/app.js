// Enemies our player must avoid
var Enemy = function(row) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -101;
    this.y = (cellH * row) - (cellH * 0.3);
    this.row = row

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.row === 1){
      this.x += dt * 300;
    } else if (this.row === 2){
      this.x += dt * 225;
    } else if (this.row === 3){
      this.x += dt * 375;
    }
    if (this.x >= 505){
      this.x = 505;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var cellW = 101;
var cellH = 83;

class Player {
  constructor(){
    this.x = cellW * 2;
    this.y = cellH * 4.5;

    this.sprite = 'images/char-horn-girl.png';
  }

  update(){

  }

  render(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  handleInput(dir){
    if (dir === 'up') {
      this.y -= cellH;
      if (this.y < 0) {
        this.y += cellH;
      }
    } else if (dir === 'down') {
      this.y += cellH;
      if (this.y > cellH * 5) {
        this.y -= cellH;
      }
    } else if (dir === 'left') {
      this.x -= cellW;
      if (this.x < 0){
        this.x += cellW;
      }
    } else if (dir === 'right') {
      this.x += cellW;
      if (this.x > cellW * 4){
        this.x -= cellW;
      }
    }
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
let player = new Player();

function addEnemy() {
  const row = Math.floor(Math.random() * 3 + 1);
  allEnemies.push(new Enemy(row))
  // removes enemy from allEnemies Array once enemy is off canvas
  allEnemies.forEach(function(enemy, index){
    if (enemy.x === 505) {
      allEnemies.splice(index, 1);
    }
  })
}
addEnemy();
setInterval(addEnemy, 500);


function collision() {
  for (enemy of allEnemies) {
    if (enemy.x + 101 === player.x) {
      console.log('ouch!')
    }
  }
}


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
