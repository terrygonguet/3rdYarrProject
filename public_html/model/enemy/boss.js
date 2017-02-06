/* 
 * A boss
 */

/* global shooter, game, createjs */

/*
 * position : 2D Vector
 * radius : number, radius of the circle hitbox
 * color [temp] : HTML color of the circle
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
        this.invincible = 0;
        this.lifemeter  = new createjs.Text("-", "20px Verdana", "#000");
        
        this.graphics.s("#000").f(this.color).dc(0,0,this.radius);
        
        this.on("added", function () {
            game.addChild(this.lifemeter);
        }, this); 
        this.on("removed", function () {
            game.removeChild(this.lifemeter);
        }, this); 
        this.lifemeter.set({
            x: shooter.position.e(1),
            y: shooter.position.e(2)
        });
        
        this.on("tick", this.update, this);
        
        this.set({
            x: this.position.e(1) + shooter.position.e(1),
            y: this.position.e(2) + shooter.position.e(2)
        });
    }
    
    update (e) {
        if (this.health >= 0) {
            if (this.invincible >= 0) this.invincible -= e.delta;
            this.phases[this.step].shooting.update(e);
            this.phases[this.step].moving.update(e);
            this.lifemeter.text = this.health;
            this.set({
                x: this.position.e(1) + shooter.position.e(1),
                y: this.position.e(2) + shooter.position.e(2)
            });
        } else if (this.phases.length-1 > this.step++) {
            this.health = this.phases[this.step].health;
            this.invincible = 3000;
        } else {
            this.die();
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
        if (this.invincible <= 0) {
            this.health -= damage;
        }
    }
    
    die () {
        game.removeChild(this);
    }
    
}
