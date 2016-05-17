function Bullet(game, spritesheet, degree) {
	this.spriteSheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
    this.x = 550;
    this.speed = 10;
    this.y = 325;
	this.degree = degree;
	this.position = this.game.entities.length - 1;
}

function toRadians (angle) {
	return angle * (Math.PI / 180);
}
 
Bullet.prototype.update = function () {
	this.x += Math.cos( toRadians(this.degree + 180)) * 4;
	this.y += Math.sin( toRadians(this.degree + 180)) * 4;
	if(this.x < 0 || this.x > 1060  || this.y < 0 || this.y > 700) {
		this.game.removeEntity(this.position);
	} 
}

Bullet.prototype.draw = function (ctx) {
	this.ctx.drawImage(this.spriteSheet,
                 this.x, this.y, 25, 25);
	
};
