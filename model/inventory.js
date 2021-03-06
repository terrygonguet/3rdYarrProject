
class Inventory extends createjs.Container {

  constructor() {
    super();
    this.mainWeapon     = new BlasterWeapon();
    this.offWeapon      = null;
    this.special        = new ShieldSpecial();
    this.lives          = 2;
    this.level          = 0.5;
    this.gold           = 0;

    this.on("tick", this.update, this);
    game.addChild(this);
  }

  deltaPower (val) {
    this.level = (this.level + val).clamp(0,3).roundPres(2);
  }

  update (e) {
    this.mainWeapon.update(e);
    this.offWeapon && this.offWeapon.update(e);
  }

}
