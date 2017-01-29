/* 
 * Base enemy with a set of points to visit
 */

/* global shooter, game, createjs */

class PathingEnemy extends Enemy {
    
    constructor (path, speed, radius, color, health, pointValue) {
        super(path[0], radius, color, health);
        this.path  = path;
        this.speed = speed;
        this.step  = 1;
        this.points= pointValue;
    }
    
    update (e) {
        if (this.position.distanceFrom(this.path[this.step]) <= this.speed * e.delta / 1000) {
            this.position = this.path[this.step];
            this.step++;
        }
        if (this.step >= this.path.length) { 
            this.die();
            return;
        }
        var move = this.path[this.step].subtract(this.position).toUnitVector().x(this.speed * e.delta / 1000);
        this.position = this.position.add(move);
        super.update(e);
    }
    
    die(playerKilled) {
        super.die(playerKilled)
        if (playerKilled) {
            shooter.score += this.points;
            if (Math.random() < 0.5) game.addChild(new Drop("points", this.points, this.position));
            else game.addChild(new Drop("upgrade", Number((Math.random() / 2).toFixed(2)), this.position));
        }
    }
    
}
