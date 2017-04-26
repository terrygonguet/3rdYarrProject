class WorldMap extends createjs.Container {

  constructor(width, height, prob=0.3, seed=randInt(0,500000)) {
    super();
    this.width       = width;
    this.height      = height;
    this.seed        = seed;
    this.prob        = prob;
    this.matrix      = null;
    this.encounters  = [];
    this.btnInv      = new createjs.Sprite(
      new createjs.SpriteSheet({
        images: ["resources/btn_inventory.jpg"],
        frames: {width: 100, height: 40},
        animations: {
          out: 0, down: 1
        }
      }), "normal"
    );

    this.cache(0,0,width*50,height*50);
    Math.seedrandom(seed + "");

    var btnInvhelper = new createjs.ButtonHelper(this.btnInv, "out", "out", "down", this.btnInv);
    this.btnInv.set({
      die: function () {
        game.removeChild(this.btnInv);
      }, x: window.innerWidth - 120, y: 20
    });
    this.btnInv.addEventListener("click", function (e) {
      console.log("test");
    });

    this.set({
      x: shooter.position.e(1) + shooter.dimensions.e(1) / 2,
      y: shooter.position.e(2) + shooter.dimensions.e(2) / 2,
      regX: width / 2 * 50, regY: height / 2 * 50
    });
    this.on("frameTick", this.update, this);

    this.on("added", function (e) {
      for(var i of this.encounters)
        game.addChild(i);
    }, this);

    this.generate();
  }

  update (e) {
    var self = this;
    this.set({
      x: shooter.position.e(1) + shooter.dimensions.e(1) / 2 + shooter.mapOffset.e(1),
      y: shooter.position.e(2) + shooter.dimensions.e(2) / 2 + shooter.mapOffset.e(2)
    });

    if (this.encounters.length <= 20 && Math.random() <= 0.001) {
      var enc = new MapEncounter(
        $V([randInt(this.width * -25, this.width * 25), randInt(this.height * -25, this.height * 25)]),
        20, "Meduse1", function () {
          Generator.generate(randInt(60000, 80000), true);
          shooter.switchOffMap();
          game.removeChild(this);
          self.encounters.splice(self.encounters.indexOf(this), 1);
          setTimeout(function () {
            shooter.start();
          }, 150);
        }
      );
      this.encounters.push(enc);
      game.addChild(enc);
    }
  }

  generate () {
    var perfStart = performance.now();

    this.matrix   = new Array(this.width);
    for (var i=0; i<this.width; i++) {
      this.matrix[i] = new Array(this.height);
      for (var j = 0; j < this.height; j++) {
        this.matrix[i][j] = new createjs.Bitmap();
        this.matrix[i][j].set({
          x: i * 50,
          y: j * 50
        });
        this.createLand(i, j, "water");
        this.addChild(this.matrix[i][j]);
      }
    }

    var nbIslands = randInt(30,50);
    for (var i = 0; i < nbIslands; i++) {
      var islandSize = randInt(10,80);
      var x = randInt(0, this.width), y = randInt(0, this.height);
      this.makeIsland(x, y, islandSize);
    }

    for (var x = 0; x < this.width; x++) {
      for (var y = 0; y < this.height; y++) {
        if (!this.matrix[x][y].ground) {
          if (this.lakeSize(x, y) < 1000)
            this.createLand(x, y, "jungle");
        }
      }
    }

    this.updateCache();
    console.log(performance.now() - perfStart);
  }

  makeIsland(x, y, islandSize) {
    var type = "jungle";
    if (islandSize <= 40) type = "sand";
    if (islandSize <= 25 && Math.random() < 0.3) type = "rock";

    this.createLand(x, y, type);
    islandSize--;
    var added = [ x+"_"+y ];
    var toAdd = [
      (x+1)+"_"+(y), (x)+"_"+(y+1), (x-1)+"_"+(y), (x)+"_"+(y-1)
    ];
    var i = 0;

    while (islandSize > 0) {
      var coords = toAdd[i].split("_");
      x = Number(coords[0]); y = Number(coords[1]);
      if (!(x < 0 || x >= this.width || y < 0 || y >= this.width) && added.indexOf(toAdd[i]) == -1) {
        if (
          Math.random() <= this.prob
        ) {
          islandSize--;
          this.createLand(x, y, type);
          added.push(toAdd[i]);
          toAdd.splice(i,1); i--;
          toAdd.push((x+1)+"_"+(y), (x)+"_"+(y+1), (x-1)+"_"+(y), (x)+"_"+(y-1));
          toAdd = unique(toAdd);
        }
      }
      i = (i+1 == toAdd.length ? 0 : i+1);
    }
  }

  createLand (x, y, type) {
    var texture = "";
    switch (type) {
      case "water":
        texture = "mapSea";
        break;
        case "jungle" :
        texture = "mapJungle";
        break;
      case "sand" :
        texture = "mapSand";
        break;
      case "rock" :
        texture = "mapRock";
        break;
    }
    this.matrix[x][y].set({
      ground: type != "water", lakeSize: this.matrix[x][y].lakeSize,
      // graphics: new createjs.Graphics().f(color).r(0,0,50,50)
      image: queue.getResult(texture)
    });
  }

  lakeSize(x, y) {
    if (this.matrix[x] && this.matrix[x][y] && !this.matrix[x][y].ground) {
      if (this.matrix[x][y].lakeSize)
        return this.matrix[x][y].lakeSize;
    } else
      return 0;

    var size = 1;
    var checked = [ x+"_"+y ];
    var toCheck = [
      (x+1)+"_"+(y), (x)+"_"+(y+1), (x-1)+"_"+(y), (x)+"_"+(y-1)
    ];
    while (toCheck.length > 0) {
      var coords = toCheck[0].split("_");
      x = Number(coords[0]); y = Number(coords[1]);
      if (this.matrix[x] && this.matrix[x][y] && !this.matrix[x][y].ground) {
        size++;
        [
          (x+1)+"_"+(y),
          (x)+"_"+(y+1),
          (x-1)+"_"+(y),
          (x)+"_"+(y-1)
        ].forEach(function (e) {
          if (checked.indexOf(e) == -1 && toCheck.indexOf(e) == -1)
            toCheck.push(e);
        });
      }
      checked.push(toCheck[0]);
      toCheck.shift();
    }

    for (var cell of checked) {
      var coords = cell.split("_");
      x = Number(coords[0]); y = Number(coords[1]);
      if (this.matrix[x] && this.matrix[x][y] && !this.matrix[x][y].ground)
        this.matrix[x][y].lakeSize = size;
    }
    return size;
  }

}
