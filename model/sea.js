/*
 *
 */

/* global shooter, game, createjs */

class Sea extends createjs.Container {

  constructor(bounds) {
    super();
    this.speed      = 0;
    this.side       = 1;
    this.angle      = 0;
    this.angleSpeed = 0.07;
    this.rollRadius = 5;
    this.bounds     = bounds;
    this.resize(bounds);
    this.on("frameTick", this.update, this);
  }

  resize(bounds) {
    this.removeAllChildren();
    this.bounds = bounds;
    this.set({
      x: bounds.position.e(1), y: bounds.position.e(2)
    });
    var y = -200;
    var side = -this.side;
    while (y < bounds.dimensions.e(2)) {
      var x = -100 + side * 25;
      while (x < bounds.dimensions.e(1) + 100) {
        var wave = new createjs.Bitmap(queue.getResult("Wave"));
        wave.side = side;
        wave.set({
          x: x, baseX: x,
          y: y, baseY: y,
          side: side
        });
        this.addChild(wave);

        x += wave.image.width - 3;
      }
      side = -side;
      y += 100;
    }
  }

  update (e) {
    var addOne = true;
    var toDelete = null;
    for (var wave of this.children) {
      wave.baseY += this.speed * e.delta / 1000;
      if (addOne && wave.y < -100) addOne = false;
      else if (wave.add > this.bounds.dimensions.e(2))
        toDelete = wave;

      wave.set({
        x: wave.baseX + wave.side * Math.cos(this.angle) * this.rollRadius,
        y: wave.baseY + wave.side * Math.sin(this.angle) * this.rollRadius
      });
      this.angle = (this.angle + this.angleSpeed * e.delta / 1000) % (2 * Math.PI);
    }
    toDelete && this.removeChild(toDelete);
    if (addOne) {
      var x = -100 + this.side * 25;
      while (x < this.bounds.dimensions.e(1) + 100) {
        var wave = new createjs.Bitmap(queue.getResult("Wave"));
        wave.set({
          x: x, baseX: x,
          y: -200, baseY: -200,
          side: this.side
        });
        this.addChildAt(wave, 0);
        x += wave.image.width - 3;
      }
      this.side = -this.side;
    }
  }

}
