/* 
 * Simple blaster weapon
 */

/* global shooter, game, createjs */

class BlasterWeapon extends Weapon {
    
    constructor () {
        super();
        this.fireRate    = 2;
        this.damage      = 1;
        this.missileRate = 3;
        this.missileTime = 0;
    }
    
    update (e) {
        super.update(e);
        this.time.clamp(0, 1000 / this.fireRate);
        this.missileTime += e.delta;
        this.missileTime.clamp(0, 1000 / this.missileRate);
    }
    
    fire () {
        if (this.time >= 1000 / this.fireRate) {
            this.time = 0;
            var bullet = new Bullet(game.player.position.add($V([0, -game.player.size - 5])), $V([0, -1]), 1300, this.damage, 5, "player");
            game.addChild(bullet);
        }
        if (this.missileTime >= 1000 / this.missileRate) {
            this.missileTime = 0;
            var bullet = new HomingBullet(game.player.position.add($V([0, -game.player.size - 5])), $V([0, -1]), 1300, Math.ceil(this.damage / 2), 5, "player");
            game.addChild(bullet);
        }
    }
    
    upgrade (val) {
        super.upgrade(val);
        if (this.level === 3) {
            this.fireRate = 3;
            this.damage = 4;
            this.missileRate = 6;
        } else if (this.level >= 2) {
            this.fireRate = 3;
            this.damage = 4;
            this.missileRate = 5;
        } else if (this.level >= 1) {
            this.fireRate = 2;
            this.damage   = 2;
            this.missileRate = 4;
        } else {
            this.fireRate = 2;
            this.damage   = 1;
            this.missileRate = 3;
        }
    }
}
