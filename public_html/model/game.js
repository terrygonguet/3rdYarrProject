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
        this.addChild(this.shooterStage);
        this.addChild(this.player);
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