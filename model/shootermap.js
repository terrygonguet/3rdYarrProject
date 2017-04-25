
ShooterStage.prototype.switchToMap = function () {
  this.clear();
  game.player.mode      = "map";
  this.mode             = "map";
  game.sea.visible      = false;
  this.position         = $V([0, 0]);
  this.dimensions       = $V([window.innerWidth, window.innerHeight]);
  this.edges            = this.position.add(this.dimensions);
  this.resizeStage();
  this.txtScore.visible = false;
  this.txtPower.visible = false;
  this.txtLives.visible = false;
  game.player.position  = this.dimensions.x(0.5);
  if (!this.worldmap) this.worldmap = new WorldMap(100,100, 0.4);
  game.addChild(this.worldmap);
  game.addChild(this.worldmap.btnInv);
};

ShooterStage.prototype.switchOffMap = function () {
  game.player.mode = "level";
  game.sea.visible = true;
  game.removeChild(this.worldmap);
};
