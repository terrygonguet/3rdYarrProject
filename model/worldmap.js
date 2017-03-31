
ShooterStage.prototype.switchToMap = function () {
  this.clear();
  game.player.mode = "map";
  this.mode = "map";
  game && (game.sea.visible = false);
  this.position   = $V([100, 100]);
  this.dimensions = $V([window.innerWidth - 200, window.innerHeight - 200]);
  this.edges      = this.position.add(this.dimensions);
  this.resizeStage();
  this.txtScore.visible = false;
  this.txtPower.visible = false;
  this.txtLives.visible = false;
  game.player.position = this.dimensions.x(0.5);

  var square = new createjs.Shape(new createjs.Graphics().s("#000").ss(3).r(-100,-100,200,200));
  square.on("frameTick", function () {
    square.set({
      x: this.position.e(1) + this.dimensions.e(1) / 2 + this.mapOffset.e(1),
      y: this.position.e(2) + this.dimensions.e(2) / 2 + this.mapOffset.e(2),
      die: function () {
        game.removeChild(square);
      }
    });
  }, this);
  square.set({
    x: this.position.e(1) + this.dimensions.e(1) / 2,
    y: this.position.e(2) + this.dimensions.e(2) / 2
  });
  game.addChild(square);
};

ShooterStage.prototype.switchOffMap = function () {
  game.player.mode = "level";
  game.sea.visible = true;
};
