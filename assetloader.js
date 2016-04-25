

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandom(min1, max1, min2, max2) {
    xcoord = Math.round(Math.random() * (max1 - min1) + min1);
    ycoord = Math.round(Math.random() * (max2 - min2) + min2);
    xy = new CoordPoint(xcoord, ycoord);
    console.log(xcoord);
    return xy;
}




var AM = new AssetManager();

AM.queueDownload("./img/Trump.png");
AM.queueDownload("./img/gunman.png");
AM.queueDownload("./img/bluehairedgirl.png");
AM.queueDownload("./img/MAGABackground.png");
AM.queueDownload("./img/flags/spritesheet.png");


AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    canvas.focus();
    var score = document.getElementById("score");
    var message = document.getElementById("message");
    var voteType = document.getElementById("score_type");
    //2d context 
    var ctx = canvas.getContext("2d");
    var gameEngine = new GameEngine();
    gameEngine.scoreBoard = score;
    gameEngine.scoreMessage = message;
    gameEngine.scoreType = voteType;
    gameEngine.activeVoteCoins = [
        new VoteCoin(NY, getRandom(0, 200, 0, 150)),
        new VoteCoin(DE, getRandom(0, 200, 300, 450)),
        new VoteCoin(RI, getRandom(400, 600, 0, 150)),
        new VoteCoin(CT, getRandom(400, 600, 400, 450))];
    gameEngine.pendingVoteCoins = [
        new VoteCoin(MD, getRandom(0,1,0,1)),
        new VoteCoin(PA, getRandom(0,1,0,1)),
	    new VoteCoin(IN, getRandom(0,1,0,1)),
        new VoteCoin(NE, getRandom(0,1,0,1))];
    gameEngine.init(ctx);
    gameEngine.start();
    gameEngine.addEntity(new Background(gameEngine));
    gameEngine.addEntity(new TrumpWalker(gameEngine, AM.getAsset("./img/Trump.png")));
    gameEngine.addEntity(new Gunman(gameEngine, AM.getAsset("./img/gunman.png")));
    gameEngine.addEntity(new BlueHair(gameEngine, AM.getAsset("./img/bluehairedgirl.png")));
})
var FLAGS = AM.getAsset("./img/flags/spritesheet.png");
