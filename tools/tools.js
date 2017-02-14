/*
 * Random debug info printed
 */

/* global game, createjs */

var debug = false;
function debugOn () {
    var fps = new createjs.Text("00 FPS", "20px Verdana", "#FFF");
    fps.set({
        x:10, y:10
    });
    game.addChildAt(fps, 2);

    var entities = new createjs.Text("00 ENT", "20px Verdana", "#FFF");
    entities.set({
        x:460, y:40
    });
    game.addChildAt(entities, 2);

    var hint = new createjs.Text("W or Z to fire, Shift to focus, X to use special and Arrows to move.\nThe special uses 1 power and power upgrades your weapon.", "12px Verdana", "#FFF");
    hint.set({
        x: 10, y: 40
    });
    game.addChildAt(hint, 2);

    var indic1 = new KeyIndicator("up");
    indic1.set({x:100, y:10});
    game.addChildAt(indic1, 2);
    var indic2 = new KeyIndicator("down");
    indic2.set({x:160, y:10});
    game.addChildAt(indic2, 2);
    var indic3 = new KeyIndicator("left");
    indic3.set({x:220, y:10});
    game.addChildAt(indic3, 2);
    var indic4 = new KeyIndicator("right");
    indic4.set({x:280, y:10});
    game.addChildAt(indic4, 2);
    var indic5 = new KeyIndicator("fire");
    indic5.set({x:340, y:10});
    game.addChildAt(indic5, 2);
    var indic6 = new KeyIndicator("focus");
    indic6.set({x:400, y:10});
    game.addChildAt(indic6, 2);
    var indic7 = new KeyIndicator("special");
    indic7.set({x:460, y:10});
    game.addChildAt(indic7, 2);

    createjs.Ticker.on("tick", function () {
        fps.text = Math.round(createjs.Ticker.getMeasuredFPS()) + " FPS";
        entities.text = game.children.length + " ENT";
    }, null);

    debug = true;
}

/**
 * Returns a number whose value is limited to the given range.
 *
 * Example: limit the output of this computation to between 0 and 255
 * (x * 255).clamp(0, 255)
 *
 * @param {Number} min The lower boundary of the output range
 * @param {Number} max The upper boundary of the output range
 * @returns A number in the range [min, max]
 * @type Number
 */
Number.prototype.clamp = function(min, max) {
  return Math.min(Math.max(this, min), max);
};

Number.prototype.roundPres = function(precision) {
    var factor = Math.pow(10, precision);
    var tempNumber = this * factor;
    var roundedTempNumber = Math.round(tempNumber);
    return roundedTempNumber / factor;
};
