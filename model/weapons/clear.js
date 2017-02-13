/* 
 * Instant clear of bullets and enemies
 */

/* global shooter, game, createjs, Vector */

class ClearSpecial extends Special {
    
    constructor () {
        super();
        this.cost = 1;
    }
    
    trigger() {
        super.trigger();
        if (game.player.weapon.level >= this.cost) {
            game.player.weapon.level -= this.cost;
            var toDie = [];
            for (var i of game.children) {
                if (i instanceof Bullet || i instanceof Enemy) toDie.push(i);
            }
            for (var i of toDie) i.die(true);
        }
    }
    
}
