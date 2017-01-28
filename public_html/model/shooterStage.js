/* 
 * The stage where the shooter game will play
 */

class ShooterStage extends createjs.Shape {
    
    constructor (position, dimensions) {
        super();
        this.position   = position;
        this.dimensions = dimensions;
        this.graphics   = new createjs.Graphics();
        this.edges      = $V([this.position.e(1) + this.dimensions.e(1), this.position.e(2) + this.dimensions.e(2)]);
        
        this.graphics.ss(3).s("#000").r(0,0,this.dimensions.e(1), this.dimensions.e(2));
        this.set({
            x: this.position.e(1),
            y: this.position.e(2)
        });
    }
    
}

