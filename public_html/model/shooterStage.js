/* 
 * The stage where the shooter game will play
 */

/* global shooter, game, createjs */

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
        this.txtPower   = new createjs.Text("", "20px Verdana", "#000");
        this.score      = 0;
        
        this.borders.graphics.ss(3).s("#000").f("#FFF").r(0,0,this.dimensions.e(1), this.dimensions.e(2));
        this.set({
            x: this.position.e(1),
            y: this.position.e(2)
        });
        this.txtScore.set({
            x: this.dimensions.e(1) + 10, y: 0
        });
        this.txtPower.set({
           x: this.txtScore.x, y: 30 
        });
        
        var lvl1btn = new Button(function () {
            shooter.loadLevel("levels/lvl1.js"); 
        }, null, "Level 1", $V([this.dimensions.e(1) + 10, 200]));
        this.addChild(lvl1btn);
        var lvl2btn = new Button(function () {
            shooter.loadLevel("levels/lvl2.js"); 
        }, null, "Level 2", $V([this.dimensions.e(1) + 10, 235]));
        this.addChild(lvl2btn);
        
        var blasterbtn = new Button(function () {
            game.player.weapon = new BlasterWeapon();
        }, null, "Blaster", $V([this.dimensions.e(1) + 10, 270]));
        this.addChild(blasterbtn);
        var shotgunbtn = new Button(function () {
            game.player.weapon = new ShotgunWeapon();
        }, null, "Shotgun", $V([this.dimensions.e(1) + 10, 305]));
        this.addChild(shotgunbtn);
        
        this.addChild(this.borders);
        this.addChild(this.txtScore);
        this.addChild(this.txtPower);
        this.addChild(lvl1btn);
        this.addChild(lvl2btn);
        
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
        this.txtPower.text = "power : " + game.player.weapon.level.toFixed(2);
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

