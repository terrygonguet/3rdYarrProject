/*
 * The main class handling updates and graphics
 */
class Game extends createjs.Stage {
	
    constructor (canvasName) {
        super(canvasName);

        createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
        createjs.Ticker.framerate = 60;
        createjs.Ticker.on("tick", this.update, this);
        
        this.enemies = [];
        this.player  = new Player();
        
        this.player.position = $V([window.innerWidth / 2, window.innerHeight / 2]);
        this.addChild(this.player);
        
        
        this.addChild(new Loops($V([0,200])));
    }
    
    update (e) {
        try {
            if (!e.paused)
                super.update(e);
        } catch (err) {
            if (debug) 
                console.log("I dunno : " + err);
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