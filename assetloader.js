var AM = new AssetManager();

AM.queueDownload("./img/Trump.png");
AM.queueDownload("./img/marcoBullet.PNG");
AM.queueDownload("./img/MAGABackground.png");
AM.queueDownload("./img/flags/spritesheet.png");
AM.queueDownload("./img/CrookedHillary.png");
AM.queueDownload("./img/LyinTed.png");
AM.queueDownload("./img/Canada.PNG");
AM.queueDownload("./img/ivanka.png");
AM.queueDownload("./img/reporter.png");
AM.queueDownload("./img/Jeb_Bush.png");
AM.queueDownload("./img/cartel.png");
AM.queueDownload("./img/assassin.png");
AM.queueDownload("./img/secret_service.png");
AM.queueDownload("./img/4-4health.png");
AM.queueDownload("./img/3-4health.png");
AM.queueDownload("./img/2-4health.png");
AM.queueDownload("./img/1-4health.png");
AM.queueDownload("./img/0-4health.png");
AM.queueDownload("./img/whiteHouse.jpg");
AM.queueDownload("./img/debateRoom.jpg");
AM.queueDownload("./img/win.jpg");
AM.queueDownload("./img/rubio.png");
AM.queueDownload("./img/maga.png");
AM.queueDownload("./img/enemies.png");
AM.queueDownload("./img/pointingTrump.png");
AM.queueDownload("./img/allies.png");
AM.queueDownload("./img/womenscard.PNG");

AM.queueDownload("./img/RubioCircle.png");
AM.queueDownload("./img/CruzCircle.png");
AM.queueDownload("./img/HillaryBlue.png");
AM.queueDownload("./img/ClintonCircle.png");
AM.queueDownload("./img/CannonE1.png");
AM.queueDownload("./img/squareMid1.png");
AM.queueDownload("./img/squareMid2.png");

