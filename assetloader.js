var AM = new AssetManager();

AM.queueDownload("./img/Trump.png");
AM.queueDownload("./img/MAGABackground.png");
AM.queueDownload("./img/flags/spritesheet.png");
AM.queueDownload("./img/CrookedHillary.png");
AM.queueDownload("./img/LyinTed.png");
AM.queueDownload("./img/Canada.png");
AM.queueDownload("./img/ivanka.png");
AM.queueDownload("./img/reporter.png");
AM.queueDownload("./img/cartel.png");
AM.queueDownload("./img/assassin.png");
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
	gameEngine.characters = [];
    gameEngine.addEntity(new Background(gameEngine));
	var trumpWalker = new TrumpWalker(gameEngine, AM.getAsset("./img/Trump.png"));
	gameEngine.characters.push(trumpWalker);
	gameEngine.leader = trumpWalker;
    gameEngine.addEntity(trumpWalker);
	var ivankaWalker = new IvankaWalker(gameEngine, AM.getAsset("./img/ivanka.png"), 32, 50, 3, 220, 250, 0.1, 4, 100);
    ivankaWalker.entityPos = gameEngine.entities.length;
	gameEngine.characters.push(ivankaWalker);
    gameEngine.addEntity(ivankaWalker);
	var reporterLocation = getRandomCoordinates(gameEngine.characters);
	var reporterWalker = new ReporterWalker(gameEngine, AM.getAsset("./img/reporter.png"), 175, 150, 11, reporterLocation.x, reporterLocation.y, 0.5, 100, 70);
	gameEngine.characters.push(reporterWalker);
	gameEngine.addEntity(reporterWalker);
	var cartelLocation = getRandomCoordinates(gameEngine.characters);
	var cartelWalker = new CartelWalker(gameEngine, AM.getAsset("./img/cartel.png"), 75, 190, 4, cartelLocation.x, cartelLocation.y, 0.5, 100, 70);
	gameEngine.addEntity(cartelWalker);
	var assassinLocation = getRandomCoordinates(gameEngine.characters);
	var assassinWalker = new AssassinWalker(gameEngine, AM.getAsset("./img/assassin.png"), 33, 48, 4, assassinLocation.x,  assassinLocation.y, 0.1, 4, 100);
	gameEngine.characters.push(assassinWalker);
	gameEngine.addEntity(assassinWalker);
    var firstBullet = new Bullet(gameEngine, AM.getAsset("./img/Canada.png"), gameEngine.entities[0].degree);
    firstBullet.entityPos = gameEngine.entities.length;
	gameEngine.addEntity(firstBullet);
})
var FLAGS = AM.getAsset("./img/flags/spritesheet.png");
function getRandomCoordinates(characters) {
    var goodfit = true;
    var acoord = new CoordPoint(0, 0);
    do {
        goodfit = true; //reset
        var xcoord = Math.round(Math.random() * 1040);
        var ycoord = Math.round(Math.random() * 560);
        acoord = new CoordPoint(xcoord, ycoord);
        // Check against existing coins
        for (var q = 0; q < characters.length; q++) {
            if (Math.abs(acoord.x - characters[q].x) < 200 && Math.abs(acoord.y - characters[q].y) < 150) {
                    goodfit = false;
            }
        }
     } while (!goodfit)
    return acoord;
}
