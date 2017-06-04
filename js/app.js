// Enemies our player must avoid
var Enemy = function(x,y,s) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;    // x position
    this.y = y;    // y position
    this.s = s;    // speed charactor used in .update method

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.s * dt;  // set the movement and speed of the enemy 

    if (this.x > 505) {    // if the enemy went out of the screen,
        this.x = -101;     // set them back to the starting point.
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.x = 202;   // set the initial position x of player
    this.y = 404;   // set the initial postion y 
    this.sprite = 'images/char-boy.png'
};

Player.prototype.update = function() {
    if (this.y < 0) {   // When the Player reaches the watherside.
        this.x = 202;   // reset it to the begin point.
        this.y = 404;
    } else if (this.y == 238) {                            // When the player is on the 3rd stone row,
        var dis1 = Math.abs(this.x - allEnemies[2].x);     // detect the distance between player
        var dis2 = Math.abs(this.x - allEnemies[5].x);     // and the two enemies in this row.
    } else if (this.y == 155) {                            // When the player is on the 2nd stone row,
        var dis1 = Math.abs(this.x - allEnemies[1].x);
        var dis2 = Math.abs(this.x - allEnemies[4].x);
    } else if (this.y == 72) {                             // When the player is on the 1st stone row,
        var dis1 = Math.abs(this.x - allEnemies[0].x);
        var dis2 = Math.abs(this.x - allEnemies[3].x);
    }
    if (dis1 < 80 || dis2 < 80) {    // When the distance is too short,
        this.x = 202;                // set the player to the starting point.
        this.y = 404;
    }

};

Player.prototype.render = function(dt) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);  //draw the player on the screen
};

// This handleInput() method use the keyCode from allowedKeys
// to move the Player.
// And it prevent the Player go off the canvas.
Player.prototype.handleInput = function (move){
    if (move == 'left' && this.x > 100) {
        this.x -= 101;
    } else if (move == 'right' && this.x < 350) {
        this.x += 101;
    }  else if (move == 'up' && this.y > 0) {
        this.y -= 83;
    }  else if (move == 'down' && this.y < 350) {
        this.y += 83;
    }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player;

var enemy1 = new Enemy(-101,60,280);
var enemy2 = new Enemy(-101,145,500);
var enemy3 = new Enemy(-101,225,470);
var enemy4 = new Enemy(-202,60,230);
var enemy5 = new Enemy(-202,145,400);
var enemy6 = new Enemy(-202,225,350);

var allEnemies = [enemy1,enemy2,enemy3,enemy4,enemy5,enemy6];

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

