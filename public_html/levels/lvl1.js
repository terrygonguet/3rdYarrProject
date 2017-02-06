/* 
 * Level 1
 */

(function () {
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
        1500);
    shooter.addEncounter(boss, 500);
})();