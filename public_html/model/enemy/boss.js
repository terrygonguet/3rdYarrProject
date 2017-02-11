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
        this.maxHealth  = 1;
        this.color      = color;
        this.phases     = [];
        this.step       = 0;
        this.invincible = 0;
        this.lifemeter  = new createjs.Shape();
        this.marker     = new createjs.Shape(
            new createjs.Graphics().f("#A33").s("#000").mt(-10, 5).lt(10, 5).lt(0, -5).cp()
        );
        
        this.graphics.s("#000").f(this.color).dc(0,0,this.radius);
        this.lifemeter.graphics.f("#A33").dr(0,0,shooter.dimensions.e(1) - 20,5);
        this.lifemeter.set({
            x: shooter.position.e(1) + 10,
            y: shooter.position.e(2) + 10
        });
        this.marker.set({
            x: shooter.position.e(1),
            y: shooter.edges.e(2) + 13
        })
        
        this.on("added", function () {
            game.addChild(this.lifemeter);
            game.addChild(this.marker);
        }, this); 
        this.on("removed", function () {
            game.removeChild(this.lifemeter);
            game.removeChild(this.marker);
        }, this); 
        
        this.on("tick", this.update, this);
        
        this.set({
            x: this.position.e(1) + shooter.position.e(1),
            y: this.position.e(2) + shooter.position.e(2)
        });
    }
    
    update (e) {
        if (this.health >= 0) {
            if (this.invincible >= 0) {
                this.invincible -= e.delta;
                this.visible = !this.visible;
            } else
                this.visible = true;
            this.phases[this.step].shooting.update(e);
            this.phases[this.step].moving.update(e);
            this.lifemeter.set({
                scaleX: this.health / this.maxHealth
            });
            this.set({
                x: this.position.e(1) + shooter.position.e(1),
                y: this.position.e(2) + shooter.position.e(2)
            });
            this.marker.x = this.x;
        } else if (this.phases.length-1 > this.step++) {
            this.health = this.phases[this.step].health;
            this.maxHealth = this.phases[this.step].health;
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
        if (this.phases.length === 1) {
            this.health = health;
            this.maxHealth = health;
        }
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
