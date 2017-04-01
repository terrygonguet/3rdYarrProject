
ShooterStage.prototype.switchToMap = function () {
  this.clear();
  game.player.mode      = "map";
  this.mode             = "map";
  game.sea.visible      = false;
  this.position         = $V([100, 100]);
  this.dimensions       = $V([window.innerWidth - 200, window.innerHeight - 200]);
  this.edges            = this.position.add(this.dimensions);
  this.resizeStage();
  this.txtScore.visible = false;
  this.txtPower.visible = false;
  this.txtLives.visible = false;
  game.player.position  = this.dimensions.x(0.5);
  if (!this.worldmap) this.worldmap = new WorldMap(50,50);
  game.addChild(this.worldmap);

};

ShooterStage.prototype.switchOffMap = function () {
  game.player.mode = "level";
  game.sea.visible = true;
  game.removeChild(this.worldmap);
};
