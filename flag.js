function Flag(name, vote, acronym, width, height) {
    this.name = name;
    this.vote = vote;
    this.acronym = acronym;
    this.width = width;
    this.height = height;
    this.path = "./img/flags/" + acronym + ".gif";
}

var NY = new Flag("New York", 95, "NY", 384, 192);
var CT = new Flag("Connecticut", 28, "CT", 325, 256);
var DE = new Flag("Delaware", 16, "DE", 342, 256);
var RI = new Flag("Rhode Island", 19, "RI", 275, 256);