/*
 * Shotgun weapon
 */

/* global shooter, game, createjs */

class ShotgunWeapon extends Weapon {

    constructor () {
        super();
        this.fireRate  = 2;
        this.nbPellets = 3;
        this.spread    = Math.PI / 13;
    }

    update (e) {
        super.update(e);
        this.time.clamp(0, 1000 / this.fireRate);

        if (inventory.level === 3) {
            this.fireRate = 3;
            this.nbPellets = 10;
            this.spread = Math.PI / 10;
        } else if (inventory.level >= 2) {
            this.fireRate = 2.5;
            this.nbPellets = 8;
            this.spread = Math.PI / 11;
        } else if (inventory.level >= 1) {
            this.fireRate = 2;
            this.nbPellets = 6;
            this.spread = Math.PI / 12;
        } else {
            this.fireRate  = 2;
            this.nbPellets = 3;
            this.spread    = Math.PI / 13;
        }
    }

    fire () {
        if (this.time >= 1000 / this.fireRate) {
            this.time = 0;

            for (var i = 0; i < this.nbPellets; i++) {
                var angle = (Math.random() * this.spread) - (this.spread / 2);
                var bullet = new Bullet(game.player.position.add($V([0, -game.player.size - 5])), $V([0, -1]).rotate(angle, Vector.Zero(2)), 1000 + (Math.random() * 100 - 50), 1, 3, "player");
                game.addChild(bullet);
            }

        }
    }

}
