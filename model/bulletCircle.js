/*
 * A circle of bullets turning and moving
 */

/*
 * position : 2D Vector
 * direction : 2D Vector - will be normalized
 * speed : number
 * nbBullets : number
 * distance : number
 * sprite : string - ID in the LoadQueue
 * angleSpeed : number - radians/second
 * bulletProps : object - to override default bullets props
 */
class BulletCircle extends createjs.Shape {

  constructor(position, direction, speed, nbBullets, distance, sprite, angleSpeed, bulletProps = {}) {
    super();
    this.position   = position;
    this.direction  = direction.toUnitVector();
    this.speed      = speed;
    this.nbBullets  = nbBullets;
    this.sprite     = sprite;
    this.distance   = distance;
    this.angleSpeed = angleSpeed;
    this.bulletProps= bulletProps;
    this.curAngle   = 0;
    this.bullets    = [];

    for (var i = 0; i < this.nbBullets; i++) {
      this.bullets.push(new Bullet(
        this.position.add(
          $V([0, this.distance]).rotate(2 * Math.PI / this.nbBullets * i, $V([0,0]))
        ), $V([0,0]), 0,
        this.bulletProps.damage || 1,
        this.bulletProps.radius || 3,
        this.bulletProps.type || "enemy",
        this.sprite
      ));
    }

    this.on("frameTick", this.update, this);
    this.on("added", function () {
      for (var i of this.bullets) game.addChild(i);
    }, this);
    this.on("removed", function () {
      for (var i of this.bullets) game.removeChild(i);
    }, this);

    this.set({
      x: shooter.position.e(1) + this.position.e(1),
      y: shooter.position.e(2) + this.position.e(2)
    });
  }

  update (e) {
    this.curAngle = (this.curAngle + this.angleSpeed * e.delta / 1000) % (2 * Math.PI);
    this.position = this.position.add(this.direction.x(this.speed * e.delta / 1000));
    for (var i = 0; i < this.nbBullets; i++) {
      this.bullets[i].position = this.position.add($V([0, this.distance]).rotate(2 * Math.PI / this.nbBullets * i + this.curAngle, $V([0,0])));
    }

    this.set({
      x: shooter.position.e(1) + this.position.e(1),
      y: shooter.position.e(2) + this.position.e(2)
    });

    for (var i of this.bullets) game.addChild(i);

    if (this.position.e(1) > shooter.dimensions.e(1) + 100 ||
        this.position.e(1) < -100 ||
        this.position.e(2) > shooter.dimensions.e(2) + 100 ||
        this.position.e(2) < -100) {
        this.die();
    }
  }

  die () {
      game.removeChild(this);
  }

}
