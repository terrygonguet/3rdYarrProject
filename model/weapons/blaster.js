/*
 * Simple blaster weapon
 */

/* global shooter, game, createjs */

class BlasterWeapon extends Weapon {

    constructor () {
        super();
        this.fireRate    = 10;
        this.damage      = 2;
        this.missileRate = 0;
        this.missileTime = 0;
    }

    update (e) {
        super.update(e);
        this.time.clamp(0, 1000 / this.fireRate);
        if (this.missileRate) this.missileTime += e.delta;
        this.missileTime.clamp(0, 1000 / this.missileRate);

        if (inventory.level === 3) {
            this.damage      = 2;
            this.missileRate = 10;
        } else if (inventory.level >= 2) {
            this.damage      = 2;
            this.missileRate = 7;
        } else if (inventory.level >= 1) {
            this.damage      = 2;
            this.missileRate = 5;
        } else {
            this.damage      = 2;
            this.missileRate = 0;
        }
    }

    fire () {
        if (this.time >= 1000 / this.fireRate) {
            this.time = 0;
            var bullet = new Bullet(game.player.position.add($V([0, 0])), $V([0, -1]), 1600, this.damage, 5, "player");
            game.addChild(bullet);
        }
        if (this.missileRate && this.missileTime >= 1000 / this.missileRate) {
            this.missileTime = 0;
            var bullet = new HomingBullet(game.player.position.add($V([0, 0])), $V([0, -1]), 1000, this.damage, 5, "player");
            game.addChild(bullet);
        }
    }
    
}
