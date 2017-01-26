/* 
 * The player graphics and controls
 */
class Player extends createjs.Shape {
    
    constructor () {
        super ();
        this.on("tick", this.update, this);
        
        this.position    = $V([0,0]);
        this.normalSpeed = 320;
        this.focusSpeed  = 100;
        this.graphics    = new createjs.Graphics();
        this.radius      = 10;
        
        this.cooldown    = 0;
        this.fireRate    = 50;
        
        this.graphics.s("#000").f("#33A").dc(0,0,this.radius);
        
        this.set({
            x: this.position.e(1),
            y: this.position.e(2)
        });
    }
    
    update (e) {
        if (input.keys.fire && this.cooldown > this.fireRate) {
            this.cooldown = 0;
            this.fire();
        }
        this.cooldown += e.delta;
        var direction = $V([
            Number(-input.keys.left + input.keys.right),
            Number(-input.keys.up + input.keys.down)
        ]);
        direction = direction.toUnitVector().x((input.keys.focus ? this.focusSpeed : this.normalSpeed) * (e.delta / 1000));
        this.position = this.position.add(direction);
        this.set({
            x: this.position.e(1), 
            y: this.position.e(2)
        });
    }
    
    fire () {
        var bullet = new Bullet(this.position, $V([0, -1]), 1500, 5, "player");
        game.addChild(bullet);
    }
    
    getHit () {
        createjs.Ticker.paused = true;
    }
}

