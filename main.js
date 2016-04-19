/*
  Computational World - Herobound gladators, Ansher Wars 
  JavaScript - interpreted language, not compiled into binary file 
  JavaScript provides interactive elements of web page 
  */

//Purpose of Animation oject - track how long animation has been running, draw appropriate frame
function Animation(spriteSheet, frameStartY, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale) {
    this.spriteSheet = spriteSheet;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.sheetWidth = sheetWidth;
    this.frames = frames;
	this.frameStartY = frameStartY;
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
    ctx.drawImage(this.spriteSheet,
                 xindex * this.frameWidth, this.frameStartY,  // source from sheet
                 this.frameWidth, this.frameHeight,
                 x, y, 60, 60);
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
};


function Background(game) {
    this.game = game;
    this.ctx = game.ctx;
    this.image = AM.getAsset("./img/MAGABackground.png");
}

Background.prototype.draw = function (ctx) {
    ctx.drawImage(this.image, 0, 0);
	ctx.beginPath();
	ctx.fillStyle = "red";
	ctx.font = "10px Arial";
	var arrayLength = this.game.activeVoteCoins.length;
	for (var i = 0; i < arrayLength; i++) {
		ctx.fillStyle = "red";
		var voteCoin = this.game.activeVoteCoins[i];
		ctx.arc(voteCoin.x, voteCoin.y, 50, 0, 2*Math.PI);
		ctx.fill();
		ctx.fillStyle = "black";
		ctx.beginPath();
		ctx.fillText(voteCoin.state,voteCoin.x - 25,voteCoin.y );
		ctx.fillText(voteCoin.vote,voteCoin.x - 5,voteCoin.y + 20);
		ctx.closePath();
	}
	

}
Background.prototype.update = function () {};


function TrumpWalker(game) {
    this.walkRightAnimation = new Animation(AM.getAsset("./img/TrumpWalker.png"),100, 50, 46.5, 3, 0.10, 30, false, 1);
	this.walkLeftAnimation = new Animation(AM.getAsset("./img/TrumpWalker.png"), 50, 50, 46.5, 3, 0.10, 30, false, 1);
	this.walkDownAnimation = new Animation(AM.getAsset("./img/TrumpWalker.png"), 0, 50, 46.5, 3, 0.10, 30, false, 1);
	this.walkUpAnimation = new Animation(AM.getAsset("./img/TrumpWalker.png"), 150, 50, 46.5, 3, 0.10, 30, false, 1);
    this.game = game;
	this.direction = 1;
    this.ctx = game.ctx;
    this.x = 300;
	this.speed = 100;
	this.y  = 250;
}

TrumpWalker.prototype.update = function() {
	var isMoving = this.game.right || this.game.left || this.game.down || this.game.up;
	if(this.game.right) {
		this.x += this.game.clockTick * this.speed;
		this.direction = 1;
	} else if(this.game.left) {
		this.x -= this.game.clockTick * this.speed;
		this.direction = 2;
	} else if(this.game.down) {
		this.y += this.game.clockTick * this.speed;
		this.direction = 3;
	} else if(this.game.up){
		this.y -= this.game.clockTick * this.speed;
		this.direction = 4;
	}
	if(this.x > 700 || this.x < 0) {
		this.x = 300;
	}
	if(this.y > 600 || this.y < 0) {
		this.y = 250;
	}
	//collision
	if(isMoving) {
		var arrayLength = this.game.activeVoteCoins.length;
		for (var i = arrayLength-1; i >= 0; i --) {
			var voteCoin = this.game.activeVoteCoins[i];
			var dx = this.x - voteCoin.x; 
			var dy = this.y - voteCoin.y; 
			var distance = Math.sqrt(dx * dx + dy * dy);
			//80 feels right
			if (distance < 80) { 
				// collision detected! 
				this.game.activeVoteCoins.splice(i, 1);
				this.game.scoreBoard.innerHTML = voteCoin.vote + parseInt(this.game.scoreBoard.innerHTML);
				var pendingLength = this.game.pendingVoteCoins.length;
				if(pendingLength > 0) {
					 var toAddVoteCoin = this.game.pendingVoteCoins[pendingLength - 1];
					 this.game.activeVoteCoins.push(toAddVoteCoin);
					 this.game.pendingVoteCoins.splice(pendingLength - 1, 1);
				}
			}
		}	
	}
}

TrumpWalker.prototype.draw = function (ctx) { 
	if(this.game.right || this.direction == 1) {
		this.walkRightAnimation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
	} else if(this.game.left || this.direction == 2) {
		this.walkLeftAnimation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
	} else if(this.game.down || this.direction == 3) {
		this.walkDownAnimation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
	} else if(this.game.up || this.direction == 4){
		this.walkUpAnimation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
	}
};

function VoteCoin(x, y, state, vote) {	
	this.x = x;
	this.y = y;
	this.vote = vote;
	this.state = state;
}
// the "main" code starts here...

var AM = new AssetManager();

AM.queueDownload("./img/TrumpWalker.png");
AM.queueDownload("./img/MAGABackground.png");

AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
	var score = document.getElementById("score")
	//2d context 
    var ctx = canvas.getContext("2d");
    var gameEngine = new GameEngine();
	gameEngine.scoreBoard = score; 
	gameEngine.activeVoteCoins = [new VoteCoin(60, 55, "New York", 95), new VoteCoin(700, 55, "Connecticut", 28), 
	   new VoteCoin(60, 450, "Delaware", 16), new VoteCoin(700, 450, "Rhode Island", 19)];
	gameEngine.pendingVoteCoins = [new VoteCoin(180, 55, "Maryland", 38), new VoteCoin(444, 80, "Pennsylvania", 17), 
	   new VoteCoin(68, 270, "Indiana", 57), new VoteCoin(180, 250, "Nebraska", 36)];
    gameEngine.init(ctx);
    gameEngine.start();
    gameEngine.addEntity(new Background(gameEngine));
	gameEngine.addEntity(new TrumpWalker(gameEngine));

})