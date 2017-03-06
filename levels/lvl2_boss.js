/*
 * Level 2
*/

(function () {

  var bounds = shooter.getGameBounds();
  shooter.addEncounter(function () {
    game.sea.speed = 25;
  }, 0);

  // Boss --------------------------------------------------------
  var boss = new Boss($V([bounds.dimensions.e(1) / 2,100]), 100, "Crab");
  boss.invincible = 2000;

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
  // Phase 1 -----------------------------------------------------
  boss.addPhase(
      new Pattern(boss, function (e) {// fire
        if (!this.barrier) {
          this.barrier = [
            new BulletCircle(
              boss.position.dup(), $V([0,0]), 0, 20, bounds.dimensions.e(2) * 1.5, "Green Bullet", 1.2,
              {radius: 13}
            ),
            new BulletCircle(
              boss.position.dup(), $V([0,0]), 0, 20, bounds.dimensions.e(2) * 1.5, "Red Bullet", -1.2,
              {radius: 13}
            )];
            for (var i of this.barrier) game.addChild(i);
        }

        if (!this.circle) {
          this.circle = new BulletCircle(
            boss.position.dup(), $V([0,0]), 0, 15, 100, "Green Bullet", 1,
            {radius: 10}
          );
          game.addChild(this.circle);
        }

        if (this.time >= 1000) {
          fireSpinnyBall();
          this.time = 0;
        }

        this.spinnyTime += (e.delta * this.dir) / 15;
        for (var i of this.barrier) i.distance = this.spinnyTime;
        if (this.spinnyTime >=  bounds.dimensions.e(2) * 1.1)
          this.dir = -1;
        else if (this.spinnyTime <= 250)
          this.dir = 1;

      }, {circle: null, barrier: null, spinnyTime:  bounds.dimensions.e(2) * 1.5, dir: -1}),
      new Pattern(boss, function (e) {// move

      }, {left: true, speed: 100}),
      1400);

  // Phase 2 -----------------------------------------------------
  var rushing = "wait";
  function fireArrow (position, direction, speed) {
    var base = new BulletCircle(position.dup(), direction, speed, 10, 20, "Red Bullet", 0, {radius: 7});
    game.addChild(base);
    for (var i = 0; i < 5; i++) {
      var b = new Bullet(
        position.add(
          $V([(5-i)*4, i*8]).rotate(
            direction.angleFrom($V([0,1])) * Math.sign(position.e(1) - game.player.position.e(1)),
            $V([0,0])
          )
        ), direction, speed, 1, 7, "enemy", "Red Bullet")
      game.addChild(b);
      b = new Bullet(
        position.add(
          $V([-(5-i)*4, i*8]).rotate(
            direction.angleFrom($V([0,1])) * Math.sign(position.e(1) - game.player.position.e(1)),
            $V([0,0])
          )
        ), direction, speed, 1, 7, "enemy", "Red Bullet")
      game.addChild(b);
    }
  }
  boss.addPhase(
      new Pattern(boss, function (e) {// fire
        if (!this.circle) {
          this.circle = new BulletCircle(
            boss.position.dup(), $V([0,0]), 0, 15, 100, "Green Bullet", 1,
            {radius: 10}
          );
          game.addChild(this.circle);
        } else
          this.circle.position = boss.position.dup();

        if (rushing === "rush" && this.time > 70) {
          this.time = 0;
          var b = new BulletCircle(boss.position.dup().subtract($([0,-50])), $V([1,0.5]), 200, 10, 30, "Blue Bullet", 1, {radius: 7});
          game.addChild(b);
          b = new BulletCircle(boss.position.dup().subtract($([0,-50])), $V([-1,0.5]), 200, 10, 30, "Blue Bullet", -1, {radius: 7});
          game.addChild(b);
        }

        this.arrowTime += e.delta;
        if (this.arrowTime > 700 && !this.first) {
          fireArrow(bounds.dimensions, game.player.position.subtract(bounds.dimensions), 450);
          this.first = true;
        } else if (this.arrowTime > 1400) {
          fireArrow($V([0, bounds.dimensions.e(2)]), game.player.position.subtract($V([0, bounds.dimensions.e(2)])), 450);
          this.arrowTime = 0;
          this.first = false;
        }
      }, {arrowTime: 0, first: false, circle: null}),
      new Pattern(boss, function (e) {// move
        if (rushing === "wait" && this.time >= 7000) {
          rushing = "rush";
        } else if (rushing === "rush") {
          boss.position = boss.position.add($V([0,1]).x(this.speed * e.delta / 1000));
          if (boss.position.e(2) > bounds.dimensions.e(2) * 0.7) rushing = "back";
        } else if (rushing === "back") {
          boss.position = boss.position.add($V([0,-1]).x(this.speed * e.delta / 3000));
          if (boss.position.e(2) < 100) {
            rushing = "wait";
            this.time = 0;
          }
        }
      }, {speed: 350}),
      1400);

  // Phase 3 -----------------------------------------------------
  boss.addPhase(
      new Pattern(boss, function (e) {// fire
        if (!this.circle) {
          this.circle = new BulletCircle(
            boss.position.dup(), $V([0,0]), 0, 15, 100, "Green Bullet", 1,
            {radius: 10}
          );
          game.addChild(this.circle);
        } else
          this.circle.position = boss.position.dup();

        if (!this.prison) {
          this.prison = new BulletCircle(
            bounds.dimensions.x(0.5), $V([0,0]), 70, 30, this.size, "Red Bullet", -1,
            {radius: 12}
          );
          game.addChild(this.prison);
        } else {
          var move = this.next.subtract(this.prison.position);
          this.prison.direction = move.toUnitVector();
          if (move.modulus() < 70 * e.delta / 1000) {
            this.next = $V([
              randInt(50, bounds.dimensions.e(1)-50),
              randInt(bounds.dimensions.e(2)/3, bounds.dimensions.e(2)-50)
            ]);
          }
        }

        if (game.player.position.distanceFrom(this.prison.position) > this.size) {
          this.dir = 2;
        } else if (this.size < 50) {
          this.dir = 1;
        } else if (this.size > 150) {
          this.dir = -1;
        }
        this.size += this.dir * e.delta / 20;
        this.prison.distance = this.size;

        if (this.time > 1500) {
          this.time = 0;
          for (var i=0; i<5; i++) {
            game.addChild(new Bullet(boss.position, game.player.position.subtract(boss.position),
              350 + 10 * i, 1, 5, "enemy", "Blue Bullet"));
          }
        }
      }, {circle: null, prison: null, size: 500, dir: -1, next: bounds.dimensions.x(0.5)}),
      new Pattern(boss, function (e) {// move
        if (boss.position.e(1) < 100)
          this.dir = 1;
        else if (boss.position.e(1) > bounds.dimensions.e(1) - 100)
          this.dir = -1;
        boss.position = boss.position.add($V([this.speed,0]).x(this.dir * e.delta / 1000));
      }, {dir: 1, speed: 100}),
      1000);

  function fireDart(position, direction, nbBullets) {
    game.addChild(
      new Bullet(
        position,
        direction,
        350, 1, 5, "enemy", "Blue Bullet"
      )
    );
    if (nbBullets > 1)
      setTimeout(function () {
        fireDart(position, direction, nbBullets-1);
      }, 50);
  }
  // Phase 4 -----------------------------------------------------
  boss.addPhase(
      new Pattern(boss, function (e) {// fire
        if (!this.prison) {
          this.prison = new BulletCircle(
            $V([bounds.dimensions.e(1) / 2, bounds.dimensions.e(2) * 0.7]),
            $V([0,0]), 0, 30, bounds.dimensions.e(1), "Green Bullet", 2,
            {radius: 10}
          );
          game.addChild(this.prison);
        } else {
          if (this.prison.distance < 50)
            this.dir = 5;
          else if (this.prison.distance > bounds.dimensions.e(1) / 2.1)
            this.dir = -20;
          this.prison.distance += this.dir * e.delta / 1000;
        }

        if (this.time > 500) {
          this.time = 0;
          fireDart(boss.position,
            game.player.position.subtract(boss.position).rotate(randFloat(-0.3, 0.3), $([0,0])), 10);
        }
      }, {prison: null, dir: -50}),
      new Pattern(boss, function (e) {// move
        if (boss.position.distanceFrom(this.pos[this.step]) > e.delta * 0.15) {
          boss.position = boss.position.add(
            this.pos[this.step].subtract(boss.position).toUnitVector().x(e.delta * 0.15)
          );
          this.time = 0;
        }
        if (this.time > this.pause) {
          this.step = (this.step + 1) % this.pos.length;
          this.time = 0;
        }
      }, {step: 1, pause: 3500, pos: [
        $V([bounds.dimensions.e(1)/2, 100]),
        $V([bounds.dimensions.e(1)/4, 200]),
        $V([3*bounds.dimensions.e(1)/4, 200])
      ]}),
      1400);

  shooter.addEncounter(boss, 2000);
})()
