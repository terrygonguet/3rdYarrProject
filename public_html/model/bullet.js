/* 
 * Bullet class
 */
class Bullet extends createjs.Shape {
    
    constructor (position, direction, speed, radius, type) {
        super();
        this.position  = position;
        this.direction = direction;
        this.speed     = speed;
        this.radius    = radius;
        this.graphics  = new createjs.Graphics();
        this.type      = type;
        
        this.graphics.s("#000").f("#A33").dc(0,0,this.radius);
        
        this.on("tick", this.update, this);
        
        this.set({
            x: this.position.e(1),
            y: this.position.e(2)
        });
    }
    
    update (e) {
        this.position = this.position.add(this.direction.x(this.speed * (e.delta / 1000)));
        this.set({
            x: this.position.e(1),
            y: this.position.e(2)
        });
        if (this.position.e(1) > game.canvas.width ||
            this.position.e(1) < 0 ||
            this.position.e(2) > game.canvas.height ||
            this.position.e(2) < 0) {
            this.die();
        }
        
        switch (this.type) {
            case "player" : 
                for (var i of game.enemies) {
                    if (i.position.distanceFrom(this.position) < i.radius + this.radius) {
                        i.getHit();
                        this.die();
                        break;
                    }
                }
                break;
                
            case "enemy":
                if (game.player.position.distanceFrom(this.position) < game.player.radius + this.radius) {
                    game.player.getHit();
                    this.die();
                }
                break;
        }
    }
    
    die () {
        game.removeChild(this);
    }
    
}

