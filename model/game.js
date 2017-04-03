/*
 * The main class handling updates and graphics
 */

/* global shooter, game, createjs */

class Game extends createjs.Stage {

    constructor (canvasName) {
        super(canvasName);

        createjs.Ticker.timingMode = createjs.Ticker.RAF;
        createjs.Ticker.framerate = 60;
        createjs.Ticker.on("tick", this.update, this);

        this.tickEnabled  = true;
        this.enemies      = [];
        this.player       = null;
        this.shooterStage = new ShooterStage();
        this.sea          = new Sea({
          position: this.shooterStage.position.dup(),
          dimensions: this.shooterStage.dimensions.dup()
        });
        this.stageAt      = 1;

        this.addChildAt(this.sea, 0);
        this.addChildAt(this.shooterStage,1);

        this.on("tick", function () {
          this.player = new Player();
          this.addChildAt(this.player,1);
        }, this, true);
    }

    update (e) {
      super.update(e);
      if (!e.paused) {
        var childs = this.children.slice(0);
        for (var i of childs) {
          i.dispatchEvent(new createjs.Event("frameTick").set({delta: e.delta}));
        }
      }
    }

    addChild (child) {
      this.stageAt = this.getChildIndex(this.shooterStage);
      super.addChildAt(child, (child instanceof Bullet ? this.stageAt++ : 1));
      if (child instanceof Enemy || child instanceof Boss)
          this.enemies.push(child);
    }

    removeChild (child) {
        super.removeChild(child);
        if (child instanceof Enemy || child instanceof Boss)
            this.enemies.splice(this.enemies.indexOf(child), 1);
    }

    killAll () {
        var childs = this.children.slice(0);
        for (var i of childs) {
          if (!(i instanceof Player) && i.die) i.die();
        }
    }

}
