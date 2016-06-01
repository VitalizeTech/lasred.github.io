function Flag(name, vote, x, y, w, h, electorVote) {
    this.name = name;
    this.vote = vote;
    this.width = w;
    this.height = h;
    this.x = x;
    this.y = y;
	this.electorVote = electorVote;
}

function VoteCoin(flag, coords) {
    this.x = coords.x;
    this.y = coords.y;
    this.vote = flag.vote;
	this.electorVote = flag.electorVote;
    this.state = flag.name;
    this.width = flag.width;
    this.height = flag.height;
    this.flagx = flag.x;
    this.flagy = flag.y;
}

var FLAG_LIST = [];
function createFlags() {
    var flags = SPRITESHEET_TXT.split('|');
    for (var i = 0; i  < flags.length; i++) {
        var attr = flags[i].split(',');
        FLAG_LIST.push(new Flag(attr[0], attr[5], attr[1], attr[2], attr[3], attr[4], attr[6]));
    }
}

function createVoteCoin(gameEngine) {
    var i = FLAG_LIST.length;
    if (i > 0) {
        var j = Math.round(Math.random() * 100) % i;
        if (j == i) {
            j = i - 1;
        }
        var flag = FLAG_LIST.splice(j, 1)[0];
        return new VoteCoin(flag, getRandom(gameEngine));
    }
    return null;
}

/**
 * Returns a random spawn point for the flag.
 */
function getRandom(gameEngine) {
    var goodfit = true;
    var acoord = new CoordPoint(0, 0);
    var activelist = gameEngine.activeVoteCoins;
    do {
        goodfit = true; //reset
        var xcoord = Math.round(1063 * Math.random());
        var ycoord = Math.round(547 * Math.random());
        acoord = new CoordPoint(xcoord, ycoord);

        //Check against the central enemy, if the coords of this flag are where the enemy is then this is a bad fit.
        if (xcoord < 603 && xcoord > (448 - 100)) {
            if (ycoord < 366 && ycoord > (211 -50)) {
                goodfit = false;
            }
        }
        // Check against Trump's current location
        else if (((gameEngine.characters[0].x - acoord.x < 220) && (gameEngine.characters[0].x - acoord.x > 0))
                || ((acoord.x - gameEngine.characters[0].x) < 30 && (acoord.x - gameEngine.characters[0].x > 0))) {

                    if (((gameEngine.characters[0].y - acoord.y < 170) && (gameEngine.characters[0].y - acoord.y > 0))
                    || ((acoord.y - gameEngine.characters[0].x < 30) && (acoord.y - gameEngine.characters[0].x))) {

                        goodfit = false;
                    }
        } else {
            // Check against existing coins
            for (var q = 0; q < activelist.length; q++) {
                if (Math.abs(acoord.x - activelist[q].x) < 200) {
                    if (Math.abs(acoord.y - activelist[q].y) < 150) {
                        goodfit = false;
                    }
                }
            }
        }

    } while (!goodfit)

    return acoord;
}

var SPRITESHEET_TXT = "AK,0,0,384,256,28,3|AL,394,0,384,256,50,9|AR,0,266,384,256,58,6|AZ,0,532,384,256,40,11|CA,394,266,384,256,172,55|CO,394,532,384,256,37,9|CT,788,0,384,256,28,7|DE,788,266,384,256,16,3|FL,1182,0,384,256,99,29|GA,788,532,384,256,76,16|HI,1182,266,384,256,19,4|IA,1576,0,384,256,30,6|ID,1182,532,384,256,32,4|IL,1576,266,384,256,69,20|IN,1576,532,384,256,57,11|KS,0,798,384,256,40,6|KY,0,1064,384,256,46,8|LA,394,798,384,256,46,8|MA,0,1330,384,256,42,11|MD,394,1064,384,256,38,10|ME,788,798,384,256,23,4|MI,394,1330,384,256,59,16|MN,788,1064,384,256,38,10|MO,1182,798,384,256,52,10|MS,788,1330,384,256,40,6|MT,1182,1064,384,256,27,3|NC,1576,798,384,256,72,15|ND,1182,1330,384,256,28,3|NE,1576,1064,384,256,36,5|NH,1576,1330,384,256,23,5|NJ,1970,0,384,256,51,14|NM,1970,266,384,256,24,5|NV,2364,0,384,256,30,6|NY,1970,532,384,256,95,29|OH,2364,266,384,256,66,18|OK,2758,0,384,256,43,7|OR,1970,798,384,256,28,7|PA,2364,532,384,256,71,20|RI,2758,266,384,256,19,4|SC,1970,1064,384,256,50,9|SD,3152,0,384,256,29,3|TN,2364,798,384,256,58,11|TX,2758,532,384,256,155,38|UT,1970,1330,384,256,40,6|VA,3152,266,384,256,49,13|VT,2364,1064,384,256,3|WA,2758,798,384,256,44,12|WI,3152,532,384,256,42,10|WV,2364,1330,384,256,34,5|WY,2758,1064,384,256,29,3"
