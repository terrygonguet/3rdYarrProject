/* 
 * Random debug info printed
 */
var debug = false;
function debugOn () {
    var fps = new createjs.Text("00 FPS", "20px Verdana", "#000");
    fps.set({
        x:10, y:10
    });
    game.addChild(fps);

    var indic1 = new KeyIndicator("up");
    indic1.set({x:100, y:10});
    game.addChild(indic1);
    var indic2 = new KeyIndicator("down");
    indic2.set({x:160, y:10});
    game.addChild(indic2);
    var indic3 = new KeyIndicator("left");
    indic3.set({x:220, y:10});
    game.addChild(indic3);
    var indic4 = new KeyIndicator("right");
    indic4.set({x:280, y:10});
    game.addChild(indic4);
    var indic5 = new KeyIndicator("fire");
    indic5.set({x:340, y:10});
    game.addChild(indic5);
    var indic6 = new KeyIndicator("focus");
    indic6.set({x:400, y:10});
    game.addChild(indic6);
    var indic7 = new KeyIndicator("special");
    indic7.set({x:460, y:10});
    game.addChild(indic7);
    
    createjs.Ticker.on("tick", function () {
        fps.text = Math.round(createjs.Ticker.getMeasuredFPS()) + " FPS";
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

