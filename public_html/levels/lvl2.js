/* 
 * Level 2
 */

for (var i = 0; i < 10; i++) {
    shooter.addEncounter(new PathingEnemy([
        $V([0,100]),
        $V([600, 100]),
        $V([600, 300]),
        $V([0, 300])
    ], 200, 10, "#917", 1, 500), 1000 + i * 300);
}