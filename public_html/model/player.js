/* 
 * The player graphics and controls
 */

/* global shooter, game, createjs */

class Player extends createjs.Shape {
    
    constructor () {
        super ();
        this.on("tick", this.update, this);
        
        this.position    = $V([0,0]);
        this.normalSpeed = 320;
        this.focusSpeed  = 100;
        this.radius      = 3;
        this.size        = 10;
        
        this.weapon      = new BlasterWeapon();
        this.special     = new ShieldSpecial();
        this.normalGraph = new createjs.Graphics().s("#000").f("#33A").dc(0,0,this.size);
        this.focusGraph  = new createjs.Graphics().s("#000").f("#33A").dc(0,0,this.size).f("#FFF").dc(0,0,this.radius);        
        
        this.set({
            x: this.position.e(1),
            y: this.position.e(2),
            graphics: this.normalGraph
        });
    }
    
    update (e) {
        this.weapon.update(e);
        if (input.keys.fire) this.weapon.fire();
        
        var direction = $V([
            Number(-input.keys.left + input.keys.right),
            Number(-input.keys.up + input.keys.down)
        ]);
        direction = direction.toUnitVector().x((input.keys.focus ? this.focusSpeed : this.normalSpeed) * (e.delta / 1000));
        this.position = this.position.add(direction);
        this.position.setElements([
            this.position.e(1).clamp(this.radius, shooter.dimensions.e(1) - this.radius),
            this.position.e(2).clamp(this.radius, shooter.dimensions.e(2) - this.radius)
        ]);
        
        this.set({
            x: this.position.e(1) + shooter.position.e(1), 
            y: this.position.e(2) + shooter.position.e(2),
            graphics: input.keys.focus ? this.focusGraph : this.normalGraph
        });
    }
    
    getHit () {
        createjs.Ticker.paused = true;
    }
}

