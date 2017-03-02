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

        this.enemies      = [];
        this.player       = new Player();
        this.shooterStage = new ShooterStage();
        // this.sea          = new Sea({
        //   position: this.shooterStage.position.dup(),
        //   dimensions: this.shooterStage.dimensions.dup()
        // });

        this.player.position = $V([
            this.shooterStage.dimensions.e(1) / 2,
            this.shooterStage.dimensions.e(2) - 50
        ]);
        this.addChildAt(this.sea, 0);
        this.addChildAt(this.player,1);
        this.addChildAt(this.shooterStage,2);
    }

    update (e) {
        try {
            if (!e.paused) {
                super.update(e);

              var childs = this.children.slice(0);
              for (var i of childs) {
                i.dispatchEvent(new createjs.Event("frameTick").set({delta: e.delta}));
              }
            }
        } catch (err) {
            if (debug)
                console.log(err);
        }

    }

    addChild (child) {
        super.addChildAt(child, 2);
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
