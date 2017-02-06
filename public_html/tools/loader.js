/* global shooter, game, createjs */

var queue = new createjs.LoadQueue();
queue.on("complete", handleComplete, this);
queue.on("fileload", handleFileLoad, this);

queue.stage = new createjs.Stage("game");
queue.bar = new createjs.Shape();
queue.bar.graphics.ss(5);
queue.bar.set({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
});
queue.txt = new createjs.Text("Loading", "50px Verdana", "#000");
queue.txt.textAlign = "center";
queue.txt.set({
    x: window.innerWidth / 2,
    y: window.innerHeight / 3
});
queue.nbLoaded = 0;
queue.stage.canvas.width = window.innerWidth;
queue.stage.canvas.height = window.innerHeight;
queue.stage.addChild(queue.bar);
queue.stage.addChild(queue.txt);
queue.stage.update();

queue.manifest = [
    {id: "Game", src:"model/game.js"},
    {id: "Input Manager", src:"tools/input.js"},
    {id: "KeyIndicator", src:"model/keyIndicator.js"},
    {id: "Tools", src:"tools/tools.js"},
    {id: "Player", src:"model/player.js"},
    {id: "Bullet", src:"model/bullet.js"},
    {id: "Bullet Sprite", src:"resources/bulletRed.png"},
    {id: "Enemy Abstract", src:"model/enemy/enemy.js"},
    {id: "Pathing Enemy", src:"model/enemy/pathingEnemy.js"},
    {id: "Smooth Enemy", src:"model/enemy/smoothCriminal.js"},
    {id: "Patterns", src:"model/enemy/patterns.js"},
    {id: "Boss", src:"model/enemy/boss.js"},
    {id: "Shooter Stage", src:"model/shooterStage.js"},
    {id: "Button", src:"model/button.js"},
    {id: "Drops", src:"model/drop.js"},
    {id: "Weapon Abstract", src:"model/weapons/weapon.js"},
    {id: "Weapon Blaster", src:"model/weapons/blaster.js"},
    {id: "Weapon Shotgun", src:"model/weapons/shotgun.js"},
    {id: "Special Abstract", src:"model/weapons/special.js"},
    {id: "Special Clear", src:"model/weapons/clear.js"},
    {id: "Special Shield", src:"model/weapons/shield.js"}
];
queue.loadManifest(queue.manifest);

var game;
var shooter;
window.addEventListener('resize', resizeCanvas, false);

function handleComplete() {
    console.log("Loading complete.");
    queue.stage.removeChild(queue.bar);
    queue.stage.removeChild(queue.txt);
    game = new Game("game");
    shooter = game.shooterStage;
    resizeCanvas();
    debugOn();
}

function handleFileLoad	(e) {
    queue.nbLoaded ++;
    queue.bar.graphics.s("#000").a(0, 0, 50, -Math.PI/2, (queue.nbLoaded / queue.manifest.length) * (2 * Math.PI)).es();
    queue.stage.update();
    console.log(e.item.id + " loaded.");
}

function resizeCanvas() {
    game.canvas.width = window.innerWidth;
    game.canvas.height = window.innerHeight;
}