// Enemies our player must avoid
var maxspeed, minspeeed, inclevel=0;
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    'use strict'; 
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.maxspeed = 600;
    this.minspeeed = 200;
    this.speed = this.bugspeed(maxspeed, minspeeed);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 900) {
        this.x = this.x + (this.speed * dt) + inclevel;
    } else {
        this.x = -70;
        this.speed = this.speed;
    }
};

//use to calculate the speed of enemies
Enemy.prototype.bugspeed = function(maxspeed, minspeeed) {
    // reference https://stackoverflow.com/questions/5271598/java-generate-random-number-between-two-given-values
    return Math.round(Math.random() * (this.maxspeed - this.minspeeed) + this.minspeeed);

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


var Player = function(x, y) {
    'use strict';
    this.sprite = 'images/enemy-bug.png';
    this.inc=0;
    this.level=0;
    this.x = x;
    this.y = y;
    this.speed = 40;
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
//detect if the collison has occured or not
Player.prototype.update = function() {
    for (var i = 0; i < allEnemies.length; i++) {
        // help from https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection  used  width 50 here for both the sprite
        if (this.x < allEnemies[i].x + 50 && this.x + 50 > allEnemies[i].x && this.y < allEnemies[i].y + 50 && this.y + 50 > allEnemies[i].y) {
            this.startAgain();

        }
    }

};



// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//this function is called when player hits any bug
Player.prototype.startAgain = function() {
    if (this.inc === 0) {
        var s = confirm('shame!!!You didn\'t even cross level 1!!!do you want to RESTART the game');
        if (s === false) {
            window.close();
        }
    } else if (this.inc > 0) {
        var m = confirm('You only completed level ' + this.inc + ' !!do you want to RESTART the game');
        if (m === false) {
            window.close();
        }

    }

    this.x = 150;
    this.y = 350;
    this.inc = 0;
    this.level = 0;
    document.getElementById('total').innerHTML = 'Score:' + this.inc;
    document.getElementById('level').innerHTML = 'level:' + this.level;

};

//this function is called when we reach the water
Player.prototype.Reached = function() {
    this.inc = this.inc + 1;
    this.x = 150;
    this.y = 350;
    if (this.inc < 3 && this.inc > 0) {
        this.level = 1;

    } else if (this.inc > 3) {
        this.level = this.level + 1;
        inclevel = 6; //increase the speed when we hit a score of more then 3
    }
    if (this.level > 5) {
        window.alert('you won! Have a nice day');
        this.x = 150;
        this.y = 350;
        this.level = 0;
        this.inc = 0;
    }
    document.getElementById('total').innerHTML = 'Score:' + this.inc;
    document.getElementById('level').innerHTML = 'level:' + this.level;
};
//this function helps to handle events like keyup,keydown etc
Player.prototype.handleInput = function(keyCode) {
    if (keyCode == 'left') {
        if (this.x > 20) {
            this.x = this.x - this.speed;
        }
    } else if (keyCode == 'right') {
        if (this.x < 390) {
            this.x = this.x + this.speed;

        }
    } else if (keyCode == 'up') {
        this.y = this.y - this.speed;
        if (this.y < 0) {
            this.Reached();

        }
    } else {
        if (this.y < 400) {
            this.y = this.y + this.speed;

        }
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [
    new Enemy(20, 45),
    new Enemy(10, 130),
    new Enemy(12, 220),
    new Enemy(22, 55)
];
var player = new Player(150, 280);



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