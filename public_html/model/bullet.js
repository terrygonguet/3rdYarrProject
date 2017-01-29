/* 
 * Bullet class
 */

/* global shooter, game, createjs */

class Bullet extends createjs.Shape {
    
    constructor (position, direction, speed, damage=1, radius=3, type="enemy") {
        super();
        this.position  = position;
        this.direction = direction;
        this.speed     = speed;
        this.radius    = radius;
        this.type      = type;
        this.damage    = damage;
        
        this.graphics.s("#000").f("#A33").dc(0,0,this.radius);
        
        this.on("tick", this.update, this);
        
        this.set({
            x: this.position.e(1) + shooter.position.e(1), 
            y: this.position.e(2) + shooter.position.e(2)
        });
    }
    
    update (e) {
        var startPos = this.position.dup();
        var toMove = this.speed * (e.delta / 1000)
        var moved = 0;
        do {
            if (toMove - moved >= 2 * this.radius) {
                moved += 2 * this.radius;
            } else {
                moved = toMove;
            }
            this.position = startPos.add(this.direction.x(moved));
            this.collide();
        } while (toMove !== moved);
        
        if (this.position.e(1) > shooter.dimensions.e(1) ||
            this.position.e(1) < 0 ||
            this.position.e(2) > shooter.dimensions.e(2) ||
            this.position.e(2) < 0) {
            this.die();
        }
        this.set({
            x: this.position.e(1) + shooter.position.e(1), 
            y: this.position.e(2) + shooter.position.e(2)
        });
    }
    
    die () {
        game.removeChild(this);
    }
    
    collide () {
        switch (this.type) {
            case "player" : 
                for (var i of game.enemies) {
                    if (i.position.distanceFrom(this.position) < i.radius + this.radius) {
                        i.getHit(this.damage);
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
    
}

