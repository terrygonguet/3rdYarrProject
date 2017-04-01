class WorldMap extends createjs.Container {

  constructor(width, height, seed=randInt(0,500000)) {
    super();
    this.width       = width;
    this.height      = height;
    this.seed        = seed;
    this.matrix      = new Array(width);
    for (var i=0; i<width; i++) {
      this.matrix[i] = new Array(height);
      for (var j = 0; j < height; j++) {
        this.matrix[i][j] = new createjs.Shape();
        this.matrix[i][j].set({
          x: i * 50,
          y: j * 50,
          graphics: new createjs.Graphics().s("#000").f("#77F").r(0,0,50,50)
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
    var nbIslands = randInt(5,20);
    for (var i = 0; i < nbIslands; i++) {
      var islandSize = randInt(10,100);
      var x = randInt(0, this.width), y = randInt(0, this.height);
      this.makeIsland(x, y, islandSize);
    }

    for (var x = 0; x < this.width; x++) {
      for (var y = 0; y < this.height; y++) {
        if (this.isInland(x, y)) {
          this.matrix[x][y].graphics.c().s("#000").f("#555").r(0,0,50,50);
          this.matrix[x][y].ground = true;
        }
      }
    }

    this.updateCache();
  }

  makeIsland(x, y, islandSize) {
    this.matrix[x][y].graphics.c().s("#000").f("#333").r(0,0,50,50);
    this.matrix[x][y].ground = true;
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
          Math.random() > 0.3 ||
          this.isInland(x, y)
        ) {
          islandSize--;
          this.matrix[x][y].graphics.c().s("#000").f("#555").r(0,0,50,50);
          this.matrix[x][y].ground = true;
          added.push(toAdd[i]);
          toAdd.splice(i,1); i--;
          toAdd.push((x+1)+"_"+(y), (x)+"_"+(y+1), (x-1)+"_"+(y), (x)+"_"+(y-1));
          toAdd = unique(toAdd);
        }
      }
      i = (i+1 == toAdd.length ? 0 : i+1);
    }

  }

  isInland(x, y) {
    if (!this.matrix[x] || !this.matrix[x][y] || this.matrix[x][y].ground)
      return false;
    var size = 1;
    var checked = [ x+"_"+y ];
    var toCheck = [
      (x+1)+"_"+(y), (x)+"_"+(y+1), (x-1)+"_"+(y), (x)+"_"+(y-1)
    ];
    while (toCheck.length > 0 && size < 15) {
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
    return size < 15;
  }

}
