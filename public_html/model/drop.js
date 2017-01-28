/* 
 * Enemy drops like points, power and stuff
 */

class Drop extends createjs.Shape {
    
    constructor (type, value, position) {
        super();
        this.type     = type;
        this.value    = value;
        this.position = position;
        this.impulse  = -50;
        this.movement = $V([0, this.impulse]);
        this.gravity  = 175;
        this.maxSpeed = 300;
        
        this.on("tick", this.update, this);
        
        this.graphics.s("#000").f("#88E").dr(-5, -5, 10, 10);
        
        this.set({
            x: this.position.e(1) + shooter.position.e(1),
            y: this.position.e(2) + shooter.position.e(2)
        });
    }
    
    update (e) {
        this.position = this.position.add(this.movement.x(e.delta / 1000));
        this.movement.setElements([
            0, (this.movement.e(2) + (this.gravity * e.delta / 1000)).clamp(this.impulse, this.maxSpeed)
        ]);
        
        this.collide()
        
        if (this.position.e(2) > shooter.dimensions.e(2)) this.die();
        this.y = this.position.e(2) + shooter.position.e(2);
    }
    
    die () {
        game.removeChild(this);
    }
    
    collide () {
        if (this.position.distanceFrom(game.player.position) <= game.player.radius + 20) {
            switch(this.type) {
                case "points" :
                    shooter.score += this.value;
                    break;
            }
            this.die();
        }
    }
}
