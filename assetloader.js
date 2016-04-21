var AM = new AssetManager();

AM.queueDownload("./img/Trump.png");
AM.queueDownload("./img/MAGABackground.png");
AM.queueDownload("./img/flags/NY.gif");
AM.queueDownload("./img/flags/CT.gif");
AM.queueDownload("./img/flags/RI.gif");
AM.queueDownload("./img/flags/DE.gif");


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
    gameEngine.activeVoteCoins = [new VoteCoin(60, 55, "New York", 95), new VoteCoin(700, 55, "Connecticut", 28),
	   new VoteCoin(60, 450, "Delaware", 16), new VoteCoin(700, 450, "Rhode Island", 19)];
    gameEngine.pendingVoteCoins = [new VoteCoin(180, 55, "Maryland", 38), new VoteCoin(444, 80, "Pennsylvania", 17),
	   new VoteCoin(68, 270, "Indiana", 57), new VoteCoin(180, 250, "Nebraska", 36)];
    gameEngine.init(ctx);
    gameEngine.start();
    gameEngine.addEntity(new Background(gameEngine));
    gameEngine.addEntity(new TrumpWalker(gameEngine, AM.getAsset("./img/Trump.png")));
})