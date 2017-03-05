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
        this.mode       = "";
        this.txtScore   = new createjs.Text("", "20px Verdana", "#FFF");
        this.txtPower   = new createjs.Text("", "20px Verdana", "#FFF");
        this.txtLives   = new createjs.Text("", "20px Verdana", "#FFF");
        this.txtVersion = new createjs.Text("", "12px Verdana", "#FFF");
        this.score      = 0;
        this.bg         = new createjs.Shape();

        this.txtVersion.set({
          x: 7, y: window.innerHeight - 20
        });

        $.get("https://api.github.com/repos/terrygonguet/3rdYarrProject/contributors", function (data) {
          if (!data.message) {
            var sum = 0;
            for (var i of data) {
              sum += i.contributions;
            }
            shooter.txtVersion.text = "Version 0.1a" + sum;
          } else {
            console.log(data.message);
          }
        });

        this.set({ x: 0, y: 0 });
        this.txtScore.set({ visible: false });
        this.txtPower.set({ visible: false });
        this.txtLives.set({ visible: false });

        this.addChild(this.bg);
        this.addChild(this.txtScore);
        this.addChild(this.txtPower);
        this.addChild(this.txtLives);
        this.addChild(this.txtVersion);

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
        if (this.mode == "menu") game.player.lives = 2;
        this.txtScore.text = "Score : " + this.score;
        this.txtPower.text = "Power : " + game.player.weapon.level.toFixed(2);
        this.txtLives.text = "Lives : " + "●".repeat(game.player.lives);
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
      this.mode = "menu";
      this.position   = $V([100, 100]);
      this.dimensions = $V([window.innerWidth - 200, window.innerHeight - 200]);
      this.edges      = this.position.add(this.dimensions);
      this.resizeStage();
      this.txtScore.visible = false;
      this.txtPower.set({
        visible: true,
        x: this.position.e(1) + 20,
        y: this.position.e(2) + 20,
        color: "#000"
      });
      this.txtLives.visible = false;

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

      var powerbtn = new Selector($V([this.dimensions.e(1) / 2 - 50, this.dimensions.e(2) / 2 + 75]), 25, "#777", "Full power", function() {
            // game.player.weapon = new BlasterWeapon();
            game.player.weapon.level = 3;
            game.player.weapon.upgrade(0);
      });
      this.addChild(powerbtn);
      var emptybtn = new Selector($V([this.dimensions.e(1) / 2 + 50, this.dimensions.e(2) / 2 + 75]), 25, "#777", "No power", function() {
            // game.player.weapon = new BlasterWeapon();
            game.player.weapon.level = 0;
            game.player.weapon.upgrade(0);
      });
      this.addChild(emptybtn);
      var startbtn = new Selector($V([this.dimensions.e(1) / 2, this.dimensions.e(2) / 2 - 75]), 25, "#2E2", "Start game", function() {
            shooter.start();
      });
      this.addChild(startbtn);


      var clearbtn = new Selector($V([150, this.dimensions.e(2) / 2]), 25, "#777", "Special Clear", function() {
            game.player.special && game.player.special.remove();
            game.player.special = new ClearSpecial();
            shieldbtn.state = false;
            clearbtn.state = true;
      }, true, true);
      this.addChild(clearbtn);
      var shieldbtn = new Selector($V([150, this.dimensions.e(2) / 2 + 75]), 25, "#777", "Special Shield", function() {
            game.player.special && game.player.special.remove();
            game.player.special = new ShieldSpecial();
            clearbtn.state = false;
            shieldbtn.state = true;
      }, true, true);
      shieldbtn.state = true;
      this.addChild(shieldbtn);

      var autofirebtn = new Selector($V([this.dimensions.e(1) - 75, this.dimensions.e(2) / 2 - 75]), 25, "#A33", "Autofire", function() {
            input.setAutoFire(this.state);
      }, true, true);
      autofirebtn.state = input.autofire;
      this.addChild(autofirebtn);
      var mousebtn = new Selector($V([this.dimensions.e(1) - 75, this.dimensions.e(2) / 2]), 25, "#A33", "Mouse Controls", function() {
            input.setControls("Mouse");
            keybbtn.state = false;
            mousebtn.state = true;
      }, true, true);
      mousebtn.state = input.controls === "Mouse";
      this.addChild(mousebtn);
      var keybbtn = new Selector($V([this.dimensions.e(1) - 75, this.dimensions.e(2) / 2 + 75]), 25, "#A33", "Keyboard Controls", function() {
            input.setControls("Keyboard");
            mousebtn.state = false;
            keybbtn.state = true;
      }, true, true);
      keybbtn.state = input.controls === "Keyboard" || input.controls === "";
      this.addChild(keybbtn);

      // ugly but to initialize the first time when shooter is undefined
      setTimeout(function () {
        var dude = new Enemy(
          $V([100, 100]),
          20, ["Meduse1", "Meduse2"], 99999999, 0
        );
        dude.pattern = new Pattern(dude, function () {
          if (this.time >= 500) {
            this.time = 0;
            game.addChild(new Bullet(dude.position.add($V([0, 10])), $V([0, 1]), 500, 1, 8, "enemy", "Red Bullet"));
          }
        });
        game.addChild(dude);
      }, 50);
    }

    switchToGame () {
      this.clear();
      this.mode = "game";
      this.dimensions = $V([600, 800]);
      this.position   = $V([window.innerWidth / 2 - this.dimensions.e(1) / 2, 100]);
      this.edges      = this.position.add(this.dimensions);
      this.resizeStage();
      this.txtScore.set({
          x: this.edges.e(1) + 10, y: this.position.e(2), visible: true
      });
      this.txtPower.set({
          x: this.txtScore.x, y: this.position.e(2) + 30, visible: true, color: "#FFF"
      });
      this.txtLives.set({
          x: this.txtScore.x, y: this.position.e(2) + 60, visible: true
      });

      // item get line
      var itemLine = new createjs.Container();
      var line = new createjs.Shape();
      line.graphics
        .s("#000").ss(3)
        .mt(-this.dimensions.e(1) / 2.3, 0)
        .lt(this.dimensions.e(1) / 2.3, 0);
      itemLine.addChild(line);
      var linetxt = new createjs.Text("Item get line", "18px Verdana", "#FFF")
        .set({textAlign: "center", textBaseline: "middle", y: 15});
      var linetxtbg = new createjs.Text("Item get line", "18px Verdana", "#000")
        .set({textAlign: "center", textBaseline: "middle", y: 15, outline: 3, y: 15});
      itemLine.addChild(linetxtbg);
      itemLine.addChild(linetxt);
      itemLine.set({
        x: this.dimensions.e(1) / 2 + this.position.e(1),
        y: this.dimensions.e(2) / 5 + this.position.e(2),
        ttl: 3000
      });
      itemLine.on("frameTick", function (e) {
        if (this.ttl > 0) this.ttl -= e.delta;
        else if (this.alpha > 0) this.alpha -= e.delta / 1000;
        else game.removeChild(this);
      }, itemLine);
      game && game.addChild(itemLine);
    }

    getGameBounds () {
      var bounds = {
        position: $V([window.innerWidth / 2 - 300, 100]),
        dimensions: $V([600, 800])
      };
      bounds.edges = bounds.position.add(bounds.dimensions);
      return bounds;
    }

    resizeStage () {
      var mask = new createjs.Shape();
      mask.graphics
        .f("#000")
        .dr(0,0,window.innerWidth,this.position.e(2))
        .dr(0,this.position.e(2),this.position.e(1),this.edges.e(2))
        .dr(this.edges.e(1),this.position.e(2),window.innerWidth,this.edges.e(2))
        .dr(0,this.edges.e(2),window.innerWidth,window.innerHeight);
      mask.cache(0,0,window.innerWidth,window.innerHeight);
      this.bg.graphics
        .c()
        .lf(["#55E", "#DDD"], [0, 1], 0,0,window.innerWidth,window.innerHeight)
        .dr(0,0,window.innerWidth,window.innerHeight)
        .ss(5).s("#000")
        .r(this.position.e(1), this.position.e(2), this.dimensions.e(1), this.dimensions.e(2));
      this.bg.filters = [
        new createjs.AlphaMaskFilter(mask.cacheCanvas)
      ];
      this.bg.cache(0,0,window.innerWidth,window.innerHeight);
    }

    clear () {
        game && game.killAll();
        var childs = this.children.slice(0);
        for (var i of childs) {
          var toKill = true;
          if (i === this.txtScore || i === this.txtPower
            || this.txtLives === i ||i === this.txtVersion
            || i === this.bg) {
            toKill = false;
            continue;
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
