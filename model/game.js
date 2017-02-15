/*
 * The main class handling updates and graphics
 */

/* global shooter, game, createjs */

class Game extends createjs.Stage {

    constructor (canvasName) {
        super(canvasName);

        createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
        createjs.Ticker.framerate = 60;
        createjs.Ticker.on("tick", this.update, this);

        this.enemies      = [];
        this.player       = new Player();
        this.shooterStage = new ShooterStage();

        this.player.position = $V([
            this.shooterStage.dimensions.e(1) / 2,
            this.shooterStage.dimensions.e(2) - 50
        ]);
        this.addChildAt(this.player,0);
        this.addChildAt(this.shooterStage,1);
    }

    update (e) {
        try {
            if (!e.paused)
                super.update(e);
        } catch (err) {
            if (debug)
                console.log(err);
        }

    }

    addChild (child) {
        super.addChildAt(child, 1);
        if (child instanceof Enemy || child instanceof Boss)
            this.enemies.push(child);
    }

    removeChild (child) {
        super.removeChild(child);
        if (child instanceof Enemy || child instanceof Boss)
            this.enemies.splice(this.enemies.indexOf(child), 1);
    }

}
