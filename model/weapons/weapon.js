/*
 * Base class for weapons
 */

/* global shooter, game, createjs */


class Weapon {

    constructor () {
        this.time  = 0;
    }

    update (e) {
        this.time += e.delta;
    }

    fire () {

    }

}
