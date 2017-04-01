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
    this.updateCache();
  }

  makeIsland(x, y, islandSize) {
    this.matrix[x][y].graphics.c().s("#000").f("#555").r(0,0,50,50);
  }

}
