/* 
 * The stage where the shooter game will play
 */

class ShooterStage extends createjs.Container {
    
    constructor (position, dimensions) {
        super();
        this.position   = position;
        this.dimensions = dimensions;
        this.edges      = $V([this.position.e(1) + this.dimensions.e(1), this.position.e(2) + this.dimensions.e(2)]);
        this.encounters = [];
        this.time       = 0;
        this.started    = false;
        this.borders    = new createjs.Shape();
        this.txtScore   = new createjs.Text("", "20px Verdana", "#000");
        this.score      = 0;
        
        this.borders.graphics.ss(3).s("#000").r(0,0,this.dimensions.e(1), this.dimensions.e(2));
        this.set({
            x: this.position.e(1),
            y: this.position.e(2)
        });
        this.txtScore.set({
            x: this.dimensions.e(1) + 10, y: 0
        });
        
        this.addChild(this.borders);
        this.addChild(this.txtScore)
        
        this.on("tick", this.update, this);
    }
    
    update(e) {
        if (this.started) {
            this.time += e.delta;
            var noMoreSpawns = false;
            do {
                if (this.encounters[0] && this.encounters[0].time <= this.time) {
                    game.addChild(this.encounters[0].enemy);
                    this.encounters.shift();
                } else
                    noMoreSpawns = true;
            } while (!noMoreSpawns);
        }
        this.txtScore.text = "Score : " + this.score;
    }
    
    loadLevel (file) {
        var self = this;
        this.encounters = [];
        $.getScript(file, function () {
           self.started   = true;
           self.time      = 0;
           self.encounters.sort(function (a,b) {
               if (a.time > b.time) return 1;
               else if (a.time < b.time) return -1;
               else return 0;
           });
           console.log(file + " loaded.");
        });
    }
    
    addEncounter (enemy, time) {
        this.encounters.push({time:time, enemy:enemy});
    }
    
}

