function Bullet(game, spritesheet, degree, speedRatio) {
	this.spriteSheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
    this.speed = 4 * speedRatio;
	this.degree = degree - 210;
	this.position = this.game.entities.length - 1;
	var newPoint = findNewPoint(510, 275, this.degree, 75);
    this.x = newPoint.x;
    this.y = newPoint.y;
	this.hasCollidedWithTrump = false;
	this.weDying = document.getElementById("trumpDying");
    this.weDead = document.getElementById("trumpDead");
}

function toRadians (angle) {
	return angle * (Math.PI / 180);
}

function findAngleCoords(degree, speed) {
    return {
        x: Math.cos(toRadians(degree + 180)) * speed,
        y: Math.sin(toRadians(degree + 180)) * speed
    }
}

Bullet.prototype.update = function () {

    var coords = findAngleCoords(this.degree, this.speed);
    this.x += coords.x;
    this.y += coords.y;

	var trump = this.game.leader;
	var rect1 = {x: trump.x, y: trump.y, width: 50, height: 50};
	var rect2 = {x: this.x, y: this.y, width: 25, height: 25};
	if (trump.x < this.x + 25 && trump.x + 50 > this.x && trump.y < this.y + 25 && 50 + trump.y > this.y && !this.hasCollidedWithTrump) {
		this.hasCollidedWithTrump = true;
         //update health bar based on current health
        if(this.game.healthBar.src.match("./img/4-4health.png")) {
            this.game.healthBar.src = "./img/3-4health.png";
			this.game.health.innerHTML = "3";
			this.weDying.volume = 1;
			this.weDying.play();
        } else if(this.game.healthBar.src.match("./img/3-4health.png")) {
            this.game.healthBar.src = "./img/2-4health.png";
			this.game.health.innerHTML = "2";
			this.weDying.volume = 1;
			this.weDying.play();
        } else if(this.game.healthBar.src.match("./img/2-4health.png")) {
            this.game.healthBar.src = "./img/1-4health.png";
			this.game.health.innerHTML = "1";
			this.weDying.volume = 1;
			this.weDying.play();
        } else if(this.game.healthBar.src.match("./img/1-4health.png")) {
            this.game.healthBar.src = "./img/0-4health.png";
            this.game.health.innerHTML = "0";
            this.weDead.volume = 1;
			this.weDead.play();
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
            this.game.entities.splice(13, 1);
	} 
}

function findNewPoint(x, y, angle, distance) {
    var result = {};
    result.x = Math.cos(angle * Math.PI / 180) * -(distance) + x;
    result.y = Math.sin(angle * Math.PI / 180) * -(distance) + y;
    return result;
}

function TrumpAngle(x, y) {
    var startX = 510;
    var startY = 275;
    var p13 = seg(startX, x, startY, y);
    var p12 = seg(startX, startX + 50, startY, startY);
    var p23 = seg(startX + 50, x, startY, y);
    return Math.acos((Math.pow(p12, 2) + Math.pow(p13, 2) - Math.pow(p23, 2))/(2 * p12 * p13)) * 60;
}

function seg(x1, x2, y1, y2) {
    return Math.sqrt(Math.pow(Math.abs(x1 - x2), 2) + Math.pow(Math.abs(y1 - y2), 2));
}

function findDegreeDifference(x, y, degree) {
    var coords = findAngleCoords(degree, 4);
    var xDiff = Math.abs(x - coords.x);
    var yDiff = Math.abs(y - coords.y);
    var angle = Math.atan2(yDiff, xDiff) * (180 / Math.PI)
    return angle;
}


Bullet.prototype.draw = function (ctx) {
	this.ctx.drawImage(this.spriteSheet,
                 this.x, this.y, 25, 25);

};
