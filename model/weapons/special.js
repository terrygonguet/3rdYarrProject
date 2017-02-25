/*
 * Base abstract Special class
 */

/* global shooter, game, createjs, Vector */

class Special {

    constructor () {
        var self = this;
        input.onSpecial.push(function () {
            self.trigger();
            console.log(game.player.weapon.level);
        });
    }

    trigger () {
        game.player.weapon.upgrade(0);
    }

    remove () {
        input.onSpecial.splice(input.onSpecial.indexOf(this.trigger), 1);
    }

}
