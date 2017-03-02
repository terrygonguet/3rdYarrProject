/*
 *
 */

/* global shooter, game, createjs */

class Sea extends createjs.Container {

  constructor(bounds) {
    super();
    this.left  = [];
    this.right = [];
    this.resize(bounds);
  }

  resize(bounds) {
    this.removeAllChildren();
    this.left  = [];
    this.right = [];

    this.set({
      x: bounds.position.e(1), y: bounds.position.e(2)
    });
    var y = -100;
    var side = "left";
    while (y < bounds.dimensions.e(2)) {
      var wave = new createjs.Bitmap(queue.getResult("Waves"));
      this[side].push(wave);
      wave.set({
        y: y, x: -200
      });
      this.addChild(wave);

      side = (side === "left" ? "right" : "left");
      y += 100;
    }
  }

}
