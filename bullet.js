function Bullet(game, spritesheet, degree) {
	this.spriteSheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
    this.speed = 4;
	this.degree = degree + 15;
	this.position = this.game.entities.length - 1;
	var newPoint = findNewPoint(510, 275, this.degree, 40);
    this.x = newPoint.x;
    this.y = newPoint.y;
}

function toRadians (angle) {
	return angle * (Math.PI / 180);
}
 
Bullet.prototype.update = function () {
	this.x += Math.cos( toRadians(this.degree + 180)) * this.speed;
	this.y += Math.sin( toRadians(this.degree + 180)) * this.speed;
	if(this.x < 0 || this.x > 1060  || this.y < 0 || this.y > 700) {
        if(this.game.entities.length > 9) {
            this.game.entities.splice(6, 1);
        }
		//this.game.removeEntity(this.position);
	} 
}

function findNewPoint(x, y, angle, distance) {
    var result = {};
    result.x = Math.cos(angle * Math.PI / 180) * -(distance) + x;
    result.y = Math.sin(angle * Math.PI / 180) * -(distance) + y;
    return result;
}

Bullet.prototype.draw = function (ctx) {
	this.ctx.drawImage(this.spriteSheet,
                 this.x, this.y, 25, 25);
	
};
