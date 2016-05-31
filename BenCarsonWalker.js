function BenCarsonWalker(game, spritesheet,  frameHeight, frameWidth, sheetWidth, x, y, frameDuration, frames, speed) {
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
                    if (this.x > 448 - 49 + 10 && this.x < 448 + 155 - 10) {
                        return false;
                    }
                }
                return (nextPos < (rightLimit - this.rightLimit));
            }
            case 3: {
                if ((this.x >= 448 - 49 + 22) && (this.x <= (448 + 155 - 100))) {
                    if (this.y <= 350 && this.y >= 211) {
                        return false;
                    }
                }
                return (nextPos >= this.topLimit);
            }
        }
    }
}

BenCarsonWalker.prototype.update = function () {
    var isMoving = false;

    //calculate next directional move
    if(Math.random() > .95) {
        this.direction = Math.floor(Math.random() *4);
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

BenCarsonWalker.prototype.draw = function (ctx) {
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
