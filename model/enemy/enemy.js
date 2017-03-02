/*
 * Base Enemy class
 */

/* global shooter, game, createjs */

/*
 * position : 2D Vector
 * radius : number, radius of the circle hitbox
 * sprites : array of images ID from the LoadQueue. A random one will be selected
 * health : number of hit points
 */
class Enemy extends createjs.Bitmap {

    constructor (position, radius, sprites, health, pointValue) {
        var sprite;
        if (typeof sprites === "string")
          sprite = sprites;
        else
          sprite = sprites[Math.floor(Math.random() * sprites.length)];
        super(queue.getResult(sprite));
        this.position = position;
        this.radius   = radius;
        this.health   = health;
        this.sprite   = sprite;
        this.pattern  = null;
        this.points   = pointValue;
        this.drop     = makeDropFunc();
        this.regX     = this.image.width / 2;
        this.regY     = this.image.height / 2;
        this.scaleX   = 2 * this.radius / this.image.width;
        this.scaleY   = this.scaleX;

        // this.on("tick", this.update, this);
        this.on("frameTick", this.update, this);

        var bounds = shooter.getGameBounds();

        this.set({
            x: this.position.e(1) + bounds.position.e(1),
            y: this.position.e(2) + bounds.position.e(2)
        });
    }

    update (e) {
        this.pattern && this.pattern.update(e);
        this.set({
            x: this.position.e(1) + shooter.position.e(1),
            y: this.position.e(2) + shooter.position.e(2)
        });
    }

    /*
     * playerKilled : boolean to indicate if killed by the player or removed
     *      by other means
     */
    die(playerKilled) {
        game.removeChild(this);
        if (playerKilled) {
            shooter.score += this.points;
            this.drop && this.drop(this);
        }
    }

    getHit (damage) {
        this.health -= damage;
        if (this.health <= 0) {
            this.die(true);
        }
    }

}

function makeDropFunc (probUpgrade=0.3, valUpgrade=0.05, probPoints=0.3, valPoints=200) {
    return function (enemy) {
        if (Math.random() <= probUpgrade) {
            game.addChild(new Drop("upgrade", valUpgrade, enemy.position));
        } else if (Math.random() <= probPoints) {
            game.addChild(new Drop("points", valPoints, enemy.position));
        }
    };
}
