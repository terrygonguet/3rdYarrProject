/* 
 * Bullet class
 */

/* global shooter, game, createjs */

/*
 * position : 2D Vector
 * direction : 2D Vector, will be normalised
 * speed : pixels/second
 * damage : number of hp per hit
 * radius : radius of the circle hitbox
 * type : enum["player", "enemy"] the source of the bullet (used for collisions)
 */
class Bullet extends createjs.Bitmap {
    
    constructor (position, direction, speed, damage=1, radius=3, type="enemy") {
        super(queue.getResult("Bullet Sprite"));
        this.position  = position;
        this.direction = direction.toUnitVector();
        this.speed     = speed;
        this.radius    = radius;
        this.type      = type;
        this.damage    = damage;
        
        // this.graphics.s("#000").f("#A33").dc(0,0,this.radius);
        this.scaleX = this.scaleY = this.radius / (this.image.width / 2);
        
        this.on("tick", this.update, this);
        
        this.set({
            x: this.position.e(1) + shooter.position.e(1), 
            y: this.position.e(2) + shooter.position.e(2),
            rotation: this.direction.angleFrom($V([0,-1])) * Math.sign(this.direction.e(1)) * 57.2958
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
        this.rotation = this.direction.angleFrom(-Vector.j) * Math.sign(this.direction.e(1));
        
        if (this.position.e(1) > shooter.dimensions.e(1) ||
            this.position.e(1) < 0 ||
            this.position.e(2) > shooter.dimensions.e(2) ||
            this.position.e(2) < 0) {
            this.die();
        }
        this.set({
            x: this.position.e(1) + shooter.position.e(1), 
            y: this.position.e(2) + shooter.position.e(2),
            rotation: this.direction.angleFrom($V([0,-1])) * Math.sign(this.direction.e(1)) * 57.2958
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

