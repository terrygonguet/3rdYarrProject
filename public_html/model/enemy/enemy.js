/* 
 * Base Enemy class
 */

class Enemy extends createjs.Shape {
    
    constructor (position, radius, color, health, pointValue) {
        super();
        this.position = position;
        this.radius   = radius;
        this.health   = health;
        this.points   = pointValue;
        
        this.graphics.s("#000").f(color).dc(0,0,this.radius);
        
        this.on("tick", this.update, this);
        
        this.set({
            x: this.position.e(1) + shooter.position.e(1),
            y: this.position.e(2) + shooter.position.e(2)
        });
    }
    
    update (e) {
        this.set({
            x: this.position.e(1) + shooter.position.e(1),
            y: this.position.e(2) + shooter.position.e(2)
        });
    }
    
    die(playerKilled) {
        game.removeChild(this);
        if (playerKilled) {
            shooter.score += this.points;
            if (Math.random() < 0.5) game.addChild(new Drop("points", this.points, this.position));
        }
    }
    
    getHit () {
        this.health--;
        if (this.health < 0) {
            this.die(true);
        }
    }
    
}
