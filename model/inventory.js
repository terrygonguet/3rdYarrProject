
class Inventory extends createjs.Container {

  constructor() {
    super();
    this.mainWeapon     = new BlasterWeapon();
    this.offWeapon      = null;
    this.special        = new ShieldSpecial();
    this.lives          = 1;
    this.level          = 0;
    this.gold           = 0;
  }

  upgrade (val) {
    if (this.level === 3) {
      shooter.score += 1000 * val;
    } else {
      this.level = (this.level + val).clamp(0,3).roundPres(2);
    }
  }

}
