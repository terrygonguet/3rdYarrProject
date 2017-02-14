/*
 * The stage where the shooter game will play
 */

/* global shooter, game, createjs */

/*
 * position : 2D Vector position of the upper left corner
 * dimensiosn : 2D Vector dimensions of the playing stage
 */
class ShooterStage extends createjs.Container {

    constructor (position, dimensions) {
        super();
        this.position   = position;
        this.dimensions = dimensions;
        this.edges      = this.position.add(this.dimensions);
        this.encounters = [];
        this.time       = 0;
        this.started    = false;
        this.borders    = new createjs.Shape();
        this.txtScore   = new createjs.Text("", "20px Verdana", "#FFF");
        this.txtPower   = new createjs.Text("", "20px Verdana", "#FFF");
        this.score      = 0;
        this.bg         = [
          new createjs.Shape(new createjs.Graphics().f("#333").dr(0,0,window.innerWidth,this.position.e(2))),
          new createjs.Shape(new createjs.Graphics().f("#333").dr(0,this.position.e(2),this.position.e(1),window.innerHeight-this.position.e(2))),
          new createjs.Shape(new createjs.Graphics().f("#333").dr(this.edges.e(1),this.position.e(2),window.innerWidth-this.edges.e(1),window.innerHeight-this.position.e(2))),
          new createjs.Shape(new createjs.Graphics().f("#333").dr(this.position.e(1),this.edges.e(2),this.dimensions.e(1),this.dimensions.e(2)))
        ];
        for (var i of this.bg)
          this.addChild(i);

        this.borders.graphics.ss(3).s("#000").r(this.position.e(1), this.position.e(1), this.dimensions.e(1), this.dimensions.e(2));
        this.set({
            x: 0,
            y: 0
        });
        this.txtScore.set({
            x: this.edges.e(1) + 10, y: this.position.e(2)
        });
        this.txtPower.set({
           x: this.txtScore.x, y: this.position.e(2) + 30
        });

        var i = 200;
        var lvl1btn = new Button(function () {
            shooter.loadLevel("levels/lvl1.js");
        }, null, "Level 1", $V([this.edges.e(1) + 10, i+=35]));
        this.addChild(lvl1btn);
        var lvl2btn = new Button(function () {
            shooter.loadLevel("levels/lvl2.js");
        }, null, "Level 2", $V([this.edges.e(1) + 10, i+=35]));
        this.addChild(lvl2btn);
        var lvl3btn = new Button(function () {
            shooter.loadLevel("levels/lvl3.js");
        }, null, "Level 3", $V([this.edges.e(1) + 10, i+=35]));
        this.addChild(lvl3btn);

        var blasterbtn = new Button(function () {
            game.player.weapon = new BlasterWeapon();
            game.player.weapon.level = 3;
            game.player.weapon.upgrade(0);
        }, null, "Weapon Blaster", $V([this.edges.e(1) + 10, i+=35]));
        this.addChild(blasterbtn);
        var shotgunbtn = new Button(function () {
            game.player.weapon = new ShotgunWeapon();
            game.player.weapon.level = 3;
            game.player.weapon.upgrade(0);
        }, null, "Weapon Shotgun", $V([this.edges.e(1) + 10, i+=35]));
        this.addChild(shotgunbtn);

        var clearbtn = new Button(function () {
            game.player.special && game.player.special.remove();
            game.player.special = new ClearSpecial();
        }, null, "Special Clear", $V([this.edges.e(1) + 10, i+=35]));
        this.addChild(clearbtn);
        var shieldbtn = new Button(function () {
            game.player.special && game.player.special.remove();
            game.player.special = new ShieldSpecial();
        }, null, "Special Shield", $V([this.edges.e(1) + 10, i+=35]));
        this.addChild(shieldbtn);
        var unpausebtn = new Button(function () {
            createjs.Ticker.paused = false;
        }, null, "Unpause", $V([this.edges.e(1) + 10, i+=35]));
        this.addChild(unpausebtn);

        this.addChild(this.borders);
        this.addChild(this.txtScore);
        this.addChild(this.txtPower);

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

    /*
     * file : path to the level file to be loaded
     */
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

    /*
     * enemy : enemy object to appear
     * time : number of ms after which to add the enemy to the stage
     */
    addEncounter (enemy, time) {
        this.encounters.push({time:time, enemy:enemy});
    }

}
