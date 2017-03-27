/*
 * Basically a menu button but better and Immersive ;)
 */

 /* global shooter, game, createjs */

class Selector extends createjs.Container {

  constructor (position, radius, color, text, callback, repeats = true, togglable = false) {
    super();
    this.position = position;
    this.radius   = radius;
    this.color    = color;
    this.callback = callback;
    this.repeats  = repeats;
    this.togglable= togglable;
    this.state    = false;
    this.rate     = 1500 / radius;
    this.filled   = 0;
    this.fired    = false;
    this.txt      = new createjs.Text(text, "15px Montserrat", (togglable ? "#E22" : "#EEE"));
    this.txtBord  = this.txt.clone();
    this.border   = new createjs.Shape(new createjs.Graphics().ss(3).s("#000").dc(0,0,radius));
    this.meter    = new createjs.Shape();

    this.meter.visible = false;
    this.txt.set({
      textAlign: "center",
      textBaseline: "middle"
    });
    this.txtBord.set({
      textAlign: "center",
      textBaseline: "middle",
      color: "#000",
      outline: 2
    });

    this.addChild(this.meter);
    this.addChild(this.border);
    this.addChild(this.txtBord);
    this.addChild(this.txt);

    // this.on("tick", this.update, this);
    this.on("frameTick", this.update, this);
  }

  update (e) {
    if (game.player.position.distanceFrom(this.position) <= this.radius) {
      this.filled += this.rate * e.delta / 1000;
    } else if (this.filled > 0) {
      this.filled -= this.rate * e.delta / 1000;
    }
    this.filled = this.filled.clamp(0, this.radius);

    this.meter.graphics.c().f(this.color).dc(0,0,this.filled);
    if (this.filled > 0)
      this.meter.visible = true;
    else if (this.repeats)
      this.fired = false;
    if (this.filled >= this.radius && !this.fired) {
      this.fired = true;
      if (this.togglable) this.state = !this.state;
      this.callback.call(this);
    }

    this.set({
      x: shooter.position.e(1) + this.position.e(1),
      y: shooter.position.e(2) + this.position.e(2)
    });
    if (this.togglable) this.txt.color = (this.state ? "#2E2" : "#E22");
  }

  die () {
    game.removeChild(this);
  }

}
