/*
 * The player graphics and controls
 */

/* global shooter, game, createjs */

class Player extends createjs.Shape {

    constructor () {
        super ();
        // this.on("tick", this.update, this);
        this.on("frameTick", this.update, this);
        var autof = getCookie("autofire");
        var ctrl = getCookie("controls");

        this.position    = $V([0,0]);
        this.normalSpeed = 400;
        this.focusSpeed  = 150;
        this.radius      = 3;
        this.size        = 10;
        this.lives       = 2;
        this.invincible  = 0;

        this.weapon      = new BlasterWeapon();
        this.special     = new ShieldSpecial();
        this.normalGraph = new createjs.Graphics().s("#000").f("#33A").dc(0,0,this.size);
        this.focusGraph  = new createjs.Graphics().s("#000").f("#33A").dc(0,0,this.size).f("#FFF").dc(0,0,this.radius);

        this.set({
            x: this.position.e(1),
            y: this.position.e(2),
            graphics: this.normalGraph
        });
    }

    update (e) {
        this.weapon.update(e);
        if (input.keys.fire || input.autofire) this.weapon.fire();

        if (this.invincible > 0) {
          this.visible = !this.visible;
          this.invincible -= e.delta;
        } else {
          this.visible = true;
        }

        var direction = $V([0,0]);
        switch (input.controls) {
          case "":
          case "Keyboard":
            direction = $V([
                Number(-input.keys.left + input.keys.right),
                Number(-input.keys.up + input.keys.down)
            ]);
            break;
          case "Mouse" :
            var mousePos = $V([
              game.mouseX - shooter.position.e(1),
              game.mouseY - shooter.position.e(2)
            ]);
            if (mousePos.distanceFrom(this.position) >= (input.keys.focus ? this.focusSpeed : this.normalSpeed) * e.delta / 1000)
              direction = mousePos.subtract(this.position);
            else
              this.position = mousePos;
            break;
        }
        direction = direction.toUnitVector().x((input.keys.focus ? this.focusSpeed : this.normalSpeed) * (e.delta / 1000));
        this.position = this.position.add(direction);
        this.position.setElements([
            this.position.e(1).clamp(this.radius, shooter.dimensions.e(1) - this.radius),
            this.position.e(2).clamp(this.radius, shooter.dimensions.e(2) - this.radius)
        ]);

        this.set({
            x: this.position.e(1) + shooter.position.e(1),
            y: this.position.e(2) + shooter.position.e(2),
            graphics: input.keys.focus ? this.focusGraph : this.normalGraph
        });
    }

    getHit () {
      if (this.invincible <= 0) {
        this.lives --;
        if (this.lives < 0)
          createjs.Ticker.paused = true;
        else
          this.invincible = 3000;
      }
    }
}
