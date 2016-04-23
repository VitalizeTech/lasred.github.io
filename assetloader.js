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
        new VoteCoin(NY, 180, 55),
        new VoteCoin(DE, 444, 80),
        new VoteCoin(RI, 68, 270),
        new VoteCoin(CT, 180, 250)];
    gameEngine.pendingVoteCoins = [
        new VoteCoin(MD, 180, 55),
        new VoteCoin(PA, 444, 80),
	    new VoteCoin(IN, 68, 270),
        new VoteCoin(NE, 180, 250)];
    gameEngine.init(ctx);
    gameEngine.start();
    gameEngine.addEntity(new Background(gameEngine));
    gameEngine.addEntity(new TrumpWalker(gameEngine, AM.getAsset("./img/Trump.png")));
    gameEngine.addEntity(new Gunman(gameEngine, AM.getAsset("./img/gunman.png")));
    gameEngine.addEntity(new BlueHair(gameEngine, AM.getAsset("./img/bluehairedgirl.png")));
})
var FLAGS = AM.getAsset("./img/flags/spritesheet.png");
