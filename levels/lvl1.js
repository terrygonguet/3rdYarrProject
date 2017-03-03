/*
 * Level 1
 */

/* global shooter, game, createjs */

(function () {
    var time = 2000;
    var bounds = shooter.getGameBounds();
    function bigdudeFire (e) {
      if (this.time >= this.delay) {
        this.time = 0;
        var dir = game.player.position.subtract(this.enemy.position);
        for (var i = 0; i < 5; i++) {
            var b = new Bullet(this.enemy.position, dir, 150 + i * 15, 1, 6);
            game.addChild(b);
        }
      }
    }

    var dude = null;
    for (var i = 0; i < 6; i++) {
        var x = (i + 1) * bounds.dimensions.e(1) / 8;
        dude = new PathingEnemy([
            {position: $V([x, -10]), speed:100},
            {position: $V([x, 150]), speed:0.3},
            {position: $V([x, 149]), speed:150},
            {position: $V([-10, 140]), speed:0}
        ], 20, "Meduse", 1, 100);
        shooter.addEncounter(dude, time);
        time += 500;
    }
    time += 1000 + dude.getTotalTime();





    for (var i = 0; i < 5; i++) {
        dude = new SmoothCriminal($V([bounds.dimensions.e(1) / 5, -10]), 20, "Meduse", 1, 100);
        dude.addPoint($V([bounds.dimensions.e(1) / 5, 200]), 200);
        dude.addPoint($V([bounds.dimensions.e(1) / 5 + 100, 300]), 200);
        dude.addPoint($V([bounds.dimensions.e(1) / 5 + 200, 300]), 50);
        dude.addPoint($V([bounds.dimensions.e(1) + 10, 300]), 220);
        dude.pattern = new TargetPlayerPattern(dude, 0.5, 0.05, {radius:7});
        time += 500;
        shooter.addEncounter(dude, time);
    }
    time += 500;
    dude = new PathingEnemy([
        {position: $V([4 * bounds.dimensions.e(1) / 5, -10]), speed: 180},
        {position: $V([4 * bounds.dimensions.e(1) / 5, 200]), speed: 0.3},
        {position: $V([4 * bounds.dimensions.e(1) / 5, 201]), speed: 200},
        {position: $V([bounds.dimensions.e(1) + 10, 190]), speed: 0}
    ], 30, "Calamar", 25, 500);
    dude.drop = makeDropFunc(1, 0.5);
    dude.pattern = new Pattern(dude, bigdudeFire, {delay: 2000});
    shooter.addEncounter(dude, time);
    time += dude.getTotalTime() - 1000;





    for (var i = 0; i < 5; i++) {
        dude = new SmoothCriminal($V([4 * bounds.dimensions.e(1) / 5, -10]), 20, "Meduse", 1);
        dude.addPoint($V([4 * bounds.dimensions.e(1) / 5, 200]), 200);
        dude.addPoint($V([4 * bounds.dimensions.e(1) / 5 - 100, 300]), 200);
        dude.addPoint($V([4 * bounds.dimensions.e(1) / 5 - 200, 300]), 50);
        dude.addPoint($V([-10, 300]), 220);
        dude.pattern = new TargetPlayerPattern(dude, 0.5, 0.05, {radius:7});
        time += 500;
        shooter.addEncounter(dude, time);
    }
    time +=500;
    dude = new PathingEnemy([
        {position: $V([bounds.dimensions.e(1) / 5, -10]), speed: 180},
        {position: $V([bounds.dimensions.e(1) / 5, 200]), speed: 0.3},
        {position: $V([bounds.dimensions.e(1) / 5, 201]), speed: 200},
        {position: $V([-10, 190]), speed: 0}
    ], 30, "Calamar", 25, 500);
    dude.drop = makeDropFunc(1, 0.5);
    dude.pattern = new Pattern(dude, bigdudeFire, {delay: 2000});
    shooter.addEncounter(dude, time);
    time += dude.getTotalTime();





    for (var i = 0; i < 5; i++) {
        for (var j = 1; j <= 5; j++) {
            var x = (j + (i % 2) / 2) * bounds.dimensions.e(1) / 6;
            dude = new PathingEnemy([
                {position: $V([x, -10]), speed: 170},
                {position: $V([x, 120]), speed: 50},
                {position: $V([x, 300]), speed: 170},
                {position: $V([x, -10]), speed: 0}
            ], 20, "Meduse", 1);
            dude.pattern = new TargetPlayerPattern(dude, 1, 0.007, {radius:7});
            shooter.addEncounter(dude, time);
        }
        time += 700;
    }
    time += dude.getTotalTime();






    dude = new SmoothCriminal($V([-10, 100]), 30, "Calamar", 25, 500);
    dude.addPoint($V([bounds.dimensions.e(1) / 2, 100]), 150);
    dude.addPoint($V([bounds.dimensions.e(1) / 2, 300]), 150);
    dude.addPoint($V([bounds.dimensions.e(1) / 2, 100]), 150);
    dude.addPoint($V([bounds.dimensions.e(1) / 2, 300]), 150);
    dude.addPoint($V([bounds.dimensions.e(1) / 2, 100]), 150);
    dude.addPoint($V([bounds.dimensions.e(1) + 10, 100]), 150);
    dude.drop = makeDropFunc(1, 0.5);
    dude.pattern = new Pattern(dude, bigdudeFire, {delay: 2000});
    shooter.addEncounter(dude, time);

    dude = new SmoothCriminal($V([bounds.dimensions.e(1) + 10, 300]), 30, "Calamar", 25, 500);
    dude.addPoint($V([bounds.dimensions.e(1) / 2, 300]), 150);
    dude.addPoint($V([bounds.dimensions.e(1) / 2, 100]), 150);
    dude.addPoint($V([bounds.dimensions.e(1) / 2, 300]), 150);
    dude.addPoint($V([bounds.dimensions.e(1) / 2, 100]), 150);
    dude.addPoint($V([bounds.dimensions.e(1) / 2, 300]), 150);
    dude.addPoint($V([-10, 300]), 150);
    dude.drop = makeDropFunc(1, 0.5);
    dude.pattern = new Pattern(dude, bigdudeFire, {delay: 2000});
    shooter.addEncounter(dude, time);
    time += dude.getTotalTime();







    for (var i = 0; i < 15; i++) {
        dude = new SmoothCriminal($V([-10, 100]), 20, "Meduse", 1);
        dude.addPoint($V([bounds.dimensions.e(1) - 200, 100]), 150);
        dude.addPoint($V([bounds.dimensions.e(1) - 200, 300]), 150);
        dude.addPoint($V([-10, 300]), 150);
        dude.pattern = new TargetPlayerPattern(dude, 1, 0.007, {radius:7});
        shooter.addEncounter(dude, time);
        dude = new SmoothCriminal($V([bounds.dimensions.e(1) + 10, 400]), 20, "Meduse", 1);
        dude.addPoint($V([200, 400]), 150);
        dude.addPoint($V([200, 600]), 150);
        dude.addPoint($V([bounds.dimensions.e(1) + 10, 600]), 150);
        dude.pattern = new TargetPlayerPattern(dude, 1, 0.007, {radius:7});
        shooter.addEncounter(dude, time);
        time += 400;
    }
    time += dude.getTotalTime() - 1000;






    for (var i = 0; i < 8; i++) {
        var startpos = $V([(i % 2 ? -10 : bounds.dimensions.e(1) + 10), 2 * bounds.dimensions.e(2) / 3 - i * bounds.dimensions.e(2) / 12]);
        dude = new SmoothCriminal(startpos, 20, "Meduse", 1);
        dude.addPoint(startpos.add($V([(i % 2 ? 1 : -1), 1])), 150);
        dude.addPoint($V([bounds.dimensions.e(1) / 2, startpos.e(2)]), 150);
        dude.addPoint($V([bounds.dimensions.e(1) / 2, -10]), 150);
        dude.pattern = new TargetPlayerPattern(dude, 1, 0.007, {radius:7});
        shooter.addEncounter(dude, time);
        time += 300;
    }
    time += dude.getTotalTime();

    dude = new SmoothCriminal($V([-10, bounds.dimensions.e(2) + 10]), 30, "Calamar", 25, 500);
    dude.addPoint($V([0, bounds.dimensions.e(2)]), 150);
    dude.addPoint($V([0, 0]), 150);
    dude.addPoint($V([-10, -10]), 150);
    dude.drop = makeDropFunc(1, 0.5);
    dude.pattern = new Pattern(dude, bigdudeFire, {delay: 2000});
    shooter.addEncounter(dude, time);

    dude = new SmoothCriminal($V([bounds.dimensions.e(1) + 10, bounds.dimensions.e(2) + 10]), 30, "Calamar", 25, 500);
    dude.addPoint($V([bounds.dimensions.e(1), bounds.dimensions.e(2)]), 150);
    dude.addPoint($V([bounds.dimensions.e(1), 0]), 150);
    dude.addPoint($V([bounds.dimensions.e(1) + 10, -10]), 150);
    dude.drop = makeDropFunc(1, 0.5);
    dude.pattern = new Pattern(dude, bigdudeFire, {delay: 2000});
    shooter.addEncounter(dude, time);
    time += dude.getTotalTime() + 2500;




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

    shooter.addEncounter(boss, time);

    console.log(time);
})();
