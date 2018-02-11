// Enemies our player must avoid
var maxspeed,minspeeed;
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x=x;
    this.y=y;
    this.maxspeed=900;
    this.minspeeed=400;
    this.speed=this.bugspeed(maxspeed,minspeeed);
};

Enemy.prototype.bugspeed=function(maxspeed,minspeeed) {
    return Math.round(Math.random()*(maxspeed-minspeeed+1)+minspeeed);
    //console.log(Math.round(math.random()*(maxspeed-minspeeed+1)+minspeeed));

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x<620) {
        this.x=this.x+this.speed*dt;
    }
    else {
        this.x=-70;
        this.speed=this.speed;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


var Player = function(x,y){
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-cat-girl.png';
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
Player.prototype.update =function() {

};



// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyCode) {

};



Player.prototype.startAgain=function() {
    this.x=150;
    this.y=350;
    this.sprite = 'images/char-horn-girl.png';
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [
   new Enemy(0,60),
   new Enemy(0,145),
   new Enemy(0,230)
];
var player = new Player(150,350);



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
