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
  // boss.addPhase(
  //     new Pattern(boss, function (e) {// fire
  //       if (!this.circle) {
  //         this.circle = [
  //           new BulletCircle(
  //             boss.position.dup(), $V([0,0]), 0, 15, bounds.dimensions.e(2) * 1.5, "Green Bullet", 0.7,
  //             {radius: 13}
  //           ),
  //           new BulletCircle(
  //             boss.position.dup(), $V([0,0]), 0, 15, bounds.dimensions.e(2) * 1.5, "Red Bullet", -0.7,
  //             {radius: 13}
  //           )];
  //           for (var i of this.circle) game.addChild(i);
  //       }
  //       if (this.time >= 1000) {
  //         fireSpinnyBall();
  //         this.time = 0;
  //       }
  //
  //       this.spinnyTime += (e.delta * this.dir) / 15;
  //       for (var i of this.circle) i.distance = this.spinnyTime;
  //       if (this.spinnyTime >=  bounds.dimensions.e(2) * 1.1)
  //         this.dir = -1;
  //       else if (this.spinnyTime <= 250)
  //         this.dir = 1;
  //
  //     }, {circle: null, spinnyTime:  bounds.dimensions.e(2) * 1.5, dir: -1}),
  //     new Pattern(boss, function (e) {// move
  //
  //     }, {left: true, speed: 100}),
  //     1700);
  //
  // // Phase 2 -----------------------------------------------------
  // var rushing = "wait";
  // function fireArrow (position, direction, speed) {
  //   var base = new BulletCircle(position.dup(), direction, speed, 10, 20, "Red Bullet", 0, {radius: 7});
  //   game.addChild(base);
  //   for (var i = 0; i < 5; i++) {
  //     var b = new Bullet(
  //       position.add(
  //         $V([(5-i)*4, i*8]).rotate(
  //           direction.angleFrom($V([0,1])) * Math.sign(position.e(1) - game.player.position.e(1)),
  //           $V([0,0])
  //         )
  //       ), direction, speed, 1, 7, "enemy", "Red Bullet")
  //     game.addChild(b);
  //     b = new Bullet(
  //       position.add(
  //         $V([-(5-i)*4, i*8]).rotate(
  //           direction.angleFrom($V([0,1])) * Math.sign(position.e(1) - game.player.position.e(1)),
  //           $V([0,0])
  //         )
  //       ), direction, speed, 1, 7, "enemy", "Red Bullet")
  //     game.addChild(b);
  //   }
  // }
  // boss.addPhase(
  //     new Pattern(boss, function (e) {// fire
  //       if (!this.circle) {
  //         this.circle = new BulletCircle(
  //           boss.position.dup(), $V([0,0]), 0, 15, 100, "Green Bullet", 1,
  //           {radius: 10}
  //         );
  //         game.addChild(this.circle);
  //       } else
  //         this.circle.position = boss.position.dup();
  //
  //       if (rushing === "rush" && this.time > 70) {
  //         this.time = 0;
  //         var b = new BulletCircle(boss.position.dup().subtract($([0,-50])), $V([1,0.5]), 200, 10, 30, "Blue Bullet", 1, {radius: 7});
  //         game.addChild(b);
  //         b = new BulletCircle(boss.position.dup().subtract($([0,-50])), $V([-1,0.5]), 200, 10, 30, "Blue Bullet", -1, {radius: 7});
  //         game.addChild(b);
  //       }
  //
  //       this.arrowTime += e.delta;
  //       if (this.arrowTime > 1000 && !this.first) {
  //         fireArrow(bounds.dimensions, game.player.position.subtract(bounds.dimensions), 450);
  //         this.first = true;
  //       } else if (this.arrowTime > 2000) {
  //         fireArrow($V([0, bounds.dimensions.e(2)]), game.player.position.subtract($V([0, bounds.dimensions.e(2)])), 450);
  //         this.arrowTime = 0;
  //         this.first = false;
  //       }
  //     }, {arrowTime: 0, first: false, circle: null}),
  //     new Pattern(boss, function (e) {// move
  //       if (rushing === "wait" && this.time >= 7000) {
  //         rushing = "rush";
  //       } else if (rushing === "rush") {
  //         boss.position = boss.position.add($V([0,1]).x(this.speed * e.delta / 1000));
  //         if (boss.position.e(2) > bounds.dimensions.e(2) * 0.7) rushing = "back";
  //       } else if (rushing === "back") {
  //         boss.position = boss.position.add($V([0,-1]).x(this.speed * e.delta / 3000));
  //         if (boss.position.e(2) < 100) {
  //           rushing = "wait";
  //           this.time = 0;
  //         }
  //       }
  //     }, {speed: 350}),
  //     2000);

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

      }, {circle: null, prison: null, size: 500, dir: -1, next: bounds.dimensions.x(0.5)}),
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
