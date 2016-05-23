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
	this.hasCollidedWithTrump = false;
}

function toRadians (angle) {
	return angle * (Math.PI / 180);
}
 
Bullet.prototype.update = function () {
	this.x += Math.cos( toRadians(this.degree + 180)) * this.speed;
	this.y += Math.sin( toRadians(this.degree + 180)) * this.speed;
	var trump = this.game.leader;
	var rect1 = {x: trump.x, y: trump.y, width: 50, height: 50};
	var rect2 = {x: this.x, y: this.y, width: 25, height: 25};
	if (trump.x < this.x + 25 && trump.x + 50 > this.x && trump.y < this.y + 25 && 50 + trump.y > this.y && !this.hasCollidedWithTrump) {
		this.hasCollidedWithTrump = true;
         //update health bar based on current health
        if(this.game.healthBar.src.match("./img/4-4health.png")) {
            this.game.healthBar.src = "./img/3-4health.png";
			this.game.health.innerHTML = "3";
        } else if(this.game.healthBar.src.match("./img/3-4health.png")) {
            this.game.healthBar.src = "./img/2-4health.png";
			this.game.health.innerHTML = "2";
        } else if(this.game.healthBar.src.match("./img/2-4health.png")) {
            this.game.healthBar.src = "./img/1-4health.png";
			this.game.health.innerHTML = "1";
        } else if(this.game.healthBar.src.match("./img/1-4health.png")) {
            this.game.healthBar.src = "./img/0-4health.png";
            this.game.health.innerHTML = "0";
            this.game.entities[1].removeFromWorld = true;
            if(confirm("You bit the bullet! Would you like to start a new game?") == true) {
				location.reload();
            }
            else {
				for(var i = 0; i < this.game.entities.length; i++) {
					this.game.entities[i].removeFromWorld = true;
                }
                document.body.style.backgroundImage = "url('./img/Game_Over.png')";
                document.body.style.backgroundRepeat = "no-repeat";
            }
        }
	}
	if(this.x < 0 || this.x > 1060  || this.y < 0 || this.y > 700) {
        if(this.game.entities.length > 9) {
            this.game.entities.splice(6, 1);
        }
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
