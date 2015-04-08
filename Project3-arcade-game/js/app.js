// Enemies our player must avoid
"use strict";
var Entity = function(x, y, s, w, h, spr) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x,
    this.y = y,
    //Enemy speed
    this.s = s,
    this.width = w,
    this.height = h;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = spr;
};

var Enemy = function(x, y, s, w, h, spr) {
    Entity.call(this, x, y, s, w, h, spr);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same s for
    // all computers.
    this.x += this.s * dt;
    this.reset();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


Enemy.prototype.reset = function() {
    for (var i = 0, y = 60, s = 200; i < allEnemies.length; i++, y += 85, s += 75) {
        if (allEnemies[i].x > 500) {
            allEnemies[i].x = 0,
                allEnemies[i].y = y,
                allEnemies[i].s = s;
        }
    }
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y, s, w, h, spr) {
    Entity.call(this, x, y, s, w, h, spr);
};

Player.prototype.update = function(dt) {
    if (this.y < 0) {
        this.reset();
    }
};

Player.prototype.handleInput = function(key) {
    if (key === "left" && this.x > 0) {
        this.x -= 100;
    } else if (key === "right" && this.x < 355) {
        this.x += 100;
    } else if (key === "up" && this.y > 55) {
        this.y -= 85;
    } else if (key === "down" && this.y < 400) {
        this.y += 85;
    }
};

var START_X = 200,
    START_Y = 400;
Player.prototype.reset = function() {
    this.x = START_X, this.y = START_Y;
};


// Draw the player on the screen, required method for game

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var i = 0,
    x = 0,
    y = 60,
    s = 150,
    w = 70,
    h = 10,
    spr = "images/enemy-bug.png";
for (i; i < 3; i++, x += 180, y += 85, s += 10) {
    allEnemies.push(new Enemy(x, y, s, w, h, spr));
}

var player = new Player(200, 400, 200, 10, 10, "images/char-boy.png");


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function(e) {
    var allowedKeys = {
        37: "left",
        38: "up",
        39: "right",
        40: "down"
    };

    player.handleInput(allowedKeys[e.keyCode]);
});