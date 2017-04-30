
ShooterStage.prototype.switchToMap = function () {
  this.clear();
  game.player.mode      = "map";
  this.mode             = "map";
  this.encounters       = [];
  this.nextLevel        = "";
  createjs.Ticker.paused= false;
  // game.sea.visible      = false;
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

  if (game && !game.shownHint && this.worldmap.done) {
    game.shownHint = true;
    var txt = new createjs.Text("In game : Hold W to fire, X to use shield. Shifth to slow down\nShield costs 0.5 power. Enemies drop Points and Power.\nArrows to move in map.", "25px Montserrat", "#FFF");
    var txtBord = txt.clone();
    txt.set({
      textAlign: "center",
      textBaseline: "middle",
      x: window.innerWidth / 2,
      y: window.innerHeight / 3,
      time: 0
    });
    txtBord.set({
      textAlign: "center",
      textBaseline: "middle",
      color: "#000",
      outline: 2,
      x: window.innerWidth / 2,
      y: window.innerHeight / 3,
      time: 0
    });
    game && game.addChild(txt);
    game && game.addChild(txtBord);
    function disolve(e) {
      if (this.time >= 10000) {
        if (this.alpha <= 0) { game.removeChild(this); }
        else { this.alpha -= e.delta / 5000; }
      }
      this.time += e.delta;
    }
    txt.on("frameTick", disolve, txt);
    txtBord.on("frameTick", disolve, txtBord);
  }
};

ShooterStage.prototype.switchOffMap = function () {
  game.player.mode = "level";
  // game.sea.visible = true;
  game.removeChild(this.worldmap);
  game.removeChild(this.worldmap.btnInv);
};
