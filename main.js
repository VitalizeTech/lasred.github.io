/*
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
    this.degree = 0;
    this.timeToFire = 50;
    this.timeElapsed = 0;
    this.ohSnap = false;
    this.CannonAsset = AM.getAsset("./img/CannonE1.png");
    this.Block1Asset = AM.getAsset("./img/squareMid1.png");
    this.Block2Asset = AM.getAsset("./img/squareMid2.png");
    this.image = AM.getAsset("./img/debateRoom.jpg");
    this.marcoAsset = AM.getAsset("./img/RubioCircle.png");
    this.TedAsset = AM.getAsset("./img/CruzCircle.png");
    this.HillaryAsset = AM.getAsset("./img/ClintonCircle.png");
}

Background.prototype.draw = function (ctx) {
    this.timeElapsed += 1;
    this.degree += 0.6 + (Math.random() % 0.4);
    this.degree %= 360;

    //// get Trump's angle from center
    //var trump = this.game.characters[0];
    //this.degree = 0;
    //var diff = findDegreeDifference(trump.x, trump.y, this.degree);
    //var angle = TrumpAngle(trump.x, trump.y);
    //console.log(angle);

    if (this.timeElapsed == this.timeToFire) {

        this.timeElapsed = 0;
        var newBullet;
        if (this.game.scoreType.innerHTML == "Delegates") {
            if (this.game.scoreBoard.innerHTML <= 600) {
                newBullet = new Bullet(this.game, AM.getAsset("./img/marcoBullet.PNG"), this.degree, 1);
            } else {
                newBullet = new Bullet(this.game, AM.getAsset("./img/Canada.PNG"), this.degree, 1.4);
                this.timeToFire = 45;
            }
        }
        else {
            newBullet = new Bullet(this.game, AM.getAsset("./img/womenscard.PNG"), this.degree, 1.8);
            this.timeToFire = 40;
        }
        this.game.entities.push(newBullet);
    }

    //draw the whole background
    ctx.drawImage(this.image, 0, 0, 1170, 600);

    //draw the the lowest block which goes under the cannon.
    ctx.drawImage(this.Block1Asset, 448, 211, 155, 155);

    ctx.save();
    ctx.translate(525.5, 287.5);
    ctx.rotate(toRadians(this.degree));
    ctx.translate(0, 0);

    //draw the cannon.
    ctx.drawImage(this.CannonAsset, -32.5, -62.5, 125, 125);
    ctx.restore();

    ctx.font = "14px Arial";
    var arrayLength = this.game.activeVoteCoins.length;
    for (var i = 0; i < arrayLength; i++) {
        var coin = this.game.activeVoteCoins[i];
        ctx.drawImage(
                      FLAGS, coin.flagx, coin.flagy, coin.width, coin.height, coin.x, coin.y, coin.width * 0.2, coin.height * 0.2);
        ctx.fillStyle = "black";
        var coinValue = coin.vote;
        if (this.game.scoreType.innerHTML != "Delegates") {
            coinValue = coin.electorVote;
        }
        ctx.wrapText(coin.state + "\n\t" + coinValue, coin.x + 5, coin.y + 15, 160, 16);
    }


    //draw the upper box which goes above the cannon but below the enemy's face
    ctx.drawImage(this.Block2Asset, 473, 236, 105, 105);

    if (this.game.scoreType.innerHTML == "Delegates") {
        if (this.game.scoreBoard.innerHTML <= 600) {
            ctx.drawImage(this.marcoAsset, 480, 245, 93, 89);
        } else {
            ctx.drawImage(this.TedAsset, 480, 245, 93, 89);
        }
    } else {
        if (!this.ohSnap) {
            this.ohSnap = true;
            FLAG_LIST = FLAG_LIST_ELECT;
            populateFlags(this.game);
        }
        ctx.drawImage(this.HillaryAsset, 480, 245, 93, 89);
    }
}
Background.prototype.update = function () { };
