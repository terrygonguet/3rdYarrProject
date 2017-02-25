/*
 * Input manager
 */
var input = {
    controls: getCookie("controls"),
    autofire: getCookie("autofire") === "true",
    setControls: function (val) {
      input.controls = val;
      setCookie("controls", val);
    },
    setAutoFire: function (val) {
      input.autofire = val;
      setCookie("autofire", val);
    },
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
    onMouseDown: function (event) {
      var callbacks = [];
      if (input.controls == "Mouse") {
        switch (event.buttons) {
          case 1 :
            input.keys.focus = true;
            callbacks = input.onFocus;
            break;
          case 2 :
            input.keys.special = true;
            callbacks = input.onSpecial;
            break;
        }
      }
      for (var i of callbacks) {
          i(event);
      }
    },
    onMouseUp: function (event) {
      if (input.controls == "Mouse") {
        switch (event.which) {
          case 1 :
            input.keys.focus = false;
            break;
          case 3 :
            input.keys.special = false;
            break;
        }
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
window.addEventListener("mousedown", input.onMouseDown, true);
window.addEventListener("mouseup", input.onMouseUp, true);
$("#game").on("contextmenu", null, null, false);
