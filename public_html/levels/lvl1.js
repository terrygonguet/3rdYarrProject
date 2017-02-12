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
            {position: $V([(i > 3 ? shooter.dimensions.e(1) + 10 : -10), 140]), speed:0}
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
    shooter.addEncounter(dude, time);
    time += dude.getTotalTime();
    
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
    shooter.addEncounter(dude, time);
    time += dude.getTotalTime() + 1000;
    
    for (var i = 0; i < 3; i++) {
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
    
    dude = new SmoothCriminal($V([-10, 100]), 17, "#469", 25);
    dude.addPoint($V([shooter.dimensions.e(1) / 2, 100]), 150);
    dude.addPoint($V([shooter.dimensions.e(1) / 2, 200]), 150);
    dude.addPoint($V([shooter.dimensions.e(1) / 2, 100]), 150);
    dude.addPoint($V([shooter.dimensions.e(1) / 2, 200]), 150);
    dude.addPoint($V([shooter.dimensions.e(1) / 2, 100]), 150);
    dude.addPoint($V([shooter.dimensions.e(1) + 10, 100]), 150);
    shooter.addEncounter(dude, time);
    
    dude = new SmoothCriminal($V([shooter.dimensions.e(1) + 10, 200]), 17, "#469", 25);
    dude.addPoint($V([shooter.dimensions.e(1) / 2, 200]), 150);
    dude.addPoint($V([shooter.dimensions.e(1) / 2, 100]), 150);
    dude.addPoint($V([shooter.dimensions.e(1) / 2, 200]), 150);
    dude.addPoint($V([shooter.dimensions.e(1) / 2, 100]), 150);
    dude.addPoint($V([shooter.dimensions.e(1) / 2, 200]), 150);
    dude.addPoint($V([-10, 200]), 150);
    shooter.addEncounter(dude, time);
    time += dude.getTotalTime() + 2000;
    
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
    
    
    var boss = new Boss($V([100,100]), 20, "#FF7B0F");
    boss.addPhase(
        new TargetPlayerPattern(boss, 0.5, 1, {radius: 10}),
        new Pattern(boss, function (e) {
            if (this.enemy.position.distanceFrom(this.dest) <= this.enemy.radius / 2) {
                this.dest = (this.dest.eql($V([100,100])) ? $V([500,100]) : $V([100,100]));
            }
            var dir = this.dest.subtract(this.enemy.position).toUnitVector().x(e.delta / 1000 * this.speed);
            this.enemy.position = this.enemy.position.add(dir);
        }, {dest: $V([500,100]), speed:100}),
        500);
        
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
    shooter.addEncounter(boss, time);

    console.log(time);
})();