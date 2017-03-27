
ShooterStage.prototype.switchToMap = function () {
  this.clear();
  this.mode = "map";
  game && (game.sea.visible = false);
  this.position   = $V([100, 100]);
  this.dimensions = $V([window.innerWidth - 200, window.innerHeight - 200]);
  this.edges      = this.position.add(this.dimensions);
  this.resizeStage();
  this.txtScore.visible = false;
  this.txtPower.visible = false;
  this.txtLives.visible = false;
  game.player.mode = "map";
};

ShooterStage.prototype.switchOffMap = function () {
  game.player.mode = "level";
  game.sea.visible = true;
};
