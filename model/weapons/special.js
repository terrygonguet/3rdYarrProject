/*
 * Base abstract Special class
 */

/* global shooter, game, createjs, Vector */

class Special {

    constructor () {
        var self = this;
        input.onSpecial.push(function () {
            self.trigger();
        });
    }

    trigger () {
        game.player.weapon.upgrade(0);
        game.player.dispatchEvent("special");
    }

    remove () {
        input.onSpecial.splice(input.onSpecial.indexOf(this.trigger), 1);
    }

}
