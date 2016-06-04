function SecretServiceWalker(game, spritesheet,  frameHeight, frameWidth, sheetWidth, x, y, frameDuration, frames, speed) {
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
    this.slap = document.getElementById("securitySlap");
    this.grunt = document.getElementById("personGrunt");

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

SecretServiceWalker.prototype.update = function () {
    var isMoving = false;
    var leftDist = 0;
    var rightDist = 0;
    var upDist = 0;
    var downDist = 0;
    var closestMove = 0;

    //find Trump Location
    var trumpX = this.game.entities[1].x;
    var trumpY = this.game.entities[1].y;

    //find SecretService Location
    var serveX = this.game.entities[6].x;
    var serveY = this.game.entities[6].y;

    //variables to find closest enemy to SecretServicewalker
    var enemyX = 0;
    var enemyY = 0;
    var closestCurrentThreat = 0;
    var closestDist = 10000;
    
    for(var i = 7; i < 13; i++) {
        enemyX = this.game.entities[i].x;
        enemyY = this.game.entities[i].y;

        var eX = serveX - enemyX;
        var eY = serveY - enemyY;

        var enemyDist = Math.sqrt(eX * eX + eY * eY);
        if(enemyDist < closestDist) {
            closestDist = enemyDist;
            closestCurrentThreat = i;
        }
    }

    //distance x and y for trump
    var dX = serveX - trumpX;
    var dY = serveY - trumpY;

    //finds current distance from trumpWalker
    var baseDist = Math.sqrt(dX * dX + dY * dY);

    //checks to see if the closest threat is close and if it is take action.
    if(closestDist < 50) {
        if(closestDist < 20) {
            //var testSlap = new Audio("./music/slap.wav");
            //testSlap.play();
            if(Math.random() > .5) {
                this.game.entities[closestCurrentThreat].x = ((Math.random() * 400) + 1200);
                if(Math.random() > .5) {
                    this.game.entities[closestCurrentThreat].y = ((Math.random() * 200) + 900);
                }
                else {
                    this.game.entities[closestCurrentThreat].y = (((Math.random() * 200))*-1);
                }
            }
            else {
                this.game.entities[closestCurrentThreat].x = (((Math.random() * 400))*-1);
                if(Math.random() > .5) {
                    this.game.entities[closestCurrentThreat].y = ((Math.random() * 200) + 900);
                }
                else {
                    this.game.entities[closestCurrentThreat].y = (((Math.random() * 200))*-1);
                }
            }
            if(closestCurrentThreat > 6 && closestCurrentThreat < 10) {
                this.game.scoreMessage.innerHTML = 'Your Secret Service caught up with the Cartel. They have been stopped...for now...';
            }
            if(closestCurrentThreat > 9) {
                this.game.scoreMessage.innerHTML = 'Your Secret Service caught up with the Assassin. They have been stopped....for now...';
            }
            //finds distance if secretServiceWalker moves in any direction
            leftDist = Math.sqrt((dX-1) * (dX-1) + dY * dY);
            rightDist = Math.sqrt((dX+1) * (dX+1) + dY * dY);
            upDist = Math.sqrt(dX * dX + (dY-1) * (dY-1));
            downDist = Math.sqrt(dX * dX + (dY+1) * (dY+1));

            this.slap.volume = .2;
            this.grunt.volume = .2;

            this.slap.play();
            this.grunt.play();
        }
        else if (closestCurrentThreat > 0) {
            enemyX = this.game.entities[closestCurrentThreat].x;
            enemyY = this.game.entities[closestCurrentThreat].y;
            leftDist = Math.sqrt((serveX - enemyX-1) * (serveX - enemyX-1) + (serveY - enemyY) * (serveY - enemyY));
            rightDist = Math.sqrt((serveX - enemyX+1) * (serveX - enemyX+1) + (serveY - enemyY) * (serveY - enemyY));
            upDist = Math.sqrt((serveX - enemyX) * (serveX - enemyX) + (serveY - enemyY-1) * (serveY - enemyY-1));
            downDist = Math.sqrt((serveX - enemyX) * (serveX - enemyX) + (serveY - enemyY+1) * (serveY - enemyY+1));
        }

    }
    else {
        //finds distance if secretServiceWalker moves in any direction
        leftDist = Math.sqrt((dX-1) * (dX-1) + dY * dY);
        rightDist = Math.sqrt((dX+1) * (dX+1) + dY * dY);
        upDist = Math.sqrt(dX * dX + (dY-1) * (dY-1));
        downDist = Math.sqrt(dX * dX + (dY+1) * (dY+1));
    }
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
    if((currentDirDist - lowestDist) > .2) {
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
    
    if(baseDist > 30) {
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
    }
    else {
        isMoving = false;
    }

    //bullet collision against secretServiceWalker
    //get length of array
    var l = this.game.entities.length;
    //for loop to check each bullets position in relation to Trump to check for collision
    for(var i = 13; i < l; i++) {
        //getting the x and y coordinates of the bullet
        var eX = this.game.entities[i].x;
        var eY = this.game.entities[i].y;
        //getting the x and y coordinates of SecretServiceWalker
        var tX = this.game.entities[6].x;
        var tY = this.game.entities[6].y;
        //calculate distance bullet is from SecretServiceWalker
        var dX = tX - eX;
        var dY = tY - eY;
        var dist = Math.sqrt(dX * dX + dY * dY);
        //check for collison
        if(dist < 30) {
            this.grunt.volume = .2;
            this.grunt.play();
            if(Math.random() > .5) {
                this.game.entities[6].x = ((Math.random() * 2170) + 1170);
                if(Math.random() > .5) {
                    this.game.entities[6].y = ((Math.random() * 1400) + 700);
                }
                else {
                    this.game.entities[6].y = (((Math.random() * 1400) + 700)*-1);
                }
            }
            else {
                this.game.entities[6].x = (((Math.random() * 2170) + 1170)*-1);
                if(Math.random() > .5) {
                    this.game.entities[6].y = ((Math.random() * 1400) + 700);
                }
                else {
                    this.game.entities[6].y = (((Math.random() * 1400) + 700)*-1);
                }
            }
            this.game.scoreMessage.innerHTML = 'Your Secret Service took a bullet for you. They are at the hospital recovering but a replacement for him will arrive soon.';
            //this.game.entities[4].removeFromWorld = true;
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

SecretServiceWalker.prototype.draw = function (ctx) {
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
