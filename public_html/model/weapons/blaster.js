/* 
 * Simple blaster weapon
 */

/* global shooter, game, createjs */

class BlasterWeapon extends Weapon {
    
    constructor () {
        super();
        this.fireRate = 5;
        this.damage   = 1;
    }
    
    update (e) {
        super.update(e);
        this.time.clamp(0, 1000 / this.fireRate);
    }
    
    fire () {
        if (this.time >= 1000 / this.fireRate) {
            this.time = 0;
            var bullet = new Bullet(game.player.position, $V([0, -1]), 1300, this.damage, 5, "player");
            game.addChild(bullet);
        }
    }
    
    upgrade (val) {
        super.upgrade(val);
        if (this.level === 3) {
            this.fireRate = 12;
        } else if (this.level >= 2) {
            this.fireRate = 10;
            this.damage = 2;
        } else if (this.level >= 1) {
            this.fireRate = 7;
        }
    }
    
}
