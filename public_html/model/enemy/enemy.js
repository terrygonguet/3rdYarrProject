/* 
 * Base Enemy class
 */

/* global shooter, game, createjs */

/*
 * position : 2D Vector
 * radius : number, radius of the circle hitbox
 * color [temp] : HTML color of the circle
 * health : number of hit points
 */
class Enemy extends createjs.Shape {
    
    constructor (position, radius, color, health) {
        super();
        this.position = position;
        this.radius   = radius;
        this.health   = health;
        this.color    = color;
        this.pattern  = null;
        
        this.graphics.s("#000").f(this.color).dc(0,0,this.radius);
        
        this.on("tick", this.update, this);
        
        this.set({
            x: this.position.e(1) + shooter.position.e(1),
            y: this.position.e(2) + shooter.position.e(2)
        });
    }
    
    update (e) {
        this.pattern && this.pattern.update(e);
        this.set({
            x: this.position.e(1) + shooter.position.e(1),
            y: this.position.e(2) + shooter.position.e(2)
        });
    }
    
    /*
     * playerKilled : boolean to indicate if killed by the player or removed
     *      by other means
     */
    die(playerKilled) {
        game.removeChild(this);
    }
    
    getHit (damage) {
        this.health -= damage;
        if (this.health <= 0) {
            this.die(true);
        }
    }
    
}
