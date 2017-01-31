/* 
 * Describes the shooting pattern of enemies to mix and match with deplacement
 */

/* global shooter, game, createjs */

class ShootingPattern {
    
    constructor (enemy, callback = null, props = {}) {
        this.enemy    = enemy;
        this.callback = callback;
        this.time     = 0;
        for (var i in props) {
            this[i] = props[i];
        }
    }
    
    update (e) {
        this.time += e.delta;
        this.callback && this.callback.call(this, e);
    }
    
    dup() {
        var ret = new ShootingPattern(null);
        for (var i in this) {
            ret[i] = this[i];
        }
        return ret;
    }
    
}
