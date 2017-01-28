/*
 * The main class handling updates and graphics
 */
class Game extends createjs.Stage {
	
    constructor (canvasName) {
        super(canvasName);

        createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
        createjs.Ticker.framerate = 60;
        createjs.Ticker.on("tick", this.update, this);
        
        this.enemies      = [];
        this.player       = new Player();
        this.shooterStage = new ShooterStage($V([100, 100]), $V([600, 800]));
        
        this.player.position = $V([
            this.shooterStage.dimensions.e(1) / 2,
            this.shooterStage.dimensions.e(2) - 50
        ]);
        this.addChild(this.player);
        this.addChild(this.shooterStage);
        
        var lvl1btn = new Button(function () {
            shooter.loadLevel("levels/lvl1.js"); 
        }, null, "Level 1", $V([710, 500]));
        this.addChild(lvl1btn);
        
        var lvl2btn = new Button(function () {
            shooter.loadLevel("levels/lvl2.js"); 
        }, null, "Level 2", $V([710, 535]));
        this.addChild(lvl2btn);
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
        super.addChild(child);
        if (child instanceof Enemy)
            this.enemies.push(child);
    }
    
    removeChild (child) {
        super.removeChild(child);
        if (child instanceof Enemy)
            this.enemies.splice(this.enemies.indexOf(child), 1);
    }
	
}