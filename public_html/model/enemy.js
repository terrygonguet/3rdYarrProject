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
        this.cooldown = 0;
        
        this.graphics.s("#000").f(color).dc(0,0,this.radius);
        
        this.on("tick", this.update, this);
        
        this.set({
            x: this.position.e(1),
            y: this.position.e(2)
        });
    }
    
    update (e) {
        this.cooldown += e.delta;
        if (this.cooldown > 1000) {
            this.cooldown = 0;
            var bullet = new Bullet(this.position, game.player.position.subtract(this.position).toUnitVector(), 100, 12, "enemy");
            game.addChild(bullet);
        }
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