AM.queueDownload("./img/carson.png");
AM.queueDownload("./img/MarcoRed.png");
AM.queueDownload("./img/TedRed.png");
AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    canvas.focus();
    //2d context
    var ctx = canvas.getContext("2d");
    var gameEngine = new GameEngine();
    gameEngine.scoreBoard = document.getElementById("score");
    gameEngine.scoreMessage = document.getElementById("message");
    gameEngine.scoreType = document.getElementById("score_type");
    gameEngine.healthBar = document.getElementById("healthBar");
	gameEngine.health = document.getElementById("health");

    gameEngine.init(ctx);
    gameEngine.start();
	gameEngine.characters = [];
    gameEngine.addEntity(new Background(gameEngine));
	var trumpWalker = new TrumpWalker(gameEngine, AM.getAsset("./img/Trump.png"));
	gameEngine.characters.push(trumpWalker);
	gameEngine.leader = trumpWalker;
    gameEngine.addEntity(trumpWalker);
	var ivankaWalker = new IvankaWalker(gameEngine, AM.getAsset("./img/ivanka.png"), 49, 48.2, 3, 220, 250, 0.1, 12, 100);
	gameEngine.characters.push(ivankaWalker);
    gameEngine.addEntity(ivankaWalker);
	var reporterLocation = getRandomCoordinates(gameEngine.characters);
	var reporterWalker = new ReporterWalker(gameEngine, AM.getAsset("./img/reporter.png"), 49, 48.2, 3, reporterLocation.x, reporterLocation.y, 0.1, 12, 100);
	gameEngine.characters.push(reporterWalker);
	gameEngine.addEntity(reporterWalker);
    var benCarsonLocation = getRandomCoordinates(gameEngine.characters);
    var benCarsonWalker = new BenCarsonWalker(gameEngine, AM.getAsset("./img/carson.png"), 49, 48.2, 3, benCarsonLocation.x, benCarsonLocation.y, 0.1, 12, 100);
    gameEngine.characters.push(benCarsonWalker);
    gameEngine.addEntity(benCarsonWalker);
    var jebBushLocation = getRandomCoordinates(gameEngine.characters);
    var jebBushWalker = new JebBushWalker(gameEngine, AM.getAsset("./img/Jeb_Bush.png"), 49, 48.2, 3, jebBushLocation.x, jebBushLocation.y, 0.1, 12, 100);
    gameEngine.characters.push(jebBushWalker);
    gameEngine.addEntity(jebBushWalker);
    var secretServiceLocation = getRandomCoordinates(gameEngine.characters);
    var secretServiceWalker = new SecretServiceWalker(gameEngine, AM.getAsset("./img/secret_service.png"), 49, 48.2, 3, secretServiceLocation.x, secretServiceLocation.y, 0.1, 12, 90);
    gameEngine.characters.push(secretServiceWalker);
    gameEngine.addEntity(secretServiceWalker);
	var cartelLocation = getEnemyRandomCoordinates(gameEngine.characters);
	var cartelWalker = new CartelWalker(gameEngine, AM.getAsset("./img/cartel.png"), 49, 48.2, 3, cartelLocation.x, cartelLocation.y, 0.1, 12, 85);
    gameEngine.characters.push(cartelWalker);
	gameEngine.addEntity(cartelWalker);
    var cartelTwoLocation = getEnemyRandomCoordinates(gameEngine.characters);
    var cartelWalkerTwo = new CartelWalker(gameEngine, AM.getAsset("./img/cartel.png"), 49, 48.2, 3, cartelTwoLocation.x, cartelTwoLocation.y, 0.1, 12, 85);
    gameEngine.characters.push(cartelWalkerTwo);
    gameEngine.addEntity(cartelWalkerTwo);
    var cartelThreeLocation = getEnemyRandomCoordinates(gameEngine.characters);
    var cartelWalkerThree = new CartelWalker(gameEngine, AM.getAsset("./img/cartel.png"), 49, 48.2, 3, cartelThreeLocation.x, cartelThreeLocation.y, 0.1, 12, 85);
    gameEngine.characters.push(cartelWalkerThree);
    gameEngine.addEntity(cartelWalkerThree);
	var assassinLocation = getEnemyRandomCoordinates(gameEngine.characters);
	var assassinWalker = new AssassinWalker(gameEngine, AM.getAsset("./img/assassin.png"), 32, 48, 4, assassinLocation.x,  assassinLocation.y, 0.1, 16, 90);
	gameEngine.characters.push(assassinWalker);
	gameEngine.addEntity(assassinWalker);
    var assassinTwoLocation = getEnemyRandomCoordinates(gameEngine.characters);
    var assassinWalkerTwo = new AssassinWalker(gameEngine, AM.getAsset("./img/assassin.png"), 32, 48, 4, assassinTwoLocation.x,  assassinTwoLocation.y, 0.1, 16, 90);
    gameEngine.characters.push(assassinWalkerTwo);
    gameEngine.addEntity(assassinWalkerTwo);
    var assassinThreeLocation = getEnemyRandomCoordinates(gameEngine.characters);
    var assassinWalkerThree = new AssassinWalker(gameEngine, AM.getAsset("./img/assassin.png"), 32, 48, 4, assassinThreeLocation.x,  assassinThreeLocation.y, 0.1, 16, 90);
    gameEngine.characters.push(assassinWalkerThree);
    gameEngine.addEntity(assassinWalkerThree);

    createFlags();
    populateFlags(gameEngine);
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
        // Check against existing characters
        for (var q = 0; q < characters.length; q++) {
            if (Math.abs(acoord.x - characters[q].x) < 200 && Math.abs(acoord.y - characters[q].y) < 150) {
                goodfit = false;
            }

            //check against center enemy
            if ((acoord.x < 473 + 165 && acoord.x > 473 - 75) && (acoord.y < 236 + 120 && acoord.y > 236 - 90)){
                goodfit = false;
            }
        }
     } while (!goodfit)
    return acoord;
}

//allows enemy units to get coordinates that are not in the playable area. This will allow the enemies to enter the playable area.
function getEnemyRandomCoordinates(characters) {
    var goodfit = true;
    var acoord = new CoordPoint(0, 0);
    var xcoord = 0;
    var ycoord = 0;
    do {
        goodfit = true; //reset
        //gets random x and y coordinates that are outside the playing area
        if(Math.random() > .5) {
             xcoord = ((Math.random() * 400) + 1200);
            if(Math.random() > .5) {
               ycoord = ((Math.random() * 200) + 900);
            }
            else {
                ycoord = (((Math.random() * 200))*-1);
            }
        }
        else {
            xcoord = (((Math.random() * 400))*-1);
            if(Math.random() > .5) {
                ycoord = ((Math.random() * 200) + 900);
            }
            else {
                ycoord = (((Math.random() * 200))*-1);
            }
        }
        acoord = new CoordPoint(xcoord, ycoord);
        // Check against existing characters
        for (var q = 0; q < characters.length; q++) {
            if (Math.abs(acoord.x - characters[q].x) < 200 && Math.abs(acoord.y - characters[q].y) < 150) {
                goodfit = false;
            }
        }
    } while (!goodfit)
        return acoord;
}
