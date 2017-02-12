/* 
 * Level 2
*/

(function () {
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
                var b = new Bullet(pos, game.player.position.subtract(pos), 180, 1, 5);
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
    shooter.addEncounter(boss, 500);
})()