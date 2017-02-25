/*
 * Base class for weapons
 */

/* global shooter, game, createjs */


class Weapon {

    constructor () {
        this.time  = 0;
        this.level = 0;
    }

    update (e) {
        this.time += e.delta;
    }

    fire () {

    }

    upgrade (val) {
        if (this.level === 3) {
            shooter.score += 200 * val;
        } else {
            this.level = (this.level + val).clamp(0,3).roundPres(2);
        }
    }

}
