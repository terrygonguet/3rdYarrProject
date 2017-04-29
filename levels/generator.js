class Generator {

  constructor() {

  }

  static generate (length, hasBoss) {
    var time = 2000;
    var len = Generator.levelBlocks.length - 1;
    var bounds = shooter.getGameBounds();
    var blocksPicked = {};

    shooter.addEncounter(function () {
      game.sea.speed = 50;
    }, 0);

    do {
      var pick = randInt(0,len);
      if (!blocksPicked[pick] || blocksPicked[pick] <= 2) {
        time = Generator.levelBlocks[pick](time, bounds);
        blocksPicked[pick] = (blocksPicked[pick] ? blocksPicked[pick] + 1 : 1);
      }
    } while (time <= length);

    if (hasBoss)
      Generator.bosses[randInt(0,Generator.bosses.length)](time);

    console.log("Total level time : " + time);
  }

}

Generator.levelBlocks = [
  function (time, bounds) {
    var dude = null;
    for (var i = 0; i < 6; i++) {
        var x = (i + 1) * bounds.dimensions.e(1) / 7;
        dude = new PathingEnemy([
            {position: $V([x, -10]), speed:100},
            {position: $V([x, 150]), speed:0.3},
            {position: $V([x, 149]), speed:150},
            {position: $V([-10, 140]), speed:0}
        ], 20, ["Meduse1", "Meduse2"], 1, 100);
        shooter.addEncounter(dude, time);
        time += 500;
    }
    time += 1000 + dude.getTotalTime();
    return time;
  },
  function (time, bounds) {
    function bigdudeFire (e) {
      if (this.time >= this.delay) {
        this.time = 0;
        var dir = game.player.position.subtract(this.enemy.position);
        for (var i = 0; i < 5; i++) {
            var b = new Bullet(this.enemy.position, dir, 150 + i * 15, 1, 6, "enemy", "Green Bullet");
            game.addChild(b);
        }
      }
    }
    var dude = null;
    for (var i = 0; i < 5; i++) {
        dude = new SmoothCriminal($V([bounds.dimensions.e(1) / 5, -10]), 20, ["Meduse1", "Meduse2"], 1, 100);
        dude.addPoint($V([bounds.dimensions.e(1) / 5, 200]), 200);
        dude.addPoint($V([bounds.dimensions.e(1) / 5 + 100, 300]), 200);
        dude.addPoint($V([bounds.dimensions.e(1) / 5 + 200, 300]), 50);
        dude.addPoint($V([bounds.dimensions.e(1) + 10, 300]), 220);
        dude.pattern = new TargetPlayerPattern(dude, 0.5, 0.05, {radius:7});
        time += 500;
        shooter.addEncounter(dude, time);
    }
    time += 500;
    dude = new PathingEnemy([
        {position: $V([4 * bounds.dimensions.e(1) / 5, -10]), speed: 180},
        {position: $V([4 * bounds.dimensions.e(1) / 5, 200]), speed: 0.3},
        {position: $V([4 * bounds.dimensions.e(1) / 5, 201]), speed: 200},
        {position: $V([bounds.dimensions.e(1) + 10, 190]), speed: 0}
    ], 30, "Calamar", 25, 500);
    dude.drop = makeDropFunc(1, 0.5);
    dude.pattern = new Pattern(dude, bigdudeFire, {delay: 2000});
    shooter.addEncounter(dude, time);
    time += dude.getTotalTime() - 1000;

    return time;
  },
  function (time, bounds) {
    var dude = null;
    for (var i = 0; i < 5; i++) {
        for (var j = 1; j <= 5; j++) {
            var x = (j + (i % 2) / 2) * bounds.dimensions.e(1) / 6;
            dude = new PathingEnemy([
                {position: $V([x, -10]), speed: 170},
                {position: $V([x, 120]), speed: 50},
                {position: $V([x, 300]), speed: 170},
                {position: $V([x, -10]), speed: 0}
            ], 20, ["Meduse1", "Meduse2"], 1);
            dude.pattern = new TargetPlayerPattern(dude, 1, 0.007, {radius:7});
            shooter.addEncounter(dude, time);
        }
        time += 700;
    }
    time += dude.getTotalTime();

    return time;
  },
  function (time, bounds) {
    var dude = null;
    function bigdudeFire (e) {
      if (this.time >= this.delay) {
        this.time = 0;
        var dir = game.player.position.subtract(this.enemy.position);
        for (var i = 0; i < 5; i++) {
            var b = new Bullet(this.enemy.position, dir, 150 + i * 15, 1, 6, "enemy", "Green Bullet");
            game.addChild(b);
        }
      }
    }
    dude = new SmoothCriminal($V([-10, 100]), 30, "Calamar", 70, 500);
    dude.addPoint($V([bounds.dimensions.e(1) / 2, 100]), 150);
    dude.addPoint($V([bounds.dimensions.e(1) / 2, 300]), 150);
    dude.addPoint($V([bounds.dimensions.e(1) / 2, 100]), 150);
    dude.addPoint($V([bounds.dimensions.e(1) / 2, 300]), 150);
    dude.addPoint($V([bounds.dimensions.e(1) / 2, 100]), 150);
    dude.addPoint($V([bounds.dimensions.e(1) + 10, 100]), 150);
    dude.drop = makeDropFunc(1, 0.5);
    dude.pattern = new Pattern(dude, bigdudeFire, {delay: 2000});
    shooter.addEncounter(dude, time);

    dude = new SmoothCriminal($V([bounds.dimensions.e(1) + 10, 300]), 30, "Calamar", 70, 500);
    dude.addPoint($V([bounds.dimensions.e(1) / 2, 300]), 150);
    dude.addPoint($V([bounds.dimensions.e(1) / 2, 100]), 150);
    dude.addPoint($V([bounds.dimensions.e(1) / 2, 300]), 150);
    dude.addPoint($V([bounds.dimensions.e(1) / 2, 100]), 150);
    dude.addPoint($V([bounds.dimensions.e(1) / 2, 300]), 150);
    dude.addPoint($V([-10, 300]), 150);
    dude.drop = makeDropFunc(1, 0.5);
    dude.pattern = new Pattern(dude, bigdudeFire, {delay: 2000});
    shooter.addEncounter(dude, time);
    time += dude.getTotalTime();
    return time;
  },
  function (time, bounds) {
    var dude = null;
    for (var i = 0; i < 15; i++) {
        dude = new SmoothCriminal($V([-10, 100]), 20, ["Meduse1", "Meduse2"], 1);
        dude.addPoint($V([bounds.dimensions.e(1) - 200, 100]), 150);
        dude.addPoint($V([bounds.dimensions.e(1) - 200, 300]), 150);
        dude.addPoint($V([-10, 300]), 150);
        dude.pattern = new TargetPlayerPattern(dude, 1, 0.007, {radius:7});
        shooter.addEncounter(dude, time);
        dude = new SmoothCriminal($V([bounds.dimensions.e(1) + 10, 400]), 20, ["Meduse1", "Meduse2"], 1);
        dude.addPoint($V([200, 400]), 150);
        dude.addPoint($V([200, 600]), 150);
        dude.addPoint($V([bounds.dimensions.e(1) + 10, 600]), 150);
        dude.pattern = new TargetPlayerPattern(dude, 1, 0.007, {radius:7});
        shooter.addEncounter(dude, time);
        time += 400;
    }
    time += dude.getTotalTime() - 1000;
    return time;
  },
  function (time, bounds) {
    var dude = null;
    for (var i = 0; i < 8; i++) {
        var startpos = $V([(i % 2 ? -10 : bounds.dimensions.e(1) + 10), 2 * bounds.dimensions.e(2) / 3 - i * bounds.dimensions.e(2) / 12]);
        dude = new SmoothCriminal(startpos, 20, ["Meduse1", "Meduse2"], 1);
        dude.addPoint(startpos.add($V([(i % 2 ? 1 : -1), 1])), 150);
        dude.addPoint($V([bounds.dimensions.e(1) / 2, startpos.e(2)]), 150);
        dude.addPoint($V([bounds.dimensions.e(1) / 2, -10]), 150);
        dude.pattern = new TargetPlayerPattern(dude, 1, 0.007, {radius:7});
        shooter.addEncounter(dude, time);
        time += 300;
    }
    time += dude.getTotalTime();

    return time;
  },
  function (time, bounds) {
    var dude = null;
    function bigdudeFire (e) {
      if (this.time >= this.delay) {
        this.time = 0;
        var dir = game.player.position.subtract(this.enemy.position);
        for (var i = 0; i < 5; i++) {
            var b = new Bullet(this.enemy.position, dir, 150 + i * 15, 1, 6, "enemy", "Green Bullet");
            game.addChild(b);
        }
      }
    }
    dude = new SmoothCriminal($V([-10, bounds.dimensions.e(2) + 10]), 30, "Calamar", 70, 500);
    dude.addPoint($V([0, bounds.dimensions.e(2)]), 150);
    dude.addPoint($V([0, 0]), 150);
    dude.addPoint($V([-10, -10]), 150);
    dude.drop = makeDropFunc(1, 0.5);
    dude.pattern = new Pattern(dude, bigdudeFire, {delay: 2000});
    shooter.addEncounter(dude, time);

    dude = new SmoothCriminal($V([bounds.dimensions.e(1) + 10, bounds.dimensions.e(2) + 10]), 30, "Calamar", 70, 500);
    dude.addPoint($V([bounds.dimensions.e(1), bounds.dimensions.e(2)]), 150);
    dude.addPoint($V([bounds.dimensions.e(1), 0]), 150);
    dude.addPoint($V([bounds.dimensions.e(1) + 10, -10]), 150);
    dude.drop = makeDropFunc(1, 0.5);
    dude.pattern = new Pattern(dude, bigdudeFire, {delay: 2000});
    shooter.addEncounter(dude, time);
    time += dude.getTotalTime() + 2500;

    return time;
  }
];

Generator.bosses = [
  function (time) {
    shooter.addEncounter(function () {
      shooter.nextLevel = "levels/lvl1_boss.js";
    }, time);
  },
  function (time) {
    shooter.addEncounter(function () {
      shooter.nextLevel = "levels/lvl2_boss.js";
    }, time);
  },
];
