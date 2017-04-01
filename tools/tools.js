/*
 * Random debug info printed
 */

/* global game, createjs */

var debug = false;
function debugOn () {
    var fps = new createjs.Text("00 FPS", "20px Montserrat", "#FFF");
    fps.set({
        x:10, y:10
    });
    game.addChildAt(fps, 3);

    var entities = new createjs.Text("00 ENT", "20px Montserrat", "#FFF");
    entities.set({
        x:10, y:40
    });
    game.addChildAt(entities, 3);

    var indic1 = new KeyIndicator("up");
    indic1.set({x:100, y:10});
    game.addChildAt(indic1, 3);
    var indic2 = new KeyIndicator("down");
    indic2.set({x:160, y:10});
    game.addChildAt(indic2, 3);
    var indic3 = new KeyIndicator("left");
    indic3.set({x:220, y:10});
    game.addChildAt(indic3, 3);
    var indic4 = new KeyIndicator("right");
    indic4.set({x:280, y:10});
    game.addChildAt(indic4, 3);
    var indic5 = new KeyIndicator("fire");
    indic5.set({x:340, y:10});
    game.addChildAt(indic5, 3);
    var indic6 = new KeyIndicator("focus");
    indic6.set({x:400, y:10});
    game.addChildAt(indic6, 3);
    var indic7 = new KeyIndicator("special");
    indic7.set({x:460, y:10});
    game.addChildAt(indic7, 3);

    createjs.Ticker.on("tick", function () {
        fps.text = Math.round(createjs.Ticker.getMeasuredFPS()) + " FPS";
        entities.text = (game.children.length + shooter.children.length - 1) + " ENT";
    }, null);

    debug = [fps, entities, indic1, indic2, indic3, indic4, indic5, indic6, indic7];
}

function debugOff () {
  for (var i of debug) {
    game.removeChild(i);
  }
  debug = false;
}

// from https://www.w3schools.com/js/js_cookies.asp
function setCookie(cname, cvalue, exdays = 30) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
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

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function randFloat(min, max) {
  return Math.random() * (max - min) + min;
}

// http://codereview.stackexchange.com/questions/83717/filter-out-duplicates-from-an-array-and-return-only-unique-value
function unique (xs) {
  var seen = {};
  return xs.filter(function(x) {
    if (seen[x])
      return;
    seen[x] = true;
    return x;
  });
}
