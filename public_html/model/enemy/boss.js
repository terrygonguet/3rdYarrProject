/* 
 * A boss
 */

/* global shooter, game, createjs */

/*
 * position : 2D Vector
 * radius : number, radius of the circle hitbox
 * color [temp] : HTML color of the circle
 * health : number of hit points
 */

class Boss extends createjs.Shape {
    
    constructor (position, radius, color) {
        super();
        this.position   = position;
        this.radius     = radius;
        this.health     = 1;
        this.color      = color;
        this.phases     = [];
        this.step       = 0;
        this.invincible = false;
        
        this.graphics.s("#000").f(this.color).dc(0,0,this.radius);
        
        this.on("tick", this.update, this);
        
        this.set({
            x: this.position.e(1) + shooter.position.e(1),
            y: this.position.e(2) + shooter.position.e(2)
        });
    }
    
    update (e) {
        super.update();
        this.phases[this.step].shooting.update(e);
        this.phases[this.step].moving.update(e);
        if (this.health <= 0 && this.phases.length > this.step++) {
            this.health = this.phases[this.step].health;
        }
    }
    
    addPhase (shootingPattern, movingPattern, health) {
        this.phases.push({
            shooting: shootingPattern,
            moving: movingPattern,
            health: health
        });
        if (this.phases.length === 1) this.health = health;
    }
    
    getHit (damage) {
        if (!this.invincible) {
            this.health -= damage;
        }
    }
    
}
