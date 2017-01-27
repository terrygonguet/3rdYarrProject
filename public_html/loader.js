var queue = new createjs.LoadQueue();
queue.on("complete", handleComplete, this);
queue.on("fileload", handleFileLoad, this);
queue.loadManifest([
    {id: "Game", src:"model/game.js"},
    {id: "Input Manager", src:"model/input.js"},
    {id: "KeyIndicator", src:"model/keyIndicator.js"},
    {id: "Tools", src:"model/tools.js"},
    {id: "Player", src:"model/player.js"},
    {id: "Bullet", src:"model/bullet.js"},
    {id: "Enemy", src:"model/enemy.js"},
    {id: "Loops", src:"model/loops.js"}
]);

var game;
window.addEventListener('resize', resizeCanvas, false);

function handleComplete() {
    console.log("Loading complete.");
    game = new Game("game");
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