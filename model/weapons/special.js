/*
 * Base abstract Special class
 */

/* global shooter, game, createjs, Vector */

class Special {

    constructor () {
        var self = this;
        this.cost       = 0;
        this.triggered  = true;
        input.onSpecial.push(function () {
            if (game.player.mode == "level") self.trigger();
        });
    }

    trigger () {
      this.triggered = inventory.level >= this.cost;
      inventory.deltaPower(-this.cost);
      game.player.dispatchEvent("special");
    }

    remove () {
        input.onSpecial.splice(input.onSpecial.indexOf(this.trigger), 1);
    }

}
