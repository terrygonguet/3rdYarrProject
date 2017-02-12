/* 
 * Level 1
 */

/* global shooter, game, createjs */

(function () {
    var time = 2000;
    
    var dude = null;
    for (var i = 0; i < 6; i++) {
        var x = (i + 1) * shooter.dimensions.e(1) / 8;
        dude = new PathingEnemy([
            {position: $V([x, -10]), speed:100},
            {position: $V([x, 150]), speed:0.3},
            {position: $V([x, 149]), speed:150},
            {position: $V([(i >= 3 ? shooter.dimensions.e(1) + 10 : -10), 140]), speed:0}
        ], 10, "#189", 1, 100);
        shooter.addEncounter(dude, time);
        time += 500;
    }
    time += 1000 + dude.getTotalTime();
    
    for (var i = 0; i < 5; i++) {
        dude = new SmoothCriminal($V([shooter.dimensions.e(1) / 5, -10]), 10, "#189", 1, 100);
        dude.addPoint($V([shooter.dimensions.e(1) / 5, 200]), 200);
        dude.addPoint($V([shooter.dimensions.e(1) / 5 + 100, 300]), 200);
        dude.addPoint($V([shooter.dimensions.e(1) / 5 + 200, 300]), 50);
        dude.addPoint($V([shooter.dimensions.e(1) + 10, 300]), 220);
        time += 500;
        shooter.addEncounter(dude, time);
    }
    time += 500;
    dude = new PathingEnemy([
        {position: $V([4 * shooter.dimensions.e(1) / 5, -10]), speed: 180},
        {position: $V([4 * shooter.dimensions.e(1) / 5, 200]), speed: 0.3},
        {position: $V([4 * shooter.dimensions.e(1) / 5, 201]), speed: 200},
        {position: $V([shooter.dimensions.e(1) + 10, 190]), speed: 0}
    ], 17, "#469", 25, 500);
    dude.drop = makeDropFunc(1, 0.5);
    shooter.addEncounter(dude, time);
    time += dude.getTotalTime() - 1000;
    
    for (var i = 0; i < 5; i++) {
        dude = new SmoothCriminal($V([4 * shooter.dimensions.e(1) / 5, -10]), 10, "#189", 1);
        dude.addPoint($V([4 * shooter.dimensions.e(1) / 5, 200]), 200);
        dude.addPoint($V([4 * shooter.dimensions.e(1) / 5 - 100, 300]), 200);
        dude.addPoint($V([4 * shooter.dimensions.e(1) / 5 - 200, 300]), 50);
        dude.addPoint($V([-10, 300]), 220);
        time += 500;
        shooter.addEncounter(dude, time);
    }
    time +=500;
    dude = new PathingEnemy([
        {position: $V([shooter.dimensions.e(1) / 5, -10]), speed: 180},
        {position: $V([shooter.dimensions.e(1) / 5, 200]), speed: 0.3},
        {position: $V([shooter.dimensions.e(1) / 5, 201]), speed: 200},
        {position: $V([-10, 190]), speed: 0}
    ], 17, "#469", 25, 500);
    dude.drop = makeDropFunc(1, 0.5);
    shooter.addEncounter(dude, time);
    time += dude.getTotalTime();
    
    for (var i = 0; i < 5; i++) {
        for (var j = 1; j <= 5; j++) {
            var x = (j + (i % 2) / 2) * shooter.dimensions.e(1) / 6;
            dude = new PathingEnemy([
                {position: $V([x, -10]), speed: 170},
                {position: $V([x, 120]), speed: 50},
                {position: $V([x, 300]), speed: 170},
                {position: $V([x, -10]), speed: 0}
            ], 10, "#924", 1);
            shooter.addEncounter(dude, time);
        }
        time += 700;
    }
    time += dude.getTotalTime();
    
    dude = new SmoothCriminal($V([-10, 100]), 17, "#469", 25, 500);
    dude.addPoint($V([shooter.dimensions.e(1) / 2, 100]), 150);
    dude.addPoint($V([shooter.dimensions.e(1) / 2, 200]), 150);
    dude.addPoint($V([shooter.dimensions.e(1) / 2, 100]), 150);
    dude.addPoint($V([shooter.dimensions.e(1) / 2, 200]), 150);
    dude.addPoint($V([shooter.dimensions.e(1) / 2, 100]), 150);
    dude.addPoint($V([shooter.dimensions.e(1) + 10, 100]), 150);
    dude.drop = makeDropFunc(1, 0.5);
    shooter.addEncounter(dude, time);
    
    dude = new SmoothCriminal($V([shooter.dimensions.e(1) + 10, 200]), 17, "#469", 25, 500);
    dude.addPoint($V([shooter.dimensions.e(1) / 2, 200]), 150);
    dude.addPoint($V([shooter.dimensions.e(1) / 2, 100]), 150);
    dude.addPoint($V([shooter.dimensions.e(1) / 2, 200]), 150);
    dude.addPoint($V([shooter.dimensions.e(1) / 2, 100]), 150);
    dude.addPoint($V([shooter.dimensions.e(1) / 2, 200]), 150);
    dude.addPoint($V([-10, 200]), 150);
    dude.drop = makeDropFunc(1, 0.5);
    shooter.addEncounter(dude, time);
    time += dude.getTotalTime();
    
    for (var i = 0; i < 15; i++) {
        dude = new SmoothCriminal($V([-10, 100]), 10, "#924", 1);
        dude.addPoint($V([shooter.dimensions.e(1) - 200, 100]), 150);
        dude.addPoint($V([shooter.dimensions.e(1) - 200, 300]), 150);
        dude.addPoint($V([-10, 300]), 150);
        shooter.addEncounter(dude, time);
        dude = new SmoothCriminal($V([shooter.dimensions.e(1) + 10, 400]), 10, "#924", 1);
        dude.addPoint($V([200, 400]), 150);
        dude.addPoint($V([200, 600]), 150);
        dude.addPoint($V([shooter.dimensions.e(1) + 10, 600]), 150);
        shooter.addEncounter(dude, time);
        time += 200;
    }
    
    for (var i = 0; i < 8; i++) {
        var startpos = $V([(i % 2 ? -10 : shooter.dimensions.e(1) + 10), 2 * shooter.dimensions.e(2) / 3 - i * shooter.dimensions.e(2) / 12]);
        dude = new SmoothCriminal(startpos, 10, "#924", 1);
        dude.addPoint(startpos.add($V([(i % 2 ? 1 : -1), 1])), 150);
        dude.addPoint($V([shooter.dimensions.e(1) / 2, startpos.e(2)]), 150);
        dude.addPoint($V([shooter.dimensions.e(1) / 2, -10]), 150);
        shooter.addEncounter(dude, time);
        time += 300;
    }
    time += dude.getTotalTime() + 3000;
    
    // Boss --------------------------------------------------------
    var boss = new Boss($V([Math.floor(Math.random() * shooter.dimensions.e(1))
        ,Math.floor(Math.random() * shooter.dimensions.e(2) / 3)]), 20, "#FF7B0F");
    
    // Phase 1 -----------------------------------------------------
    boss.addPhase(
        new Pattern(boss, function (e) {
            this.timeSpiral += e.delta;
            if (this.timeSpiral >= 3000 && this.nbSpiral === 0) {
                this.nbSpiral = 50;
                this.timeSpiral = 0;
            } else if (this.timeSpiral >= 20 && this.nbSpiral > 0) {
                this.nbSpiral--;
                this.timeSpiral = 0;
                var pos = boss.position.add($V([-boss.radius, 0]).rotate(this.nbSpiral * Math.PI / 6, Vector.Zero(2)));
                var b = new Bullet(pos, game.player.subtract(pos), 135);
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
                } while (x < shooter.dimensions.e(1));
            }
        }, {timeSpiral: 0, nbSpiral: 0, offset: 0}),
        new Pattern(boss, function (e) {
            if (this.time >= this.timeout) {
                this.dest = $V([Math.floor(Math.random() * shooter.dimensions.e(1))
                    ,Math.floor(Math.random() * shooter.dimensions.e(2) / 3)]);
                this.time = 0;
            } else if (boss.position.distanceFrom(this.dest) > boss.radius) {
                var move = this.dest.subtract(boss.position).toUnitVector().x(this.speed * e.delta / 1000);
                boss.position = boss.position.add(move);
            }
        }, {speed: 200, timeout: 3000, dest: boss.position}),
        500);
    
    // Phase 2 -----------------------------------------------------
    boss.addPhase(
        new TargetPlayerPattern(boss, 1, 0.01, {radius: 10}),
        new Pattern(boss, function (e) {
            if (this.enemy.position.distanceFrom(this.dests[this.step]) <= this.enemy.radius / 2) {
                this.step++;
                if (this.step >= this.dests.length) this.step = 0;
            }
            var dir = this.dests[this.step].subtract(this.enemy.position).toUnitVector().x(e.delta / 1000 * this.speed);
            this.enemy.position = this.enemy.position.add(dir);
        }, {dests: [$V([500,100]), $V([100,100]), $V([300,300])], speed:100, step: 0}),
        500);
        
    // Phase 3 -----------------------------------------------------
    shooter.addEncounter(boss, time);

    console.log(time);
})();