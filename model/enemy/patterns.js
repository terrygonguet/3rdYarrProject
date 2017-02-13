/* 
 * Describes the shooting pattern of enemies to mix and match with deplacement
 */

/* global shooter, game, createjs */

/*
 * enemy : reference to the enemy
 * callback : function called every update, 'this' object is the Pattern,
 *      argument is createjs event object and this.time is auto incremented by delta
 * props : object whose properties will be added to the this object to be used in callback
 */
class Pattern {
    
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
    
}

/*
 * Shortcut for a basic "fire at the player every so often"
 * fireRate : shots/second
 * chance : [0,1[ probability to choot every update when can shoot
 * bulletProps : {position, speed, radius} if set, overrides defaults
 */
class TargetPlayerPattern extends Pattern {
    
    constructor (enemy, fireRate, chance, bulletProps = {}) {
        super(enemy, function () {
            if (this.time >= 1000 / fireRate && Math.random() < chance) {
                this.time = 0;
                var b = new Bullet(
                        bulletProps.position || enemy.position, 
                        game.player.position.subtract(enemy.position),
                        bulletProps.speed || 100, 1,
                        bulletProps.radius || 3);
                game.addChild(b);
            }
        });
    }
}