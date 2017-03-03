/*
 * Level 2
*/

(function () {

  var bounds = shooter.getGameBounds();
  // Boss --------------------------------------------------------
  var boss = new Boss($V([bounds.dimensions.e(1) / 2,200]), 50, "Kraken");
  boss.invincible = 2000;

  // Phase 1 -----------------------------------------------------
  boss.addPhase(
      new Pattern(boss, function (e) {// fire
          this.timeSpiral += e.delta;
          if (this.timeSpiral >= 3000 && this.nbSpiral === 0) {
              this.nbSpiral = 50;
              this.timeSpiral = 0;
          } else if (this.timeSpiral >= 20 && this.nbSpiral > 0) {
              this.nbSpiral--;
              this.timeSpiral = 0;
              var pos = boss.position.add($V([-boss.radius - this.nbSpiral, 0]).rotate(this.nbSpiral * Math.PI / 6, Vector.Zero(2)));
              var b = new Bullet(pos, game.player.position.subtract(pos), 180, 1, 6);
              game.addChild(b);
          }

          if (this.time >= 2000) {
              this.time = 0;
              this.offset = !this.offset;
              var x = this.offset * 30;
              do {
                  var b = new Bullet($V([x, 0]), $V([0, 1]), 70, 1, 10);
                  game.addChild(b);
                  x += 70;
              } while (x < bounds.dimensions.e(1));
          }
      }, {timeSpiral: 0, nbSpiral: 0, offset: 0}),
      new Pattern(boss, function (e) {// move
          if (this.time >= this.timeout) {
              this.dest = $V([Math.floor(Math.random() * bounds.dimensions.e(1))
                  ,Math.floor(Math.random() * bounds.dimensions.e(2) / 3)]);
              this.time = 0;
          } else if (boss.position.distanceFrom(this.dest) > boss.radius) {
              var move = this.dest.subtract(boss.position).toUnitVector().x(this.speed * e.delta / 1000);
              boss.position = boss.position.add(move);
          }
      }, {speed: 200, timeout: 3000, dest: boss.position}),
      1000);

  // Phase 2 -----------------------------------------------------
  boss.addPhase(
      new Pattern(boss, function (e) {// fire
          if (!boss.incenter) return;
          this.novaTime += e.delta;
          if (this.novaTime >= 2000) {
              this.novaTime = 0;
              for (var i = 0; i < 50; i++) {
                  var dir = $V([0, 1]).rotate(i * Math.PI / 25, Vector.Zero(2));
                  game.addChild(new Bullet(boss.position, dir, 200, 1, 10));
              }
          }

          if (this.time >= 400) {
              this.time = 0;
              for (var i = 0; i < 4; i++) {
                  var dir = $V([0, 1]).rotate(i * Math.PI / 2 + this.curAngle, Vector.Zero(2));
                  game.addChild(new Bullet(boss.position, dir, 300, 1, 12));
              }
          }
          this.curAngle += e.delta / 1500;
      }, {curAngle: 0, novaTime: 0}),
      new Pattern(boss, function (e) {// move
          if (boss.position.distanceFrom(this.dest) >= 10) {
              var move = this.dest.subtract(boss.position).toUnitVector().x(200 * e.delta / 1000);
              boss.position = boss.position.add(move);
          } else
              boss.incenter = true;
      }, {dest: $V([bounds.dimensions.e(1) / 2, 250])}),
      750);

  // Phase 3 -----------------------------------------------------
  boss.addPhase(
      new Pattern(boss, function (e) {// fire
          this.burstTime += e.delta;
          if (this.burstTime >= 2000) {
              this.burstTime = 0;
              var dir = game.player.position.subtract(boss.position);
              for (var i = 0; i < 5; i++) {
                  game.addChild(new Bullet(boss.position, dir, 150 + i * 15, 1, 6))
              }
          }

          if (this.time >= 50) {
              this.time = 0;
              game.addChild(new Bullet($V([this.x, 0]), $V([0, 1]), 150, 1, 10));
              game.addChild(new Bullet($V([bounds.dimensions.e(1) - this.x, 0]), $V([0, 1]), 150, 1, 10));
              this.x += 10 * this.dir;
              if (this.x >= bounds.dimensions.e(1) / 2 - 30 || this.x <= 0) this.dir = -this.dir;
          }
      }, {x: 0, burstTime: 0, dir: 1}),
      new Pattern(boss, function (e) {// move
          if (this.time >= this.timeout) {
              this.dest = $V([Math.floor(Math.random() * bounds.dimensions.e(1))
                  ,Math.floor(Math.random() * bounds.dimensions.e(2) / 3)]);
              this.time = 0;
          } else if (boss.position.distanceFrom(this.dest) > boss.radius) {
              var move = this.dest.subtract(boss.position).toUnitVector().x(this.speed * e.delta / 1000);
              boss.position = boss.position.add(move);
          }
      }, {speed: 200, timeout: 2000, dest: boss.position}),
      750);

  shooter.addEncounter(boss, 500);
})()
