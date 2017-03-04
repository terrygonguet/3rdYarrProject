/*
 * Level 2
*/

(function () {

  function fireSpinnyBall() {
    var ball = new BulletCircle(
      boss.position.dup(), game.player.position.subtract(boss.position), 400, 10, 30, "Green Bullet", 3,
      {radius: 7}
    );
    game.addChild(ball);
    ball = new BulletCircle(
      boss.position.dup(), game.player.position.subtract(boss.position), 400, 8, 20, "Blue Bullet", -3,
      {radius: 7}
    );
    game.addChild(ball);
    ball = new BulletCircle(
      boss.position.dup(), game.player.position.subtract(boss.position), 400, 5, 10, "Red Bullet", 4,
      {radius: 7}
    );
    game.addChild(ball);
  }

  var bounds = shooter.getGameBounds();
  // Boss --------------------------------------------------------
  var boss = new Boss($V([bounds.dimensions.e(1) / 2,100]), 100, "Kraken");
  boss.invincible = 2000;

  // Phase 1 -----------------------------------------------------
  boss.addPhase(
      new Pattern(boss, function (e) {// fire
        if (!this.circle) {
          this.circle = [
            new BulletCircle(
              boss.position.dup(), $V([0,0]), 0, 15, bounds.dimensions.e(2) * 1.5, "Green Bullet", 0.7,
              {radius: 13}
            ),
            new BulletCircle(
              boss.position.dup(), $V([0,0]), 0, 15, bounds.dimensions.e(2) * 1.5, "Red Bullet", -0.7,
              {radius: 13}
            )];
            for (var i of this.circle) game.addChild(i);
        }
        if (this.time >= 1000) {
          fireSpinnyBall();
          this.time = 0;
        }

        this.spinnyTime += (e.delta * this.dir) / 15;
        for (var i of this.circle) i.distance = this.spinnyTime;
        if (this.spinnyTime >=  bounds.dimensions.e(2) * 1.1)
          this.dir = -1;
        else if (this.spinnyTime <= 250)
          this.dir = 1;

      }, {circle: null, spinnyTime:  bounds.dimensions.e(2) * 1.5, dir: -1}),
      new Pattern(boss, function (e) {// move
          // boss.position = boss.position.add($V([(this.left ? -this.speed : this.speed) * e.delta / 1000, 0]));
          // if (boss.position.e(1) > bounds.dimensions.e(1) - 100)
          //   this.left = true;
          // else if (boss.position.e(1) < 100)
          //   this.left = false;
      }, {left: true, speed: 100}),
      1000);

  // Phase 2 -----------------------------------------------------
  boss.addPhase(
      new Pattern(boss, function (e) {// fire

      }, {}),
      new Pattern(boss, function (e) {// move

      }, {}),
      1000);

  // Phase 3 -----------------------------------------------------
  boss.addPhase(
      new Pattern(boss, function (e) {// fire

      }, {}),
      new Pattern(boss, function (e) {// move

      }, {}),
      1000);

  // Phase 4 -----------------------------------------------------
  boss.addPhase(
      new Pattern(boss, function (e) {// fire

      }, {}),
      new Pattern(boss, function (e) {// move

      }, {}),
      1000);

  // Phase 5 -----------------------------------------------------
  boss.addPhase(
      new Pattern(boss, function (e) {// fire

      }, {}),
      new Pattern(boss, function (e) {// move

      }, {}),
      1000);

  shooter.addEncounter(boss, 1000);
})()
