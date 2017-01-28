var queue = new createjs.LoadQueue();
queue.on("complete", handleComplete, this);
queue.on("fileload", handleFileLoad, this);
queue.loadManifest([
    {id: "Game", src:"model/game.js"},
    {id: "Input Manager", src:"tools/input.js"},
    {id: "KeyIndicator", src:"model/keyIndicator.js"},
    {id: "Tools", src:"tools/tools.js"},
    {id: "Player", src:"model/player.js"},
    {id: "Bullet", src:"model/bullet.js"},
    {id: "Enemy Abstract", src:"model/enemy/enemy.js"},
    {id: "Shooter Stage", src:"model/shooterStage.js"},
    {id: "Pathing Enemy", src:"model/enemy/pathingEnemy.js"},
    {id: "Button", src:"model/button.js"}
]);

var game;
var shooter;
window.addEventListener('resize', resizeCanvas, false);

function handleComplete() {
    console.log("Loading complete.");
    game = new Game("game");
    shooter = game.shooterStage;
    resizeCanvas();
    debugOn();
}

function handleFileLoad	(e) {
    console.log(e.item.id + " loaded.");
}

function resizeCanvas() {
    game.canvas.width = window.innerWidth;
    game.canvas.height = window.innerHeight;
}