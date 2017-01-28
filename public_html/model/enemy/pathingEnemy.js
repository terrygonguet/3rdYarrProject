/* 
 * Base enemy with a set of points to visit
 */

class PathingEnemy extends Enemy {
    
    constructor (path, speed, radius, color, health) {
        super(path[0], radius, color, health);
        this.path  = path;
        this.speed = speed;
        this.step  = 1;
    }
    
    update (e) {
        if (this.position.distanceFrom(this.path[this.step]) <= this.speed * e.delta / 1000) this.step++;
        if (this.step >= this.path.length) { 
            this.die();
            return;
        }
        var move = this.path[this.step].subtract(this.position).toUnitVector().x(this.speed * e.delta / 1000);
        this.position = this.position.add(move);
        super.update(e);
    }
    
}
