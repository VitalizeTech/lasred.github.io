



var potentialX = [-4, -3.5, -3, -2.5, -2, -1.5, -1, -.5, 0, .5, 1, 1.5, 2, 2.5, 3, 3.5, 4];
var potentialY = [0, .5, 1, 1.5, 2, 2.5, 3, 3.5, 4, -4, -3.5, -3, -2.5, -2, -1.5, -1, -.5];

var bulletCount = 0;


function Bullet(game, spritesheet) {
	this.spriteSheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
    this.x = 350;
    this.speed = 10;
    this.y = 250;

	this.entityPos = -1;

	//get the direction for this bullet.
	this.xmoves = Math.floor(Math.random() * potentialX.length);
	this.ymoves = Math.floor(Math.random() * potentialY.length);

}


function toRadians (angle) {
  return angle * (Math.PI / 180);
}


Bullet.prototype.update = function () {

    //this.x += potentialX[this.xmoves];
	//this.y += potentialY[this.ymoves];

	this.x += Math.cos( toRadians(this.game.entities[0].degree + 180)) * 4;
	this.y += Math.sin( toRadians(this.game.entities[0].degree + 180)) * 4;
	console.log("degrees are " + this.x + ", " + this.y);

	if (this.x < 50 || this.x > 500 || this.y < 50 || this.y > 350) {

		if (bulletCount < 2) { //including the original bullet, max bullets will be 1 more than this value.
			console.log("bulletCount is " + bulletCount);

			var abul = new Bullet(this.game, AM.getAsset("./img/Canada.png"));
			abul.entityPos = this.game.entities.length;
			this.game.addEntity(abul);

			bulletCount += 1;
		}
	}

	if(this.x < 0 || this.x > (Math.random()*150 + 700)) {
		//this.moves = Math.floor(Math.random() * potentialX.length);
		//this.x = 350;
		//this.y = 250;

		//delete this
		this.game.removeEntity(this.entityPos);
		bulletCount -= 1;

	} else if (this.y < 0 || this.y > (Math.random()*100 + 450)) {
		//this.moves = Math.floor(Math.random() * potentialX.length);
		//this.y = 250;
		//this.x = 350;

		//delete this
		this.game.removeEntity(this.entityPos);
		bulletCount -= 1;
	}
}

Bullet.prototype.draw = function (ctx) {
    this.ctx.drawImage(this.spriteSheet,
                 this.x, this.y, 30, 30);
};
