/* 
 * Enemy with smooth movements
 */

/* global shooter, game, createjs, Vector */

class SmoothCriminal extends Enemy {
    
    constructor (position, radius, color, health) {
        super(position, radius, color, health);
        this.path = [position];
        this.segments = [];
    }
    
    getLastLine () {
        var line = null;
        if (this.path.length >= 2) {
            var last = this.path[this.path.length - 1];
            var prev = this.path[this.path.length - 2];
            line = $L(prev, last.subtract(prev));
        }
        return line;
    }
    
    addPoint (to, speed) {
        this.path.push(to);
        this.segments.push(new Segment(this.getLastLine(), this.path[this.path.length - 1], to, speed));
    }
    
}

class Segment {
    
    constructor (line, from, to, speed) {
        this.tangent  = line;
        this.from     = from;
        this.to       = to;
        this.speed    = speed;
        this.line     = $L(this.from, this.to.subtract(this.from));
        this.time     = 0;
        this.totalTime= 0;
        this.distance = 0;
        this.callback = null;
        
        if (this.tangent) {
            this.type = (this.line.isParallelTo(this.tangent) ? "straight" : "curved");
        } else {
            this.type = "straight";
        }
        
        switch (this.type) {
            case "straight" :
                this.distance = this.to.distanceFrom(this.from);
                this.totalTime = this.distance / this.speed * 1000;
                this.callback = function () {
                    
                };
                break;
        }
        
    }
    
    getPos (delta) {
        this.time += delta;
    }
    
}