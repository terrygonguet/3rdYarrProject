/*
 * A boss
 */

/* global shooter, game, createjs */

/*
 * position : 2D Vector
 * radius : number, radius of the circle hitbox
 * sprite : LoadQueue resource ID
 */

class Boss extends createjs.Bitmap {

    constructor (position, radius, sprite) {
        super(queue.getResult(sprite));
        this.tickEnabled   = false;
        this.position      = position;
        this.radius        = radius;
        this.health        = 1;
        this.maxHealth     = 1;
        this.sprite        = sprite;
        this.phases        = [];
        this.step          = 0;
        this.invincible    = 0;
        this.deathEvent    = null;
        this.specialEvent  = null;
        this.lifemeter     = new createjs.Shape();
        this.marker        = new createjs.Shape(
            new createjs.Graphics().f("#A33").s("#000").mt(-10, 5).lt(10, 5).lt(0, -5).cp()
        );
        this.livesIndic = new createjs.Shape;

        var bounds = shooter.getGameBounds();

        this.livesIndic.set({
          x: bounds.position.e(1) + 10,
          y: bounds.position.e(2) + 25
        });

        this.lifemeter.graphics.s("#000").f("#A33").dr(0,0,bounds.dimensions.e(1) - 20,5);
        this.lifemeter.set({
            x: bounds.position.e(1) + 10,
            y: bounds.position.e(2) + 10
        });
        this.marker.set({
            x: bounds.position.e(1),
            y: bounds.edges.e(2) + 13
        })

        this.on("added", function () {
            game.addChild(this.lifemeter);
            game.addChildAt(this.marker, game.children.length);
            this.livesIndic.graphics.s("#000").f("#A33");
            for (var i = 0; i < this.phases.length-1; i++)
              this.livesIndic.graphics.mt(i*20+14, 0).dc(i*20+7, 0, 7);
            game.addChild(this.livesIndic);
            this.deathEvent = game.player.on("death", function () {
              this.phases[this.step].failed = true;
            }, this);
            this.specialEvent = game.player.on("special", function () {
              this.phases[this.step].failed = true;
            }, this);
            shooter.paused = true;
        }, this);
        this.on("removed", function () {
            game.removeChild(this.lifemeter);
            game.removeChild(this.marker);
            game.removeChild(this.livesIndic);
            game.player.off("death", this.deathEvent);
            game.player.off("special", this.specialEvent);
        }, this);

        // this.on("tick", this.update, this);
        this.on("frameTick", this.update, this);

        this.set({
            x: this.position.e(1) + bounds.position.e(1),
            y: this.position.e(2) + bounds.position.e(2),
            scaleX: 2 * this.radius / this.image.width,
            scaleY: 2 * this.radius / this.image.height,
            regX: this.image.width / 2,
            regY: this.image.height / 2
        });
    }

    update (e) {
        if (this.health >= 0) {
            if (this.invincible >= 0) {
                this.invincible -= e.delta;
                this.visible = !this.visible;
            } else
                this.visible = true;
            this.phases[this.step].moving.update(e);
            this.phases[this.step].shooting.update(e);
            this.lifemeter.set({
                scaleX: this.health / this.maxHealth
            });
            this.set({
                x: this.position.e(1) + shooter.position.e(1),
                y: this.position.e(2) + shooter.position.e(2)
            });
            this.marker.x = this.x;
        } else if (this.phases.length-1 > this.step) {
            this.nextPhase();
        } else {
            this.die();
        }
    }

    nextPhase () {
        this.dropBonus();
        this.step++;
        this.health = this.phases[this.step].health;
        this.maxHealth = this.phases[this.step].health;
        this.invincible = 3000;
        var entities = game.children.slice(0);
        for (var e of entities) {
            if (e instanceof Bullet && e.type !== "player" ||
                (!(e instanceof Player) && !(e instanceof Boss)))
              e.die && e.die();
        }
        this.livesIndic.graphics.c().s("#000").f("#A33");
        for (var i = 0; i < this.phases.length-1-this.step; i++) {
          this.livesIndic.graphics.mt(i*20+14, 0).dc(i*20+7, 0, 7);
        }
    }

    dropBonus () {
      if (game.player.weapon.level != 3) {
        for (var i=0; i<5; i ++) {
          game.addChild(
            new Drop("upgrade", 0.2, $V([
              shooter.dimensions.e(1) / 2 + randInt(-50, 50),
              shooter.dimensions.e(2) / 2 + randInt(-50, 50)
            ]))
          );
        }
      } else {
        this.phases[this.step].reward += 3000;
      }
      if (!this.phases[this.step].failed) {
        for (var i=0; i<this.phases[this.step].reward; i += 1000) {
          game.addChild(
            new Drop("points", 1000, $V([
              shooter.dimensions.e(1) / 2 + randInt(-50, 50),
              shooter.dimensions.e(2) / 2 + randInt(-50, 50)
            ]))
          );
        }
      }
    }

    addPhase (shootingPattern, movingPattern, health, pointsReward = 10000) {
        this.phases.push({
            shooting: shootingPattern,
            moving: movingPattern,
            health: health,
            reward: pointsReward,
            failed: false
        });
        if (this.phases.length === 1) {
            this.health = health;
            this.maxHealth = health;
        }
    }

    getHit (damage) {
        if (this.invincible <= 0) {
            this.health -= damage;
        }
    }

    die () {
      var entities = game.children.slice(0);
      for (var e of entities) {
          if (e instanceof Bullet && e.type !== "player" ||
              (!(e instanceof Player) && !(e instanceof Boss)))
            e.die && e.die();
      }
      this.dropBonus();
      game.removeChild(this);
    }

}
