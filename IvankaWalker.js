function IvankaWalker(game, spritesheet,  frameHeight, frameWidth, sheetWidth, x, y, frameDuration, frames, speed) {
	BasicWalker.call(this, game, spritesheet,  frameHeight, frameWidth, sheetWidth, x, y, frameDuration, frames, speed);

	this.activetimer = 50000; //this is how long she is active.

	this.entityPos = -1; //this should be updated to reflect ivanka's position in gameEngine's entities array.
							//Note that entityPos is updated in the same file that creates and adds her to entities.

	game.entities[1].ivankaActive = true; //access TrumpWalker in entities and let him know that ivanka is active.
}




IvankaWalker.prototype = Object.create(BasicWalker.prototype);




IvankaWalker.prototype.constructor = IvankaWalker;




BasicWalker.prototype.update = function () {
	//Ivanka always moves with Trump
	this.takeStepTowards(this.game.leader.x, this.game.leader.y, 100, this.game.characters);

	//reduce activetimer if the game is not paused.
	this.activetimer -= 100;

	//if activetimer is 0, find where she is in the list of entities and remove her.
	if (this.activetimer <= 0) {
		this.game.entities[1].ivankaActive = false; //access TrumpWalker in entities and let him know that ivanka is not active.
		this.game.removeEntity(this.entityPos);
	}

}
