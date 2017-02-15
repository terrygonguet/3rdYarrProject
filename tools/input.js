/*
 * Input manager
 */
var input = {
    keys: {
        up: false,
        down: false,
        left: false,
        right: false,
        focus: false,
        special: false,
        fire: false
    },
    onKeyDown: function (event) {
        var callbacks = [];
        switch(event.key.toLowerCase()) {
            case "shift" :
                input.keys.focus = true;
                callbacks = input.onFocus;
                break;
            case "w" :
            case "z" :
                input.keys.fire = true;
                callbacks = input.onFire;
                break;
            case "x" :
                input.keys.special = true;
                callbacks = input.onSpecial;
                break;
            case "arrowup":
                input.keys.up = true;
                callbacks = input.onArrowUp;
                break;
            case "arrowdown":
                input.keys.down = true;
                callbacks = input.onArrowDown;
                break;
            case "arrowright":
                input.keys.right = true;
                callbacks = input.onArrowRight;
                break;
            case "arrowleft":
                input.keys.left = true;
                callbacks = input.onArrowLeft;
                break;
            case "r" : // reset
                createjs.Ticker.paused = false;
                shooter.switchToMenu();
                game.killAll();
                shooter.started = false;
                break;
        }
        for (var i of callbacks) {
            i(event);
        }
    },
    onKeyUp: function (event) {
        switch(event.key.toLowerCase()) {
            case "shift" :
                input.keys.focus = false;
                break;
            case "w" :
            case "z" :
                input.keys.fire = false;
                break;
            case "x" :
                input.keys.special = false;
                break;
            case "arrowup":
                input.keys.up = false;
                break;
            case "arrowdown":
                input.keys.down = false;
                break;
            case "arrowright":
                input.keys.right = false;
                break;
            case "arrowleft":
                input.keys.left = false;
                break;
        }
    },
    onArrowUp: [],
    onArrowDown: [],
    onArrowRight: [],
    onArrowLeft: [],
    onFire: [],
    onFocus: [],
    onSpecial: []
};

window.addEventListener("keydown", input.onKeyDown, true);
window.addEventListener("keyup", input.onKeyUp, true);
