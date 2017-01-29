/* 
 * Level 1
 */

for (var i = 0; i < 10; i++) {
    shooter.addEncounter(new PathingEnemy([
        $V([0,100]),
        $V([200, 200]),
        $V([400, 100]),
        $V([600, 200])
    ], 200, 10, "#917", 1, 500), 1000 + i * 300);
}

shooter.addEncounter(new PathingEnemy([
        $V([0,100]),
        $V([200, 200]),
        $V([400, 100]),
        $V([600, 200])
    ], 200, 10, "#917", 5, 500), 5000);