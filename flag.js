function Flag(name, vote, acronym, x, y) {
    this.name = name;
    this.vote = vote;
    this.acronym = acronym;
    this.width = 384;
    this.height = 256;
    this.x = x;
    this.y = y;
}

function VoteCoin(flag, coords) {
    this.x = coords.x;
    this.y = coords.y;
    this.vote = flag.vote;
    this.state = flag.name;
    this.width = flag.width;
    this.height = flag.height;
    this.flagx = flag.x;
    this.flagy = flag.y;
}

var NY = new Flag("New York", 95, "NY", 1970, 532);
var CT = new Flag("Connecticut", 28, "CT", 788, 0);
var DE = new Flag("Delaware", 16, "DE", 788, 266);
var RI = new Flag("Rhode Island", 19, "RI", 2758, 266);

var AK = new Flag("Alaska", 28, "AK", 0, 0);
var AL = new Flag("Alabama", 50, "AL", 394, 0);
var AR = new Flag("Arkansas", 40, "AR", 0, 266);
var AZ = new Flag("Arizona", 58, "AZ", 0, 532);
var CA = new Flag("California", 172, "CA", 394, 266);
var CO = new Flag("Colorado", 37, "CO", 394, 532);
var FL = new Flag("Florida", 99, "FL", 1182, 0);
var GA = new Flag("Georgia", 76, "GA", 788, 532);
var HI = new Flag("Hawaii", 19, "HI", 1182, 266);
var IA = new Flag("Iowa", 30, "IA", 1576, 0);
var ID = new Flag("Idaho", 32, "ID", 1182, 532);
var IL = new Flag("Illinois", 69, "IL", 1576, 266);
var IN = new Flag("Indiana", 57, "IN", 1576, 532);
var KS = new Flag("Kansas", 40, "KS", 0, 798);
var KY = new Flag("Kentucky", 46, "KY", 0, 1064);
var LA = new Flag("Louisiana", 46, "LA", 394, 798);
var MA = new Flag("Massachusetts", 42, "MA", 0, 1330);
var MD = new Flag("Maryland", 38, "MD", 394, 798);
var ME = new Flag("Maine", 23, "ME", 788, 798);
var MI = new Flag("Michigan", 59, "MI", 394, 1330);
var MN = new Flag("Minnesota", 38, "MN", 788, 1064);
var MO = new Flag("Missouri", 52, "MO", 1182, 798);
var MS = new Flag("Mississippi", 40, "MS", 788, 1064);
var MT = new Flag("Montana", 27, "MT", 1182, 1064);
var NC = new Flag("North Carolina", 72, "NC", 1576, 798);
var ND = new Flag("North Dakota", 28, "ND", 1182, 1330);
var NE = new Flag("Nebraska", 36, "NE", 1576, 1064);
var NH = new Flag("North Hampshire", 23, "NH", 1576, 1330);
var NJ = new Flag("New Jersey", 51, "NJ", 1970, 0);
var NM = new Flag("New Mexico", 24, "NM", 1970, 266);
var NV = new Flag("Nevada", 30, "NV", 2364, 0);
var OH = new Flag("Ohio", 66, "OH", 2364, 266);
var OK = new Flag("Oklahoma", 43, "OK", 2758, 0);
var OR = new Flag("Oregon", 28, "OR", 1970, 798);
var PA = new Flag("Pennsylvania", 71, "PA", 2364, 532);
var SC = new Flag("South Carolina", 50, "SC", 1970, 798);
var SD = new Flag("South Dakota", 29, "SD", 3152, 0);
var TN = new Flag("Tennessee", 58, "TN", 2364, 798);
var TX = new Flag("Texas", 155, "TX", 2758, 532);
var UT = new Flag("Utah", 40, "UT", 1970, 1064);
var VA = new Flag("Virginia", 49, "VA", 3152, 266);
var VT = new Flag("Vermont", 16, "VT", 2364, 1064);
var WA = new Flag("Washington", 44, "WA", 2758, 798);
var WI = new Flag("Wisconsin", 42, "WI", 3152, 532);
var WV = new Flag("West Virginia", 34, "WV", 2364, 1330);
var WY = new Flag("Wyoming", 29, "WY", 2758, 1064);
