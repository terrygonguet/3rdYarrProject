/*
 * The player graphics and controls
 */

/* global shooter, game, createjs */

class Player extends createjs.Container {

    constructor () {
        super ();
        this.on("frameTick", this.update, this);
        var autof = getCookie("autofire");
        var ctrl = getCookie("controls");

        this.position    = $V([0,0]);
        this.normalSpeed = 400;
        this.focusSpeed  = 150;
        this.radius      = 5;
        this.lives       = 2;
        this.invincible  = 0;
        this.mode        = "level";
        this.direction   = $V([-1, 0]);

        this.weapon      = new BlasterWeapon();
        this.special     = new ShieldSpecial();

        this.sprite      = new createjs.Bitmap(queue.getResult("Player"));
        this.hitbox      = new createjs.Shape(
          new createjs.Graphics().s("#000").f("#E33").dc(0,0,this.radius)
        );

        this.addChild(this.sprite);
        this.addChild(this.hitbox);
        this.hitbox.visible = false;
        this.sprite.set({
          regX: this.sprite.image.width / 2,
          regY: this.sprite.image.height / 2,
          scaleX: 0.5, scaleY: 0.5
        });

        this.set({
            x: this.position.e(1),
            y: this.position.e(2)
        });
    }

    update (e) {
      switch (this.mode) {
        case "level":
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
          this.hitbox.visible = input.keys.focus;
          this.rotation = 0;
          break;

        case "map" :
          this.direction = $V([
              Number(-input.keys.up + input.keys.down),
              Number(-input.keys.left + input.keys.right)
          ]);
          if (this.direction.modulus() != 0) {
            shooter.mapOffset = shooter.mapOffset.subtract($V([
                Number(-input.keys.left + input.keys.right),
                Number(-input.keys.up + input.keys.down)
            ]).toUnitVector().x(e.delta / 1000 * this.normalSpeed));
            shooter.mapOffset.setElements([
              shooter.mapOffset.e(1).clamp(-shooter.worldmap.width/2*50, shooter.worldmap.width/2*50),
              shooter.mapOffset.e(2).clamp(-shooter.worldmap.height/2*50, shooter.worldmap.height/2*50)
            ]);
            this.rotation = this.direction.angleFrom($V([-1, 0])) * 57.296 * (input.keys.left ? -1 : 1);
          }
          break;
      }

      this.position.setElements([
          this.position.e(1).clamp(this.radius, shooter.dimensions.e(1) - this.radius),
          this.position.e(2).clamp(this.radius, shooter.dimensions.e(2) - this.radius)
      ]);

      this.set({
          x: this.position.e(1) + shooter.position.e(1),
          y: this.position.e(2) + shooter.position.e(2)
      });
    }

    getHit () {
      if (this.invincible <= 0) {
        this.lives --;
        this.dispatchEvent("death");
        if (this.lives < 0)
          shooter.switchToDead();
          // createjs.Ticker.paused = true;
        else {
          this.invincible = 3000;
          this.special.trigger();
          for (var i=0; i<this.special.cost; i+=0.1) {
            game.addChild(new Drop("upgrade", 0.1,
              $V([shooter.dimensions.e(1) / 2 + randInt(-50,50),
              shooter.dimensions.e(2) / 3 + randInt(-50,50)]))
            );
          }
        }
      }
    }
}
