/* global shooter, game, createjs */

var game;
var shooter;
var inventory;
var queue;

(function () {
  queue = new createjs.LoadQueue();
  queue.on("complete", handleComplete, this);
  queue.on("fileload", handleFileLoad, this);
  queue.on("fileerror", handleFileError, this);

  var stage = new createjs.Stage("game");
  var bar = new createjs.Shape();
  bar.graphics.ss(5);
  bar.set({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
  });
  var txt = new createjs.Text("Loading", "50px Verdana", "#000");
  txt.set({
    x: window.innerWidth / 2,
    y: window.innerHeight / 3,
    textAlign: "center"
  });
  var nbLoaded = 0;
  stage.canvas.width = window.innerWidth;
  stage.canvas.height = window.innerHeight;
  stage.addChild(bar);
  stage.addChild(txt);
  stage.update();

  queue.manifest = [
    // Scripts ----------------------------------
    {id: "Tools", src:"tools/tools.js"},
    {id: "Input Manager", src:"tools/input.js"},
    {id: "Game", src:"model/game.js"},
    {id: "KeyIndicator", src:"model/keyIndicator.js"},
    {id: "Player", src:"model/player.js"},
    {id: "Inventory", src:"model/inventory.js"},
    {id: "Bullet", src:"model/bullet.js"},
    {id: "Bullet Circle", src:"model/bulletCircle.js"},
    {id: "Enemy Abstract", src:"model/enemy/enemy.js"},
    {id: "Pathing Enemy", src:"model/enemy/pathingEnemy.js"},
    {id: "Smooth Enemy", src:"model/enemy/smoothCriminal.js"},
    {id: "Patterns", src:"model/enemy/patterns.js"},
    {id: "Boss", src:"model/enemy/boss.js"},
    {id: "Shooter Stage", src:"model/shooterstage.js"},
    {id: "Shooter Map", src:"model/shootermap.js"},
    {id: "World Map", src:"model/worldmap.js"},
    {id: "Map Encounter", src:"model/enemy/mapEncounter.js"},
    {id: "Sea", src:"model/sea.js"},
    {id: "Selector", src:"model/selector.js"},
    {id: "Drops", src:"model/drop.js"},
    {id: "Weapon Abstract", src:"model/weapons/weapon.js"},
    {id: "Weapon Blaster", src:"model/weapons/blaster.js"},
    {id: "Weapon Shotgun", src:"model/weapons/shotgun.js"},
    {id: "Special Abstract", src:"model/weapons/special.js"},
    {id: "Special Clear", src:"model/weapons/clear.js"},
    {id: "Special Shield", src:"model/weapons/shield.js"},

    // Sprites ----------------------------------------
    {id: "Calamar", src:"resources/calamar.png"},
    {id: "Meduse1", src:"resources/meduse1.png"},
    {id: "Meduse2", src:"resources/meduse2.png"},
    {id: "Player", src:"resources/Bateau-100x100.png"},
    {id: "Missile", src:"resources/Balle.png"},
    {id: "Blue Bullet", src:"resources/blueBullet.png"},
    {id: "Red Bullet", src:"resources/redBullet.png"},
    {id: "Green Bullet", src:"resources/greenBullet.png"},
    {id: "Canonball", src:"resources/Boulet.png"},
    {id: "Wave", src:"resources/wave.png"},
    {id: "Crab", src:"resources/crab.png"},
    {id: "Kraken", src:"resources/Kraken.png"}
  ];
  queue.loadManifest(queue.manifest);

  window.addEventListener('resize', resizeCanvas, false);

  function handleComplete() {
    console.log("Loading complete.");
    stage.removeChild(bar);
    stage.removeChild(txt);
    game = new Game("game");
    shooter = game.shooterStage;
    inventory = new Inventory();
    resizeCanvas();
    debugOn();
  }

  function handleFileLoad	(e) {
    nbLoaded ++;
    bar.graphics.s("#000").a(0, 0, 50, -Math.PI/2, (nbLoaded / queue.manifest.length) * (2 * Math.PI) - Math.PI/2).es();
    stage.update();
    console.log(e.item.id + " loaded.");
  }

  function handleFileError (e) {
    console.log(e.item.id + " failed.");
  }

  function resizeCanvas() {
    if (!game) return;
    game.canvas.width = window.innerWidth;
    game.canvas.height = window.innerHeight;
    shooter.resizeStage();
  }
})();
