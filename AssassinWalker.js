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

AssassinWalker.prototype.update = function () {
    var isMoving = false;
    //find Trump Location
    var trumpX = this.game.entities[1].x;
    var trumpY = this.game.entities[1].y;
    
    //find SecretService Location
    var serveX = this.game.entities[6].x;
    var serveY = this.game.entities[6].y;
    
    var dX = serveX - trumpX;
    var dY = serveY - trumpY;
    
    
    var closestMove = 0;
    //finds current distance from trumpWalker
    var baseDist = Math.sqrt(dX * dX + dY * dY);
    //finds distance if secretServiceWalker moves in any direction
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
    
    //    //bullet collision against secretServiceWalker
    //    //get length of array
    //    var l = this.game.entities.length;
    //    //for loop to check each bullets position in relation to Trump to check for collision
    //    for(var i = 7; i < l; i++) {
    //        //getting the x and y coordinates of the bullet
    //        var eX = this.game.entities[i].x;
    //        var eY = this.game.entities[i].y;
    //        //getting the x and y coordinates of TrumpWalker
    //        var tX = this.game.entities[5].x;
    //        var tY = this.game.entities[5].y;
    //        //calculate distance bullet is from TrumpWalker
    //        var dX = tX - eX;
    //        var dY = tY - eY;
    //        var dist = Math.sqrt(dX * dX + dY * dY);
    //        //check for collison
    //        if(dist < 30) {
    //            this.game.entities[5].removeFromWorld = true;
    //        }
    //    }
    
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
