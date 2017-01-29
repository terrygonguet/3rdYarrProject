/* 
 * Base abstract Special class
 */

/* global shooter, game, createjs, Vector */

class Special {
    
    constructor () {
        input.onSpecial.push(this.trigger);
    }
    
    trigger () {
        game.player.weapon.upgrade(0);
    }
    
    remove () {
        input.onSpecial.splice(input.onSpecial.indexOf(this.trigger), 1);
    }
    
}
