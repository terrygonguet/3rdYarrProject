/* 
 * Base Enemy class
 */

class Enemy extends createjs.Shape {
    
    constructor (position, radius, color, health) {
        super();
        this.position = position;
        this.radius   = radius;
        this.health   = health;
        this.graphics = new createjs.Graphics();
        
        this.graphics.s("#000").f(color).dc(0,0,this.radius);
        
        this.on("tick", this.update, this);
        
        this.set({
            x: this.position.e(1),
            y: this.position.e(2)
        });
    }
    
    update (e) {
        this.set({
            x: this.position.e(1),
            y: this.position.e(2)
        });
    }
    
    die() {
        game.removeChild(this);
    }
    
    getHit () {
        this.health--;
        if (this.health < 0) {
            this.die();
        }
    }
    
}
