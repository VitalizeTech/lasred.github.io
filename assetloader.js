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
    createFlags();
    gameEngine.activeVoteCoins = [];
    gameEngine.activeVoteCoins.push(createVoteCoin(gameEngine));
    gameEngine.activeVoteCoins.push(createVoteCoin(gameEngine));
    gameEngine.activeVoteCoins.push(createVoteCoin(gameEngine));
    gameEngine.activeVoteCoins.push(createVoteCoin(gameEngine));
    gameEngine.init(ctx);
    gameEngine.start();
    gameEngine.addEntity(new Background(gameEngine));
    gameEngine.addEntity(new TrumpWalker(gameEngine, AM.getAsset("./img/Trump.png")));
    gameEngine.addEntity(new Gunman(gameEngine, AM.getAsset("./img/gunman.png")));
    gameEngine.addEntity(new BlueHair(gameEngine, AM.getAsset("./img/bluehairedgirl.png")));
	gameEngine.addEntity(new Bullet(gameEngine, AM.getAsset("./img/Canada.png")))
})
var FLAGS = AM.getAsset("./img/flags/spritesheet.png");
