function AssassinWalker(game, spritesheet,  frameHeight, frameWidth, sheetWidth, x, y, frameDuration, frames, speed) {
    this.animation = new Animation(spritesheet, frameHeight, frameWidth, sheetWidth, frameDuration, frames, true, 1);
    this.game = game;
    this.direction = 1;
    this.ctx = game.ctx;
    this.x = x;
    this.speed = speed;
    this.y = y;
    this.topLimit = 10;
    this.botLimit = 150;
    this.rightLimit = 10;
    this.leftLimit = 10;
    this.isPaused = true;
    this.pausedFor = 0;
    this.pDirection = 2;
    this.pureSpeed = speed;
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
                if ((this.x > 448 - 49 + 22) && (this.x < (448 + 155 - 20))) {
                    if (this.y > 211 - 49 && this.y < 350 - 49) {
                        return false;
                    }
                }
                return ((nextPos < (botLimit - this.botLimit)));
            }
            case 1: {
                if ((this.y > 211 - 45) && (this.y < 345)) {
                    if (this.x > 448 - 49 + 22 && this.x < 448 + 155 - 10) {
                        return false;
                    }
                }
                return (nextPos > this.leftLimit);
            }
            case 2: {
                if ((this.y > 211 - 45) && (this.y < 345)) {
                    if (this.x > 448 - 49 + 10 && this.x < 448 + 155 - 100) {
                        return false;
                    }
                }
                return (nextPos < (rightLimit - this.rightLimit));
            }
            case 3: {
                if ((this.x >= 448 - 49 + 22) && (this.x <= (448 + 155 - 20))) {
                    if (this.y <= 350 && this.y >= 211) {
                        return false;
                    }
                }
                return (nextPos >= this.topLimit);
            }
        }
    }
}

AssassinWalker.prototype.update = function () {
    //if Game score reaches a certain point each assassin gets a speed change to up the difficulty
    var gameScore = this.game.scoreBoard.innerHTML;
    this.speed = this.pureSpeed;
    var assassinNum = 0;
    if(gameScore > 600) {
        this.speed = 90;
    }
    if(this.game.scoreType.innerHTML == "Electors") {
        this.speed = 95;
        if(gameScore > 150) {
            this.speed = 100;
        }
    }
    this.pureSpeed = this.speed;
    this.speed = (this.speed*this.game.jebBoost);

    var isMoving = false;
    var assassinX = 0;
    var assassinY = 0;
    //find Trump Location
    var trumpX = this.game.entities[1].x;
    var trumpY = this.game.entities[1].y;
    //find out which entity the Assassin is. This will allow multiple assassins to exist at the same time.
    for(var i = 6; i < this.game.entities.length; i++) {
        if((this.x === this.game.entities[i].x) && (this.y === this.game.entities[i].y)) {
            //once the Assassin has been found set the assassinX and Y variables so distance can be calculated
            assassinX = this.game.entities[i].x;
            assassinY = this.game.entities[i].y;
            assassinNum = i;
        }
    }

    //calculate distance on x and y from trump
    var dX = assassinX - trumpX;
    var dY = assassinY - trumpY;


    var closestMove = 0;
    //finds current distance from trumpWalker
    var baseDist = Math.sqrt(dX * dX + dY * dY);
    //finds distance if Assassin moves in any direction
    var leftDist = Math.sqrt((dX-1) * (dX-1) + dY * dY);
    var rightDist = Math.sqrt((dX+1) * (dX+1) + dY * dY);
    var upDist = Math.sqrt(dX * dX + (dY-1) * (dY-1));
    var downDist = Math.sqrt(dX * dX + (dY+1) * (dY+1));
    var currentDirDist = 10000;
    if(this.direction === 1) {
        currentDirDist = leftDist;
    }
    if(this.direction === 2) {
        currentDirDist = rightDist;
    }
    if(this.direction === 3) {
        currentDirDist = upDist;
    }
    if(this.direction === 0) {
        currentDirDist = downDist;
    }
    if(this.direction === 5) {
        currentDirDist = baseDist;
    }


    //get lowest distance and set that as new direction
    var lowestDist = Math.min(leftDist, rightDist, upDist, downDist, baseDist);
    if((currentDirDist - lowestDist) > .125) {
        if(lowestDist === leftDist) {
            this.direction = 1;
        }
        if(lowestDist === rightDist) {
            this.direction = 2;
        }
        if(lowestDist === upDist) {
            this.direction = 3;
        }
        if(lowestDist === downDist) {
            this.direction = 0;
        }
        if(lowestDist === baseDist) {
            this.direction = Math.floor(Math.random() * 4);
        }
    }


    if (this.direction === 3) {
        this.y = this.canMove(3) ? this.nextPosition(3) : this.y;
        this.direction = 3;
        isMoving = true;
    } if (this.direction === 0) {
        this.y = this.canMove(0) ? this.nextPosition(0) : this.y;
        this.direction = 0;
        isMoving = true;
    } if (this.direction === 2) {
        this.x = this.canMove(2) ? this.nextPosition(2) : this.x;
        this.direction = 2;
        isMoving = true;
    } if (this.direction === 1) {
        this.x = this.canMove(1) ? this.nextPosition(1) : this.x;
        this.direction = 1;
        isMoving = true;
    }

    //release check for the second and third assassin. Once a certain score is reached they are allowed to enter the playable area
    if((assassinNum === 10 && gameScore < 900 && this.game.scoreType.innerHTML == "Delegates") || (assassinNum === 11 && this.game.scoreType.innerHTML == "Delegates")){
        if(Math.random() > .5) {
            this.game.entities[assassinNum].x = ((Math.random() * 2170) + 1400);
            if(Math.random() > .5) {
                this.game.entities[assassinNum].y = ((Math.random() * 1400) + 900);
            }
            else {
                this.game.entities[assassinNum].y = (((Math.random() * 1400) + 900)*-1);
            }
        }
        else {
            this.game.entities[assassinNum].x = (((Math.random() * 2170) + 1400)*-1);
            if(Math.random() > .5) {
                this.game.entities[assassinNum].y = ((Math.random() * 1400) + 900);
            }
            else {
                this.game.entities[assassinNum].y = (((Math.random() * 1400) + 900)*-1);
            }
        }
    }


    //helps with animation don't delete or modify
    if (isMoving) {
        this.isPaused = false;
        this.pausedFor = 0;
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
};

AssassinWalker.prototype.draw = function (ctx) {
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
