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

        // this.on("tick", this.update, this);
        this.on("frameTick", this.update, this);
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
        for (var i of this.children)
          i.dispatchEvent(new createjs.Event("frameTick").set({delta: e.delta}));
    }

    /*
     * file : path to the level file to be loaded
     */
    loadLevel (file) {
        var self = this;
        this.encounters = [];
        $.getScript(file, function () {
           self.encounters.sort(function (a,b) {
               if (a.time > b.time) return 1;
               else if (a.time < b.time) return -1;
               else return 0;
           });
           console.log(file + " loaded, " + self.encounters.length + " enemies.");
        });
    }

    start () {
      if (this.encounters.length > 0) {
        this.switchToGame();
        this.started   = true;
        this.time      = 0;
        game.player.position = $V([this.dimensions.e(1) / 2, this.dimensions.e(2) - 50]);
      }
    }

    switchToMenu () {
      this.clear();
      this.position   = $V([100, 100]);
      this.dimensions = $V([window.innerWidth - 200, window.innerHeight - 200]);
      this.edges      = this.position.add(this.dimensions);
      this.resizeStage();
      this.txtScore.visible = false;
      this.txtPower.visible = false;

      var lvl1btn = new Selector($V([this.dimensions.e(1) / 2 - 75, this.dimensions.e(2) / 2]), 25, "#3A3", "Level 1", function() {
          shooter.loadLevel("levels/lvl1.js");
          lvl1btn.state = true;
          lvl2btn.state = false;
          lvl3btn.state = false;
      }, true, true);
      this.addChild(lvl1btn);
      var lvl2btn = new Selector($V([this.dimensions.e(1) / 2, this.dimensions.e(2) / 2]), 25, "#3A3", "Boss Only", function() {
          shooter.loadLevel("levels/lvl2.js");
          lvl1btn.state = false;
          lvl2btn.state = true;
          lvl3btn.state = false;
      }, true, true);
      this.addChild(lvl2btn);
      var lvl3btn = new Selector($V([this.dimensions.e(1) / 2 + 75, this.dimensions.e(2) / 2]), 25, "#3A3", "Demo", function() {
          shooter.loadLevel("levels/lvl3.js");
          lvl1btn.state = false;
          lvl2btn.state = false;
          lvl3btn.state = true;
      }, true, true);
      this.addChild(lvl3btn);

      var blasterbtn = new Selector($V([this.dimensions.e(1) / 2, this.dimensions.e(2) / 2 + 75]), 25, "#777", "Full power", function() {
            // game.player.weapon = new BlasterWeapon();
            game.player.weapon.level = 3;
            game.player.weapon.upgrade(0);
      });
      this.addChild(blasterbtn);
      var startbtn = new Selector($V([this.dimensions.e(1) / 2, this.dimensions.e(2) / 2 - 75]), 25, "#2E2", "Start game", function() {
            shooter.start();
      });
      this.addChild(startbtn);


      var clearbtn = new Selector($V([50, this.dimensions.e(2) / 2]), 25, "#777", "Special Clear", function() {
            game.player.special && game.player.special.remove();
            game.player.special = new ClearSpecial();
            shieldbtn.state = false;
            clearbtn.state = true;
      }, true, true);
      this.addChild(clearbtn);
      var shieldbtn = new Selector($V([50, this.dimensions.e(2) / 2 + 75]), 25, "#777", "Special Shield", function() {
            game.player.special && game.player.special.remove();
            game.player.special = new ShieldSpecial();
            clearbtn.state = false;
            shieldbtn.state = true;
      }, true, true);
      shieldbtn.state = true;
      this.addChild(shieldbtn);

      var autofirebtn = new Selector($V([this.dimensions.e(1) - 75, this.dimensions.e(2) / 2 - 75]), 25, "#A33", "Autofire", function() {
            game.player.autofire = this.state;
            setCookie("autofire", this.state);
      }, true, true);
      autofirebtn.state = getCookie("autofire") === "true";
      this.addChild(autofirebtn);
      var mousebtn = new Selector($V([this.dimensions.e(1) - 75, this.dimensions.e(2) / 2]), 25, "#A33", "Mouse Controls", function() {
            game.player.controls = "Mouse";
            setCookie("controls", "Mouse");
            keybbtn.state = false;
            mousebtn.state = true;
      }, true, true);
      var ctrl = getCookie("controls");
      mousebtn.state = ctrl === "Mouse";
      this.addChild(mousebtn);
      var keybbtn = new Selector($V([this.dimensions.e(1) - 75, this.dimensions.e(2) / 2 + 75]), 25, "#A33", "Keyboard Controls", function() {
            game.player.controls = "Keyboard";
            setCookie("controls", "Keyboard");
            mousebtn.state = false;
            keybbtn.state = true;
      }, true, true);
      keybbtn.state = ctrl === "Keyboard" || ctrl === "";
      this.addChild(keybbtn);
    }

    switchToGame () {
      this.clear();
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

    getGameBounds () {
      var bounds = {
        position: $V([100, 100]),
        dimensions: $V([600, 800])
      };
      bounds.edges = bounds.position.add(bounds.dimensions);
      return bounds;
    }

    resizeStage () {
      for (var i of this.bg) {
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

    clear () {
        var childs = this.children.slice(0);
        for (var i of childs) {
          var toKill = true;
          if (i === this.txtScore || i === this.txtPower || i === this.borders) toKill = false;
          for (var j of this.bg) {
            if (j === i) {
              toKill = false;
              break;
            }
          }
          if (toKill) this.removeChild(i);
        }
    }

    /*
     * enemy : enemy object to appear
     * time : number of ms after which to add the enemy to the stage
     */
    addEncounter (enemy, time) {
        this.encounters.push({time:time, enemy:enemy});
    }

}
