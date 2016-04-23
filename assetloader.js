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
    gameEngine.activeVoteCoins = [
        new VoteCoin(NY, 180, 55),
        new VoteCoin(DE, 444, 80),
        new VoteCoin(RI, 68, 270),
        new VoteCoin(CT, 180, 250)];
    gameEngine.pendingVoteCoins = [
        //new VoteCoin(180, 55, "Maryland", 38, AM.getAsset("./img/flags/NY.gif")),
        //new VoteCoin(444, 80, "Pennsylvania", 17, AM.getAsset("./img/flags/NY.gif")),
	    //new VoteCoin(68, 270, "Indiana", 57, AM.getAsset("./img/flags/NY.gif")),
        //new VoteCoin(180, 250, "Nebraska", 36, AM.getAsset("./img/flags/NY.gif"))];
    ];
    gameEngine.init(ctx);
    gameEngine.start();
    gameEngine.addEntity(new Background(gameEngine));
    gameEngine.addEntity(new TrumpWalker(gameEngine, AM.getAsset("./img/Trump.png")));
})