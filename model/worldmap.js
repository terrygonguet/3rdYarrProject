class WorldMap extends createjs.Container {

  constructor(width, height, prob=0.3, seed=randInt(0,500000)) {
    super();
    this.width       = width;
    this.height      = height;
    this.seed        = seed;
    this.prob        = prob;
    this.matrix      = new Array(width);
    for (var i=0; i<width; i++) {
      this.matrix[i] = new Array(height);
      for (var j = 0; j < height; j++) {
        this.matrix[i][j] = new createjs.Shape();
        this.matrix[i][j].set({
          x: i * 50,
          y: j * 50,
          graphics: new createjs.Graphics().f("#77F").r(0,0,50,50)
        });
        this.addChild(this.matrix[i][j]);
      }
    }
    this.cache(0,0,width*50,height*50);
    Math.seedrandom(seed + "");

    this.set({
      x: shooter.position.e(1) + shooter.dimensions.e(1) / 2,
      y: shooter.position.e(2) + shooter.dimensions.e(2) / 2,
      regX: width / 2 * 50, regY: height / 2 * 50
    });
    this.on("frameTick", this.update, this);

    this.generate();
  }

  update (e) {
    this.set({
      x: shooter.position.e(1) + shooter.dimensions.e(1) / 2 + shooter.mapOffset.e(1),
      y: shooter.position.e(2) + shooter.dimensions.e(2) / 2 + shooter.mapOffset.e(2)
    });
  }

  generate () {
    var perfStart = performance.now();
    var nbIslands = randInt(30,50);
    for (var i = 0; i < nbIslands; i++) {
      var islandSize = randInt(10,80);
      var x = randInt(0, this.width), y = randInt(0, this.height);
      this.makeIsland(x, y, islandSize);
    }

    for (var x = 0; x < this.width; x++) {
      for (var y = 0; y < this.height; y++) {
        if (!this.matrix[x][y].ground && this.lakeSize(x, y) < 15) {
          this.createLand(x, y, randInt(1,3));
        } else {

        }
      }
    }

    this.updateCache();
    console.log(performance.now() - perfStart);
  }

  makeIsland(x, y, islandSize) {
    this.createLand(x, y, islandSize);
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
          Math.random() < this.prob
        ) {
          islandSize--;
          this.createLand(x, y, islandSize);
          added.push(toAdd[i]);
          toAdd.splice(i,1); i--;
          toAdd.push((x+1)+"_"+(y), (x)+"_"+(y+1), (x-1)+"_"+(y), (x)+"_"+(y-1));
          toAdd = unique(toAdd);
        }
      }
      i = (i+1 == toAdd.length ? 0 : i+1);
    }
  }

  createLand (x, y, baseAltitude) {
    this.matrix[x][y].set({
      ground: true, lakeSize: 0,
      baseAltitude: baseAltitude * 2
    });
    if (baseAltitude <= 30) {
      this.matrix[x][y].graphics = new createjs.Graphics().f("#24A61F").r(0,0,50,50);
    } else {
      this.matrix[x][y].graphics = new createjs.Graphics().f("#8DB5AC").r(0,0,50,50);
    }
  }

  lakeSize(x, y) {
    if (this.matrix[x] && this.matrix[x][y]) {
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
