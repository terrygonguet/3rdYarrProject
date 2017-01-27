/* 
 * Prototype of a looping enemy
 */

class Loops extends Enemy {
    
    constructor (position) {
        super (position, 10, "#527", 1);
        this.time     = 0;
        this.startpos = this.position.dup();
    }
    
    update (e) {
        this.time += e.delta / 300;
        this.position.setElements([
            this.startpos.e(1) + 2 * (60 * Math.cos(this.time) + this.time * 20),
            this.startpos.e(2) - 2 * (30 * Math.sin(this.time)) 
        ]);
        if (this.position.e(1) > game.canvas.width) this.die();
        super.update(e);
    }
    
}

