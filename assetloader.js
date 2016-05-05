

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandom(min1, max1, min2, max2) {
    xcoord = Math.round(Math.random() * (max1 - min1) + min1);
    ycoord = Math.round(Math.random() * (max2 - min2) + min2);
    xy = new CoordPoint(xcoord, ycoord);
    console.log(xcoord, ycoord);
    return xy;
}




var AM = new AssetManager();

AM.queueDownload("./img/Trump.png");
AM.queueDownload("./img/gunman.png");
AM.queueDownload("./img/bluehairedgirl.png");
AM.queueDownload("./img/MAGABackground.png");
AM.queueDownload("./img/flags/spritesheet.png");
AM.queueDownload("./img/CrookedHillary.png");
AM.queueDownload("./img/LyinTed.png");
AM.queueDownload("./img/Canada.png");

AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    canvas.focus();
    //2d context 
    var ctx = canvas.getContext("2d");
    var gameEngine = new GameEngine();
    gameEngine.scoreBoard = document.getElementById("score");
    gameEngine.scoreMessage = document.getElementById("message");
    gameEngine.scoreType = document.getElementById("score_type");
    gameEngine.activeVoteCoins = [
        new VoteCoin(NY, getRandom(0, 200, 0, 150)),
        new VoteCoin(DE, getRandom(0, 200, 300, 450)),
        new VoteCoin(RI, getRandom(400, 600, 0, 150)),
        new VoteCoin(CT, getRandom(400, 600, 400, 450))];
    gameEngine.pendingVoteCoins = [
        new VoteCoin(MD, getRandom(0,1,0,1)),
        new VoteCoin(PA, getRandom(0,1,0,1)),
	    new VoteCoin(IN, getRandom(0,1,0,1)),
        new VoteCoin(NE, getRandom(0,1,0,1)),

        new VoteCoin(AK, getRandom(0,1,0,1)),
        new VoteCoin(AL, getRandom(0,1,0,1)),
	    new VoteCoin(AR, getRandom(0,1,0,1)),
        new VoteCoin(AZ, getRandom(0,1,0,1)),
        new VoteCoin(CA, getRandom(0,1,0,1)),
        new VoteCoin(CO, getRandom(0,1,0,1)),
	    new VoteCoin(FL, getRandom(0,1,0,1)),
        new VoteCoin(GA, getRandom(0,1,0,1)),
        new VoteCoin(HI, getRandom(0,1,0,1)),
	    new VoteCoin(IA, getRandom(0,1,0,1)),
        new VoteCoin(ID, getRandom(0,1,0,1)),
        new VoteCoin(IL, getRandom(0,1,0,1)),
	    new VoteCoin(IN, getRandom(0,1,0,1)),
        new VoteCoin(KS, getRandom(0,1,0,1)),
        new VoteCoin(KY, getRandom(0,1,0,1)),
	    new VoteCoin(LA, getRandom(0,1,0,1)),
        new VoteCoin(MA, getRandom(0,1,0,1)),
        new VoteCoin(MD, getRandom(0,1,0,1)),
	    new VoteCoin(ME, getRandom(0,1,0,1))
    ];
    gameEngine.init(ctx);
    gameEngine.start();
    gameEngine.addEntity(new Background(gameEngine));
    gameEngine.addEntity(new TrumpWalker(gameEngine, AM.getAsset("./img/Trump.png")));
    gameEngine.addEntity(new Gunman(gameEngine, AM.getAsset("./img/gunman.png")));
    gameEngine.addEntity(new BlueHair(gameEngine, AM.getAsset("./img/bluehairedgirl.png")));
	gameEngine.addEntity(new Bullet(gameEngine, AM.getAsset("./img/Canada.png")))
})
var FLAGS = AM.getAsset("./img/flags/spritesheet.png");
