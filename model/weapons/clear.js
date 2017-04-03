/*
 * Instant clear of bullets and enemies
 */

/* global shooter, game, createjs, Vector */

class ClearSpecial extends Special {

    constructor () {
        super();
        this.cost = 0.5;
    }

    trigger() {
      super.trigger();
      if (this.triggered) {
          var childs = game.children.slice(0);
          for (var i of childs) {
              if (i instanceof Bullet && i.type == "enemy") i.die(true);
          }
      }
    }

}
