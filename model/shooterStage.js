/*
 * The stage where the shooter game will play
 */

/* global shooter, game, createjs */

/*
 * position : 2D Vector position of the upper left corner
 * dimensiosn : 2D Vector dimensions of the playing stage
 */
class ShooterStage extends createjs.Container {

    constructor () {
        super();
        this.position   = $V([100, 100]);
        this.dimensions = $V([600, 800]);
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

        this.set({ x: 0, y: 0 });
        this.txtScore.set({ visible: false });
        this.txtPower.set({ visible: false });

        this.addChild(this.borders);
        this.addChild(this.txtScore);
        this.addChild(this.txtPower);

        // this.switchToGame();
        this.switchToMenu();

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
        this.switchToGame();
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

    switchToMenu () {
      this.position   = $V([100, 100]);
      this.dimensions = $V([window.innerWidth - 200, window.innerHeight - 200]);
      this.edges      = this.position.add(this.dimensions);
      this.resizeStage();
      this.txtScore.visible = false;
      this.txtPower.visible = false;

      var lvl1btn = new Selector($V([this.dimensions.e(1) / 2 - 75, this.dimensions.e(2) / 2]), 25, "#3A3", "Level 1", function() {
          shooter.loadLevel("levels/lvl1.js");
      });
      this.addChild(lvl1btn);
      var lvl2btn = new Selector($V([this.dimensions.e(1) / 2, this.dimensions.e(2) / 2]), 25, "#3A3", "Boss Only", function() {
          shooter.loadLevel("levels/lvl2.js");
      });
      this.addChild(lvl2btn);
      var lvl3btn = new Selector($V([this.dimensions.e(1) / 2 + 75, this.dimensions.e(2) / 2]), 25, "#3A3", "Demo", function() {
          shooter.loadLevel("levels/lvl3.js");
      });
      this.addChild(lvl3btn);

      var blasterbtn = new Selector($V([this.dimensions.e(1) / 2, this.dimensions.e(2) / 2 + 75]), 25, "#777", "Full power", function() {
            // game.player.weapon = new BlasterWeapon();
            game.player.weapon.level = 3;
            game.player.weapon.upgrade(0);
      });
      this.addChild(blasterbtn);
      var clearbtn = new Selector($V([50, this.dimensions.e(2) / 2]), 25, "#777", "Special Clear", function() {
            game.player.special && game.player.special.remove();
            game.player.special = new ClearSpecial();
      });
      this.addChild(clearbtn);
      var shieldbtn = new Selector($V([50, this.dimensions.e(2) / 2 + 75]), 25, "#777", "Special Shield", function() {
            game.player.special && game.player.special.remove();
            game.player.special = new ShieldSpecial();
      });
      this.addChild(shieldbtn);
    }

    switchToGame () {
      this.position   = $V([100, 100]);
      this.dimensions = $V([600, 800]);
      this.edges      = this.position.add(this.dimensions);
      this.resizeStage();
      this.txtScore.set({
          x: this.edges.e(1) + 10, y: this.position.e(2), visible: true
      });
      this.txtPower.set({
          x: this.txtScore.x, y: this.position.e(2) + 30, visible: true
      });
    }

    resizeStage () {
      var childs = this.children.slice(0);
      for (var i of childs) {
        if (i !== this.txtScore &&
            i !== this.txtPower &&
            i !== this.borders)
            this.removeChild(i);
      }
      this.bg = [
        new createjs.Shape(new createjs.Graphics().f("#333").dr(0,0,window.innerWidth,this.position.e(2))),
        new createjs.Shape(new createjs.Graphics().f("#333").dr(0,this.position.e(2),this.position.e(1),window.innerHeight-this.position.e(2))),
        new createjs.Shape(new createjs.Graphics().f("#333").dr(this.edges.e(1),this.position.e(2),window.innerWidth-this.edges.e(1),window.innerHeight-this.position.e(2))),
        new createjs.Shape(new createjs.Graphics().f("#333").dr(this.position.e(1),this.edges.e(2),this.dimensions.e(1),this.dimensions.e(2)))
      ];
      for (var i of this.bg)
        this.addChildAt(i,0);
      this.borders.graphics.c().ss(3).s("#000").r(this.position.e(1), this.position.e(1), this.dimensions.e(1), this.dimensions.e(2));
    }

    /*
     * enemy : enemy object to appear
     * time : number of ms after which to add the enemy to the stage
     */
    addEncounter (enemy, time) {
        this.encounters.push({time:time, enemy:enemy});
    }

}
