﻿function Flag(name, vote, acronym, x, y) {
    this.name = name;
    this.vote = vote;
    this.acronym = acronym;
    this.width = 384;
    this.height = 256;
    this.x = x;
    this.y = y;
}

function VoteCoin(flag, x, y) {
    this.x = x;
    this.y = y;
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
var AK = new Flag("Alaska", 1, "AK", 0, 0);
var AL = new Flag("Alabama", 1, "AL", 394, 0);
var AR = new Flag("Arkansas", 1, "AR", 0, 266);
var AZ = new Flag("Arizona", 1, "AZ", 0, 532);
var CA = new Flag("California", 1, "CA", 394, 266);
var CO = new Flag("Colorado", 1, "CO", 394, 532);
var FL = new Flag("Florida", 1, "FL", 1182, 0);
var GA = new Flag("Georgia", 1, "GA", 788, 532);
var HI = new Flag("Hawaii", 1, "HI", 1182, 266);
var IA = new Flag("Iowa", 1, "IA", 1576, 0);
var ID = new Flag("Idaho", 1, "ID", 1182, 532);
var IL = new Flag("Illinois", 1, "IL", 1576, 266);
var IN = new Flag("Indiana", 57, "IN", 1576, 532);
var KS = new Flag("Kansas", 1, "KS", 0, 798);
var KY = new Flag("Kentucky", 1, "KY", 0, 1064);
var LA = new Flag("Louisiana", 1, "LA", 394, 798);
var MA = new Flag("Massachusetts", 1, "MA", 0, 1330);
var MD = new Flag("Maryland", 38, "MD", 394, 798);
var ME = new Flag("Maine", 1, "ME", 788, 798);
var MI = new Flag("Michigan", 1, "MI", 394, 1330);
var MN = new Flag("Minnesota", 1, "MN", 788, 1064);
var MO = new Flag("Missouri", 1, "MO", 1182, 798);
var MS = new Flag("Mississippi", 1, "MS", 788, 1064);
var MT = new Flag("Montana", 1, "MT", 1182, 1064);
var NC = new Flag("North Carolina", 1, "NC", 1576, 798);
var ND = new Flag("North Dakota", 1, "ND", 1182, 1330);
var NE = new Flag("Nebraska", 36, "NE", 1576, 1064);
var NH = new Flag("North Hampshire", 1, "NH", 1576, 1330);
var NJ = new Flag("New Jersey", 1, "NJ", 1970, 0);
var NM = new Flag("New Mexico", 1, "NM", 1970, 266);
var NV = new Flag("Nevada", 1, "NV", 2364, 0);
var OH = new Flag("Ohio", 1, "OH", 2364, 266);
var OK = new Flag("Oklahoma", 1, "OK", 2758, 0);
var OR = new Flag("Oregon", 1, "OR", 1970, 798);
var PA = new Flag("Pennsylvania", 17, "PA", 2364, 532);
var SC = new Flag("South Carolina", 1, "SC", 1970, 798);
var SD = new Flag("South Dakota", 1, "SD", 3152, 0);
var TN = new Flag("Tennessee", 1, "TN", 2364, 798);
var TX = new Flag("Texas", 1, "TX", 2758, 532);
var UT = new Flag("Utah", 1, "UT", 1970, 1064);
var VA = new Flag("Virginia", 1, "VA", 3152, 266);
var VT = new Flag("Vermont", 1, "VT", 2364, 1064);
var WA = new Flag("Washington", 1, "WA", 2758, 798);
var WI = new Flag("Wisconsin", 1, "WI", 3152, 532);
var WV = new Flag("West Virginia", 1, "WV", 2364, 1330);
var WY = new Flag("Wyoming", 1, "WY", 2758, 1064);