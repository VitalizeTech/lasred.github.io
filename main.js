/*
  Computational World - Herobound gladators, Ansher Wars
  JavaScript - interpreted language, not compiled into binary file
  JavaScript provides interactive elements of web page
  */

//Purpose of Animation oject - track how long animation has been running, draw appropriate frame
var rightLimit = 1140;
var botLimit = 700;

function Animation(spriteSheet, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale) {
    this.spriteSheet = spriteSheet;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.sheetWidth = sheetWidth;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.scale = scale;
}

Animation.prototype.drawFrame = function (tick, ctx, x, y) {
    this.elapsedTime += tick;
    if (this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
    }
    var frame = this.currentFrame();
    var xindex = 0;
    var yindex = 0;
    xindex = frame % this.sheetWidth;
    yindex = Math.floor(frame / this.sheetWidth);
	ctx.drawImage(this.spriteSheet,
		xindex * this.frameWidth, yindex * this.frameHeight,  // source from sheet
		this.frameWidth, this.frameHeight,
		x, y, this.frameWidth * this.scale,
		   this.frameHeight * this.scale);
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}

function Background(game) {
    this.game = game;
    this.ctx = game.ctx;
    this.image = AM.getAsset("./img/MAGABackground.png");
	this.lyinTedAsset = AM.getAsset("./img/LyinTed.png");
	this.crookedHillaryAsset = AM.getAsset("./img/CrookedHillary.png");
	this.degree = 0;
	this.fire = true;
}

function rotatePoint(point, center, angle) {
    angle = (angle) * (Math.PI / 180); // Convert to radians
    var rotatedX = Math.cos(angle) * (point.x - center.x) - Math.sin(angle) * (point.y - center.y) + center.x;
    var rotatedY = Math.sin(angle) * (point.x - center.x) + Math.cos(angle) * (point.y - center.y) + center.y;

    return { x: rotatedX, y: rotatedY };
}
var timeElapsed = 0;
Background.prototype.draw = function (ctx) {
	timeElapsed += 1;
	this.degree += 0.9;
	if(timeElapsed == 50) {
		timeElapsed = 0;
		var newBullet = new Bullet(this.game, AM.getAsset("./img/Canada.png"), this.degree);
		this.game.entities.push(newBullet);
	}
    ctx.drawImage(this.image, 0, 0, 1170, 700);
	ctx.save();
	ctx.translate( 525.5, 287.5);
	ctx.rotate(this.degree*Math.PI/180);
	ctx.translate(0, 0);
	if (this.game.scoreMessage.innerHTML.length > 0) {
		ctx.drawImage(this.crookedHillaryAsset, -50, -70, 125, 125);
	} else {
		ctx.drawImage(this.lyinTedAsset, -62.5, -62.5, 125, 125);
	}
	ctx.restore();
    ctx.font = "14px Arial";
    var arrayLength = this.game.activeVoteCoins.length;
    for (var i = 0; i < arrayLength; i++) {
        var coin = this.game.activeVoteCoins[i];
        ctx.drawImage(
    FLAGS, coin.flagx, coin.flagy, coin.width, coin.height, coin.x, coin.y, coin.width * 0.2, coin.height * 0.2);
        ctx.fillStyle = "black";
        ctx.wrapText(coin.state + "\n\t" + coin.vote, coin.x + 5, coin.y + 15, 160, 16);
    }
}
Background.prototype.update = function () { };
