/* 
 * Base enemy with a set of points to visit
 */

/* global shooter, game, createjs */

/*
 * path : array of objects {position: 2D Vector, speed: number}, 
 *      the first one is the starting position and the speed is the speed for the 
 *      next move so the last speed doesn't matter
 * radius : number radius of the hitbox
 * color [temp] : html color
 * health : number
 */
class PathingEnemy extends Enemy {
    
    constructor (path, radius, color, health, pointValue = 100) {
        super(path[0].position, radius, color, health, pointValue);
        this.path  = path;
        this.speed = path[0].speed;
        this.step  = 1;
    }
    
    update (e) {
        if (this.position.distanceFrom(this.path[this.step].position) <= this.speed * e.delta / 1000) {
            this.position = this.path[this.step].position;
            this.speed = this.path[this.step].speed;
            this.step++;
        }
        if (this.step >= this.path.length) { 
            this.die();
            return;
        }
        var move = this.path[this.step].position.subtract(this.position).toUnitVector().x(this.speed * e.delta / 1000);
        this.position = this.position.add(move);
        super.update(e);
    }
    
    die(playerKilled) {
        super.die(playerKilled)
    }
    
    getTotalTime () {
        var total = 0, cur = this.path[0];
        for (var i = 1; i < this.path.length; i++) {
            total += cur.position.distanceFrom(this.path[i].position) / cur.speed * 1000;
            cur = this.path[i];
        }
        return total;
    }
    
}
