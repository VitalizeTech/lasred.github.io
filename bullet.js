



var potentialX = [-4, -3.5, -3, -2.5, -2, -1.5, -1, -.5, 0, .5, 1, 1.5, 2, 2.5, 3, 3.5, 4];
var potentialY = [0, .5, 1, 1.5, 2, 2.5, 3, 3.5, 4, -3.5, -3, -2.5, -2, -1.5, -1, -.5, 0];



function Bullet(game, spritesheet) {
	this.spriteSheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
    this.x = 350;
    this.speed = 10;
    this.y = 250;

	//get the direction for this bullet.
	this.moves = Math.floor(Math.random() * potentialX.length);

}

Bullet.prototype.update = function () {

    this.x += potentialX[this.moves];
	this.y += potentialY[this.moves];

	if(this.x < 0 || this.x > 650) {
		this.moves = Math.floor(Math.random() * potentialX.length);
		this.x = 350;
		this.y = 250;
	}
	if (this.y < 0 || this.y > 450) {
		this.moves = Math.floor(Math.random() * potentialX.length);
		this.y = 250;
		this.x = 350;
	}
}

Bullet.prototype.draw = function (ctx) {
    this.ctx.drawImage(this.spriteSheet,
                 this.x, this.y, 30, 30);
};
