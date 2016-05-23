function TrumpWalker(game, spritesheet) {
    this.animation = new Animation(spritesheet, 49, 48.2, 3, 0.10, 12, true, 1);
    this.game = game;
    this.direction = 0;
    this.ctx = game.ctx;
    this.x = 100;
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
    } if (this.game.right && !this.game.left) {
        this.x = this.canMove(2) ? this.nextPosition(2) : this.x;
        this.direction = 2;
        isMoving = true;
    } if (this.game.left && !this.game.right) {
        this.x = this.canMove(1) ? this.nextPosition(1) : this.x;
        this.direction = 1;
        isMoving = true;
    }
    
    //Assassin, Cartel and Bullet collison for Trump
    //get length of array
    var l = this.game.entities.length;
    //for loop to check each bullets position in relation to Trump to check for collision
    for(var i = 5; i < l; i++) {
        //getting the x and y coordinates of the bullet
        var eX = this.game.entities[i].x;
        var eY = this.game.entities[i].y;
        //getting the x and y coordinates of TrumpWalker
        var tX = this.game.entities[1].x;
        var tY = this.game.entities[1].y;
        //calculate distance bullet is from TrumpWalker
        var dX = tX - eX;
        var dY = tY - eY;
        var dist = Math.sqrt(dX * dX + dY * dY);
        //check for collison
        if(dist < 20) {
            //if the collision is a bullet remove it from the world
            if(i > 6) {
                this.game.entities[i].removeFromWorld = true;
            }
            //if the collision is the assassin or the cartel move them off the playable area
            if(i < 7) {
                if(Math.random() > .5) {
                    this.game.entities[i].x = ((Math.random() * 2170) + 1400);
                    if(Math.random() > .5) {
                        this.game.entities[i].y = ((Math.random() * 1400) + 900);
                    }
                    else {
                        this.game.entities[i].y = (((Math.random() * 1400) + 900)*-1);
                    }
                }
                else {
                    this.game.entities[i].x = (((Math.random() * 2170) + 1400)*-1);
                    if(Math.random() > .5) {
                        this.game.entities[i].y = ((Math.random() * 1400) + 900);
                    }
                    else {
                        this.game.entities[i].y = (((Math.random() * 1400) + 900)*-1);
                    }
                }
            }
        }
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
                this.game.scoreBoard.innerHTML = Math.round((parseInt(voteCoin.vote) * this.game.ivankaBoost * this.game.reporterBoost)) + parseInt(this.game.scoreBoard.innerHTML);
                if (this.game.scoreBoard.innerHTML >= 270) { //270
                    if (this.game.scoreType.innerHTML == "Electors") {
                        this.game.scoreMessage.innerHTML = this.game.scoreMessage.innerHTML = 'You won the presidential election!';
                        for(var k = 0; k < this.game.entities.length; k++) {
                            this.game.entities[k].removeFromWorld = true;
                            console.log("removing entity " + k);
                        }
                        //this.game.entities.splice(1, (this.game.entities.length));
                        document.body.style.backgroundImage = "url('./img/win.jpg')";
                        document.body.style.backgroundRepeat = "no-repeat";
                        //this.game.entities[0].image = AM.getAsset("./img/win.jpg");
                        //console.log("# of entities: " + this.game.entities.length);
                        
                        
                    }
                }
                if (this.game.scoreBoard.innerHTML >= 1237) { //1237
                    if (this.game.scoreType.innerHTML == "Delegates") {
                        this.game.scoreMessage.innerHTML = this.game.scoreMessage.innerHTML = 'You won the Republican nomination!';
                        this.game.scoreType.innerHTML = this.game.scoreType.innerHTML = 'Electors';
                        this.game.scoreBoard.innerHTML = 0;
                        this.game.entities[0].image = AM.getAsset("./img/whiteHouse.jpg");
                    }
                }
                var toAddVoteCoin = createVoteCoin(this.game);
                if (toAddVoteCoin != null) {
                    this.game.activeVoteCoins.push(toAddVoteCoin);
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
};

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
