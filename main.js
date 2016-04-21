/*
  Computational World - Herobound gladators, Ansher Wars 
  JavaScript - interpreted language, not compiled into binary file 
  JavaScript provides interactive elements of web page 
  */

//Purpose of Animation oject - track how long animation has been running, draw appropriate frame
var rightLimit = 700;
var botLimit = 600;

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
                 x, y,
                 this.frameWidth * this.scale,
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
        ctx.arc(voteCoin.x, voteCoin.y, 50, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.fillText(voteCoin.state, voteCoin.x - 25, voteCoin.y);
        ctx.fillText(voteCoin.vote, voteCoin.x - 5, voteCoin.y + 20);
        ctx.closePath();
    }
}
Background.prototype.update = function () { };

function TrumpWalker(game, spritesheet) {
    this.animation = new Animation(spritesheet, 49, 48.2, 3, 0.10, 12, true, 1);
    this.game = game;
    this.direction = 0;
    this.ctx = game.ctx;
    this.x = 300;
    this.speed = 100;
    this.y = 250;
    this.topLimit = 10;
    this.botLimit = 150;
    this.rightLimit = 10;
    this.leftLimit = 10;
	this.isPaused = true;
	this.pausedFor = 0;
    this.nextPosition = function (direction) {
        switch (direction) {
	    case 0: {
                return this.y + this.game.clockTick * this.speed;
            }
            case 1: {
                return this.x - this.game.clockTick * this.speed;
            }
            case 2: {
                return this.x + this.game.clockTick * this.speed;
            }
            case 3: {
                return this.y - this.game.clockTick * this.speed;
            }
            default: {
                return this.game.clockTick * this.speed;
            }
        }
    }

    this.canMove = function (direction) {
        var nextPos = this.nextPosition(direction);
        switch (direction) {
            case 0: {
                return (nextPos <= (botLimit - this.botLimit));
            }
	    case 1: {
                return (nextPos >= this.leftLimit);
            }
            case 2: {
                return (nextPos <= (rightLimit - this.rightLimit));
            }
            case 3: {
                return (nextPos >= this.topLimit);
            }
        }
    }
}

TrumpWalker.prototype.update = function () {
	var isMoving = false;
     if (this.game.up && !this.game.down) {
        this.y = this.canMove(3) ? this.nextPosition(3) : this.y;
        this.direction = 3;
		isMoving = true;
    } if (this.game.down && !this.game.up) {
        this.y = this.canMove(0) ? this.nextPosition(0) : this.y;
        this.direction = 0;
		isMoving = true;
    } if (this.game.right  && !this.game.left) {
        this.x = this.canMove(2) ? this.nextPosition(2) : this.x;
        this.direction = 2;
		isMoving = true;
    } if (this.game.left && !this.game.right) {
        this.x = this.canMove(1) ? this.nextPosition(1) : this.x;
        this.direction = 1;
		isMoving = true;
    }
    //collision
    if (isMoving) {
	this.isPaused = false;
	this.pausedFor = 0;
        var arrayLength = this.game.activeVoteCoins.length;
        for (var i = arrayLength - 1; i >= 0; i--) {
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
                if (pendingLength > 0) {
                    var toAddVoteCoin = this.game.pendingVoteCoins[pendingLength - 1];
                    this.game.activeVoteCoins.push(toAddVoteCoin);
                    this.game.pendingVoteCoins.splice(pendingLength - 1, 1);
                }
            }
        }
    } else {
		this.isPaused = true;
		if (this.pausedFor > 300) {
			var randomCD = Math.random();
			if (randomCD >= 0.3 && randomCD < 0.33) {
				var randomDir = Math.random();
				this.direction = Math.round((randomDir * 100) % 3);
				this.pausedFor = 0;
			}
		}
		else {
			this.pausedFor++;
		}
	}
}

TrumpWalker.prototype.draw = function (ctx) {
    var anim = this.animation;
    anim.elapsedTime += this.game.clockTick;
    if (anim.isDone()) {
        if (anim.loop) anim.elapsedTime = 0;
    }
    var frame = Math.floor(anim.elapsedTime / anim.frameDuration);
    var xindex = 1;
    var yindex = this.direction;
    if (!this.isPaused) {
        xindex = frame % anim.sheetWidth;
    }
    this.ctx.drawImage(anim.spriteSheet,
                 xindex * anim.frameWidth,
                 yindex * anim.frameHeight,
                 anim.frameWidth, anim.frameHeight,
                 this.x, this.y,
                 anim.frameWidth,
                 anim.frameHeight);
};

function VoteCoin(x, y, state, vote) {
    this.x = x;
    this.y = y;
    this.vote = vote;
    this.state = state;
}
// the "main" code starts here...

var AM = new AssetManager();

AM.queueDownload("./img/Trump.png");
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
    gameEngine.addEntity(new TrumpWalker(gameEngine, AM.getAsset("./img/Trump.png")));
})