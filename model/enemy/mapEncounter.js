/*
 * position : 2D Vector
 * radius : integer
 * sprite : ID in the LoadQueue
 */
class MapEncounter extends createjs.Bitmap {

  constructor(position, radius, sprites, callback) {
    var sprite;
    if (typeof sprites === "string")
      sprite = sprites;
    else
      sprite = sprites[randInt(0, sprites.length)];
    super(queue.getResult(sprite));
    this.on("frameTick", this.update, this);

    this.position       = position;
    this.sprite         = sprite;
    this.radius         = radius;
    this.callback       = callback;
    this.regX           = this.image.width / 2;
    this.regY           = this.image.height / 2;
    this.scaleX         = 2 * this.radius / this.image.width;
    this.scaleY         = this.scaleX;

    this.set({
      x: shooter.position.e(1) + shooter.mapOffset.e(1) + this.position.e(1),
      y: shooter.position.e(2) + shooter.mapOffset.e(2) + this.position.e(2)
    });
  }

  update (e) {
    if (this.position.distanceFrom(shooter.mapOffset.x(-1)) <= this.radius + game.player.radius) {
      this.callback.call(this);
    }

    this.set({
      x: shooter.mapOffset.e(1) + this.position.e(1) + shooter.dimensions.e(1) / 2,
      y: shooter.mapOffset.e(2) + this.position.e(2) + shooter.dimensions.e(2) / 2
    });
  }

}
