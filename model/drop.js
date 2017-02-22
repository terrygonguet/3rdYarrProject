/*
 * Enemy drops like points, power and stuff
 */

/* global shooter, game, createjs, Vector */

class Drop extends createjs.Shape {

    constructor (type, value, position) {
        super();
        this.type     = type;
        this.value    = value;
        this.position = position;
        this.impulse  = -50;
        this.movement = $V([0, this.impulse]);
        this.gravity  = 120;
        this.maxSpeed = 200;
        this.color    = "#000";

        // this.on("tick", this.update, this);
        this.on("frameTick", this.update, this);

        switch (type) {
            case "points" :
                this.color = "#88E";
                break;
            case "upgrade" :
                this.color = "#E88";
                break;
            default :
                this.color = "#8E8";
                break;
        }
        this.graphics.s("#000").f(this.color).dr(-5, -5, 10, 10);

        this.set({
            x: this.position.e(1) + shooter.position.e(1),
            y: this.position.e(2) + shooter.position.e(2)
        });
    }

    update (e) {
        if (game.player.position.e(2) <= 0.15 * shooter.dimensions.e(2)
            || this.position.distanceFrom(game.player.position) <= 100) {
            this.movement = game.player.position.subtract(this.position).toUnitVector().x(this.maxSpeed * 3);
        } else {
            this.movement.setElements([
                0, (this.movement.e(2) + this.gravity * e.delta / 1000).clamp(this.impulse, this.maxSpeed)
            ]);
        }

        this.position = this.position.add(this.movement.x(e.delta / 1000));

        this.collide();

        if (this.position.e(2) > shooter.dimensions.e(2)) this.die();
        this.set({
            x: this.position.e(1) + shooter.position.e(1),
            y: this.position.e(2) + shooter.position.e(2)
        });
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
                case "upgrade" :
                    game.player.weapon.upgrade(this.value);
                    break;
            }
            this.die();
        }
    }
}
