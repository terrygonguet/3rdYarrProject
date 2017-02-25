/*
 * Forward moving shield that destroys bullets and enemies
 */

/* global shooter, game, createjs, Vector */

class ShieldSpecial extends Special {

    constructor () {
        super();
        this.cost = 0.5;
    }

    trigger () {
        if (game.player.weapon.level >= this.cost) {
            game.player.weapon.level -= this.cost;
            var shield = new createjs.Shape();
            shield.graphics.ss(3).s("#000").dc(0,0,200);
            shield.set({
                x: game.player.position.e(1) + shooter.position.e(1),
                y: game.player.position.e(2) + shooter.position.e(2),
                time: 0
            });
            shield.on("tick", function (e, data) {
                data.shield.y -= e.delta / 1000 * 70;
                data.shield.time += e.delta;
                if (data.shield.time >= 1500) {
                    game.removeChild(data.shield);
                } else {
                    var shieldPos = $V([
                        data.shield.x - shooter.position.e(1),
                        data.shield.y - shooter.position.e(2)
                    ]);
                    var toDie = [];
                    for (var i of game.children) {
                        if (i instanceof Bullet && i.type !== "player"
                                && i.position.distanceFrom(shieldPos) <= 200) {
                            toDie.push(i);
                        }
                    }
                    for (var i of toDie) i.die(true);
                }
            }, null, false, {shield:shield});
            game.addChild(shield);
        }
        super.trigger();
    }

}
