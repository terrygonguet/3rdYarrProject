/*
 * Instant clear of bullets and enemies
 */

/* global shooter, game, createjs, Vector */

class ClearSpecial extends Special {

    constructor () {
        super();
        this.cost = 0.5;
    }

    trigger() {
        if (game.player.weapon.level >= this.cost) {
            game.player.weapon.level -= this.cost;
            var childs = game.children.slice(0);
            for (var i of childs) {
                if (i instanceof Bullet && i.type == "enemy") i.die(true);
            }
        }
        super.trigger();
    }

}
