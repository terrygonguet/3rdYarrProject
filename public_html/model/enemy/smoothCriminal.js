/* 
 * Enemy with smooth movements
 */

/* global shooter, game, createjs, Vector */

class SmoothCriminal extends Enemy {
    
    constructor (radius, color, health) {
        super($V([0,0]), radius, color, health);
        this.path = [];
        
    }
    
    getLastLine () {
        var line = null;
        if (this.path.length >= 2) {
            var prev = this.path[this.path.length - 1];
            line = $L(prev.to, prev.to.subtract(prev.from));
        }
        return line;
    }
    
    addPoint (to, speed) {
        this.path.push(new Segment(this.getLastLine(), to, speed));
    }
    
}

class Segment {
    
    constructor (line, to, speed) {
        this.criminal = criminal;
        this.to       = to;
        this.speed    = speed;
        this.time     = 0;
        this.distance = 0;
        this.type     = null;
        this.line     = line;
        this.from     = this.line.anchor;
    }
    
    getPos (delta) {
        this.time += delta;
    }
    
}